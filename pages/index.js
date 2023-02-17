// import Head from "next/head";
import { useEffect, useState } from "react";
import { ALL_CONTEXT } from "./context/all_context";
import styles from "./index.module.css";
import { getEngText, getItaText, getLanguagesVersion} from "./languages/lanuages";
import { generatePrettyPrompt } from "./api/generate";

export default function Home() {

  const [textInput, setTextInput] = useState("");

  //Current conversation
  const [results, setResults] = useState([]);
  //Pause and resume state
  const [shouldStop, setShouldStop] = useState(false);
  // I use bob to make sure the useEffect runs properly
  // I know this is a bad usage of Hooks
  const [bob, setBob] = useState(false); 

  // Which context to use from ALL_CONTEXT dict
  const [contextIndex, setContextIndex] = useState(0);

  // switch between english and italian
  const [useEngLang, setUseEngLang] = useState(true);



  const startingPointText = getLanguagesVersion("ENTER A STARTING POINT", "INIZIA IL DISCORSO");
  const enjoyText = getLanguagesVersion("ENJOY THE CONVERSATION", "GODITI LA CONVERSAZIONE");
  const titleText = getLanguagesVersion("CHAT BETWEEN AIs", "CHAT FRA IA");

  // Used to continue the conversation automatically
  useEffect(() => { 
    const fun = async () => {
        if(results.length > 0){
          if(!shouldStop) {
            let res = await continueConversation(null);
            setResults(res);
            setBob((prev) => !prev);
          }
        }
      
    };
    fun().catch(console.error);  
    
  }, 
  [JSON.stringify(results), shouldStop, bob]);
  //JSON.stringify(results) does not activate the useEffect


  function getCorrectlanguage(languages) {
    if(useEngLang) {
      return getEngText(languages);
    } else {
      return getItaText(languages);
    }
  }
  
  // Get the next answer
  async function continueConversation(start) {
      try {
        let conversation =  results;
        
        // Including the starting point
        if(start != null) conversation.push(start);

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ conversation: conversation, context: getCorrectlanguage(ALL_CONTEXT[contextIndex]["content"]), lang: useEngLang }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }


        let tempResults = results;

        // Slice the conversation if it's too big
        if(results.length > 24){
          tempResults = tempResults.slice(16 - results.length);
        }

        // Remove the headers
        if(data.result.length > 0) { 
          let modRes = data.result.replaceAll('\n', '').replaceAll("A:", "").replaceAll("B:", "");
          tempResults.push(modRes);
        }
        
        return tempResults;
        
      } catch(error) {
          // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
  
  }


  async function onSubmit(event) {
    if (event != null) event.preventDefault();
    try {
      let res = await continueConversation(textInput);
      setResults(res);
      setBob((prev) => !prev);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  // Switch context
  function navigateContext(direction) {
    if(contextIndex + direction < ALL_CONTEXT.length && contextIndex + direction >= 0) {
      setResults([]);
      setContextIndex((prev) => prev + direction);
    }
  }


  // Save the current conversation into a txt file and download it
  async function saveConversation()  {
    let a = document.createElement("a", { is: "a" });
    let res = generatePrettyPrompt(results, getCorrectlanguage(ALL_CONTEXT[contextIndex]["content"]), useEngLang);
    let fileToDownload = new Blob([res], {type: 'text/plain'});
    a.href = URL.createObjectURL(fileToDownload);
    a.download = "Conversation.txt";
    a.click();
  
  }

  
  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <div className={styles.left_nav}>
          <img className={styles.icon} src="/robot.png" width={50} height={50}/>
          <h2 className={styles.title}>
            {getCorrectlanguage(titleText)}
          </h2>
        </div>
        <div className={styles.right_nav}>
          {contextIndex > 0 ? <input type="image" className={styles.left_arrow} src="/assets/arrow-right.png" 
              onClick={() => navigateContext(-1)} width={30} height={30}/> : null }
          <div style={{width: 260, display:"flex", justifyContent: "center"}}>
            <div className={styles.primary_text}>
              <h3>{getCorrectlanguage(ALL_CONTEXT[contextIndex]["title"])}</h3>
            </div>
          </div>
          {contextIndex < ALL_CONTEXT.length - 1 ? <input type="image" className={styles.right_arrow} 
            src="/assets/arrow-right.png" onClick={() => navigateContext(1)} width={30} height={30}/> : null }
          <input type="image" className={styles.lang_button} height={30} width={30} 
              onClick={() => setUseEngLang((prev => !prev))} src={`assets/${useEngLang ? "uk-flag" : "ita-flag"}.png`} />
        </div>
      </div>
      <div className={ALL_CONTEXT[contextIndex]["image"]}>
        {results != undefined && results.length > 0 && 
          results.map((_, index) => {
            let res = results[results.length - index - 1];
            let className = styles.right_chat;
            if(results.length % 2 == 0) {
              if(index % 2 == 0)
                className = styles.left_chat
              else 
                className = styles.right_chat
            } else {
              if(index % 2 == 0)
                className = styles.right_chat
              else
                className = styles.left_chat
            }
              
            return (
              <div className={className} key={index}> 
                <div className={styles.bubble}>
                  <p className={styles.bubble_text}>{res}</p>
                  </div>
                  
              </div>
            )
          })
        
        }
        <div style={{height: 100}} />

      </div>
      <div className={styles.input_container}>
        <div className={styles.primary_text}>
          <div className={styles.row}>
            { results.length < 1 ?  getCorrectlanguage(startingPointText) : getCorrectlanguage(enjoyText) }
            { results.length > 0 && shouldStop ? 
              <input type="image" className={styles.play_image_input} src="/assets/play-button.png" name="play" alt="play" onClick={() => setShouldStop(false)} />  
            : null
            }
            { results.length > 0 && !shouldStop ? 
              <input type="image" className={styles.pause_image_input} src="/assets/pause-button.png" name="pause" alt="pause" onClick={() => setShouldStop(true)} />  
            : null
            }
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <input type="text" className={styles.text_input} onChange={(e) => setTextInput(e.target.value)} autoCapitalize="true" disabled={results.length > 0}/>
          {results.length < 1 ? <div className={styles.send_button}>
            <input type="image" className={styles.send_image_input} src="/assets/right-arrow.png" name="send" alt="send" onClick={onSubmit} />  
          </div> : 
          <div style={{ paddingLeft: 10 }}>
            <input type="image" className={styles.send_image_input} src="/assets/download.png" name="save" alt="save" onClick={saveConversation} />  
          </div>
          }
        </div>
      </div>
      
    </div>
  );

}

