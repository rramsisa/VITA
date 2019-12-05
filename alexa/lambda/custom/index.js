/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Auth token for user rishabh@google.com
// May require to be regenerated
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJiOTJhYzYwZTlmNDNkNTE5OWI5YmEiLCJpYXQiOjE1NzU0MzAzNTcsImV4cCI6MTU3NTUxNjc1N30.GTtpK86LWRgERz4jiFAwISLK4BNT_1Am_ls2BhX2n9k';
const ip = '167.71.145.115';

const Alexa = require('ask-sdk-core');

const GetShoppingListHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetShoppingListIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const api = url + 'list/getShoppingList/';

    await getRemoteData(api)
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
    const api = '/api/myitemsInfo/';
    await getRemoteData(api)
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `The items in your pantry are . `;

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
    const api = '/api/recipes/recipe/';

    await getRemoteData(api)
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

    var api = '/api/manual/';

    await postManualData(api, 1, slotValues.item.value, slotValues.quantity.value)
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} astronauts in space. `;

      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

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

    var api = '/api/manual/';

    await postManualData(api, 0, slotValues.item.value, slotValues.quantity.value)
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} astronauts in space. `;

      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

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
    const client = require('http');
    const options = {
      hostname: ip,
      port: 3000,
      path: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      }
    };
    const request = client.request(options, (response) => {
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

const postManualData = function (url, flag, name, quantity) {
  return new Promise((resolve, reject) => {
    const client = require('http');
    const data = JSON.stringify({
      'name': name,
      'flag': flag,
      'quantity': quantity
    });
    const options = {
      hostname: ip,
      port: 3000,
      path: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
        'Content-Length': data.length
      }
    };
    const request = client.request(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
    request.write(data);
    request.end();
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

