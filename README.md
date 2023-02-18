# ChatBetweenAI
Chat between AI from ChatGPT in different contexts

All the images come from `https://www.flaticon.com/`

I created roughly this web page based on https://github.com/openai/openai-quickstart-node.git. 
You can choose from different contexts and start a conversation with a starting point and see how the AI continues. 
You can also download the current conversation.

Feel free to publish interesting conversations.

## Setup
From the official repo:
1. If you don’t have Node.js installed, install it from [here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

      `$ cd openai-quickstart-node`

4. Install the requirements 

    `$ npm install`

5. Make a copy of the example environment variables file

    On Linux systems:

      `$ cp .env.example .env`

    On Windows:

      `$ copy .env.example .env`


6. Add your API key to the newly created .env file

7. Run the app

    `$ npm run dev`
    
You should now be able to access the app at http://localhost:3000! For the full context behind this example app, check out the tutorial.
