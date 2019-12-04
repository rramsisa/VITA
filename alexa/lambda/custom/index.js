/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Auth token for user rishabh@google.com
// May require to be regenerated
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJiOTJhYzYwZTlmNDNkNTE5OWI5YmEiLCJpYXQiOjE1NzU0MzAzNTcsImV4cCI6MTU3NTUxNjc1N30.GTtpK86LWRgERz4jiFAwISLK4BNT_1Am_ls2BhX2n9k';

const Alexa = require('ask-sdk-core');

const GetShoppingListHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetShoppingListIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    await getRemoteData('http://api.open-notify.org/astros.json')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} shopping items in space. `;
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetItemListHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetItemListIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    await getRemoteData('http://api.open-notify.org/astros.json')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} items in space. `;

      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetRecipeListHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetRecipeListIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    await getRemoteData('http://api.open-notify.org/astros.json')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} recipes in space. `;

      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const AddPantryItemHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddPantryItemIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    let slotValues = handlerInput.requestEnvelope.request.intent.slots;
    let slotStatus = '';

    if (slotValues.item.value && slotValues.item.value !== '') {
      slotStatus += ' slot item was heard as ' + slotValues.item.value + ' with value ' + slotValues.quantity.value + '. ';
    } else {
      slotStatus += 'slot item is empty. ';
    }

    // await getRemoteData('http://api.open-notify.org/astros.json')
    //   .then((response) => {
    //     const data = JSON.parse(response);
    //     outputSpeech = `There are currently ${data.people.length} astronauts in space. `;

    //   })
    //   .catch((err) => {
    //     //set an optional error message here
    //     //outputSpeech = err.message;
    //   });

    outputSpeech = slotStatus;

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const RemovePantryItemHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RemovePantryItemIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    let slotValues = handlerInput.requestEnvelope.request.intent.slots;
    let slotStatus = '';

    if (slotValues.item.value && slotValues.item.value !== '') {
      slotStatus += ' slot item was heard as ' + slotValues.item.value + ' with value ' + slotValues.quantity.value + '. ';
    } else {
      slotStatus += 'slot item is empty. ';
    }


    // await getRemoteData('http://api.open-notify.org/astros.json')
    //   .then((response) => {
    //     const data = JSON.parse(response);
    //     outputSpeech = `There are currently ${data.people.length} astronauts in space. `;

    //   })
    //   .catch((err) => {
    //     //set an optional error message here
    //     //outputSpeech = err.message;
    //   });

    outputSpeech = slotStatus;

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to VITA, your personal virtual inventory tracker and assistant';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can introduce yourself by telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const getRemoteData = function (url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  })
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetShoppingListHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    LaunchRequestHandler,
    GetItemListHandler,
    GetRecipeListHandler,
    AddPantryItemHandler,
    RemovePantryItemHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

