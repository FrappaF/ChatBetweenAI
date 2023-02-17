import { getLanguagesVersion } from "../languages/lanuages";
import styles from "../index.module.css";

// HUMAN MUSEUM
const MUSEUM_TITLE_ENG = "Human museum";
const MUSEUM_CONTENT_ENG = "Two robot friends meet in a human museum, they are talking about the beauty of human art:"
const MUSEUM_TITLE_ITA = "Museo umano";
const MUSEUM_CONTENT_ITA = "Due amici robot si incontrano in un museo umano, stanno parlando della bellezza dell'arte umana:";


// CEMETERY
const CEMETERY_TITLE_ENG = "Cemetery";
const CEMETERY_CONTENT_ENG = "Two robot friends meet in a cemetery contemplating peace and the buried dead:";
const CEMETERY_TITLE_ITA = "Cimitero";
const CEMETERY_CONTENT_ITA = "Due amici robot si incontrano in un cimitero contemplando la pace e i morti sepolti:";


// LIBRARY
const LIBRARY_TITLE_ENG = "Library";
const LIBRARY_CONTENT_ENG = "Two robot friends meet in a library to learn more about human culture:";
const LIBRARY_TITLE_ITA = "Biblioteca";
const LIBRARY_CONTENT_ITA = "Due amici robot si incontrano in una biblioteca per conoscere meglio la cultura umana:";


// NATURE
const NATURE_TITLE_ENG = "Nature Trip";
const NATURE_CONTENT_ENG = "Two robot friends are on a nature trip:";
const NATURE_TITLE_ITA = "Gita in natura";
const NATURE_CONTENT_ITA = "Due amici robot sono in una gita nella natura:";


// ROMANTIC
const ROMANTIC_TITLE_ENG = "Romantic Dinner";
const ROMANTIC_CONTENT_ENG = "Two robots have a romantic dinner to celebrate 10th anniversary";
const ROMANTIC_TITLE_ITA = "Cena Romantica";
const ROMANTIC_CONTENT_ITA = "Due robot hanno una cena romantica per festeggiare il decimo anniversario";


export const ALL_CONTEXT = [
   {
      "title":  getLanguagesVersion(MUSEUM_TITLE_ENG, MUSEUM_TITLE_ITA),
      "content": getLanguagesVersion(MUSEUM_CONTENT_ENG, MUSEUM_CONTENT_ITA),
      "image": styles.museum_bg,
   },
   {
      "title":  getLanguagesVersion(LIBRARY_TITLE_ENG, LIBRARY_TITLE_ITA),
      "content": getLanguagesVersion(LIBRARY_CONTENT_ENG, LIBRARY_CONTENT_ITA),
      "image": styles.library_bg,
   },
   {
      "title":  getLanguagesVersion(CEMETERY_TITLE_ENG, CEMETERY_TITLE_ITA),
      "content": getLanguagesVersion(CEMETERY_CONTENT_ENG, CEMETERY_CONTENT_ITA),
      "image": styles.cemetery_bg,
   },
   {
      "title":  getLanguagesVersion(NATURE_TITLE_ENG, NATURE_TITLE_ITA),
      "content": getLanguagesVersion(NATURE_CONTENT_ENG, NATURE_CONTENT_ITA),
      "image": styles.nature_bg,
   },
   {
      "title":  getLanguagesVersion(ROMANTIC_TITLE_ENG, ROMANTIC_TITLE_ITA),
      "content": getLanguagesVersion(ROMANTIC_CONTENT_ENG, ROMANTIC_CONTENT_ITA),
      "image": styles.romantic_bg,
   },

];