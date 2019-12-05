/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Auth token for user rishabh@google.com
// May require to be regenerated
const ip = '167.71.145.115';

const Alexa = require('ask-sdk-core');

const GetShoppingListHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetShoppingListIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const api = '/api/alexa/getShoppingList/';
    const userId = handlerInput.requestEnvelope.context.System.user.userId
    const alexaID = userId.substring(userId.length - 10, userId.length);

    await getRemoteData(api, alexaID)
      .then((response) => {
        console.log('in then')
        const data = JSON.parse(response);
        console.log(data)
        if (data.message) {
          console.log('There is a message')
          outputSpeech = data.message
          outputSpeech = outputSpeech + ' I\'ve sent instructions to the alexa app on how to do this.'
        }
        else {
          console.log('Shopping Items exist')
          if (data.list.length === 0) {
            console.log('No item')
            outputSpeech = 'Your Shopping List is empty.'
          }
          else if (data.list.length === 1) {
            console.log('1 item')
            outputSpeech = `The only item in your shopping list is ${data.list[0].name}`;
          }
          else {
            console.log(`${data.list.length} items`)
            outputSpeech = `The items in your shopping list are: `;
            for (i = 0; i < data.list.length - 1; i++) {
              outputSpeech = outputSpeech + `${data.list[i].name}, `;
            }
            outputSpeech = outputSpeech + `and ${data.list[data.list.length - 1].name}.`
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        console.log(err.message)
        outputSpeech = 'API request failed.';
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
    const api = '/api/alexa/getItems/';
    const userId = handlerInput.requestEnvelope.context.System.user.userId
    const alexaID = userId.substring(userId.length - 10, userId.length);
    // console.log(alexaID);
    await getRemoteData(api, alexaID)
      .then((response) => {
        console.log('in then')
        const data = JSON.parse(response);
        console.log(data)
        if (data.message) {
          console.log('There is a message')
          outputSpeech = data.message
          outputSpeech = outputSpeech + ' I\'ve sent instructions to the alexa app on how to do this.'
        }
        else {
          console.log('Items exist')
          if (data.length === 0) {
            console.log('No item')
            outputSpeech = 'Your pantry is empty.'
          }
          else if (data.length === 1) {
            console.log('1 item')
            outputSpeech = `The only item in your pantry is ${data[0].quantity} ${data[0].name}`;
          }
          else {
            console.log(`${data.length} items`)
            outputSpeech = `The items in your pantry are: `;
            for (i = 0; i < data.length - 1; i++) {
              outputSpeech = outputSpeech + `${data[i].quantity} ${data[i].name}, `;
            }
            outputSpeech = outputSpeech + `and ${data[data.length - 1].quantity} ${data[data.length - 1].name}.`
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        console.log(err.message)
        outputSpeech = 'API request failed.';
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
    const api = '/api/alexa/getRecipes/';
    const userId = handlerInput.requestEnvelope.context.System.user.userId
    const alexaID = userId.substring(userId.length - 10, userId.length);

    await getRemoteData(api, alexaID)
      .then((response) => {
        console.log('in then')
        const data = JSON.parse(response);
        console.log(data)
        if (typeof (data.message) === String) {
          console.log('There is a message')
          outputSpeech = data.message
          outputSpeech = outputSpeech + ' I\'ve sent instructions to the alexa app on how to do this.'
        }
        else {
          console.log('Recipes exist')
          if (data.message.length === 0) {
            console.log('No recipes')
            outputSpeech = 'There are no recipes you can make with the your current inventory.'
          }
          else if (data.message.length === 1) {
            console.log('1 item')
            outputSpeech = `The only recipe you can make is ${data.message[0].title}`;
          }
          else {
            console.log(`${data.message.length} items`)
            outputSpeech = `The recipes that you can make with your current pantry are: `;
            for (i = 0; i < data.message.length - 1; i++) {
              outputSpeech = outputSpeech + `${data.message[i].title}, `;
            }
            outputSpeech = outputSpeech + `and ${data.message[data.message.length - 1].title}.`
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        console.log(err.message)
        outputSpeech = 'API request failed.';
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
    console.log(slotStatus)

    var api = '/api/alexa/modify';
    const userId = handlerInput.requestEnvelope.context.System.user.userId
    const alexaID = userId.substring(userId.length - 10, userId.length);

    await postManualData(api, 1, slotValues.item.value, slotValues.quantity.value, alexaID)
      .then((response) => {
        console.log('in then')
        const data = JSON.parse(response);
        console.log(data)
        outputSpeech = data.message;
      })
      .catch((err) => {
        //set an optional error message here
        console.log(err.message)
        outputSpeech = 'API request failed';
      });

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
    console.log(slotStatus)

    var api = '/api/alexa/modify/';
    const userId = handlerInput.requestEnvelope.context.System.user.userId
    const alexaID = userId.substring(userId.length - 10, userId.length);

    await postManualData(api, 0, slotValues.item.value, slotValues.quantity.value, alexaID)
      .then((response) => {
        console.log('in then')
        const data = JSON.parse(response);
        console.log(data)
        outputSpeech = data.message;
      })
      .catch((err) => {
        //set an optional error message here
        console.log(err.message)
        outputSpeech = 'API request failed';
      });

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

const getRemoteData = function (url, alexaID) {
  console.log(url)
  console.log(alexaID)
  return new Promise((resolve, reject) => {
    const client = require('http');
    const data = JSON.stringify({
      'alexaID': alexaID
    });
    const options = {
      hostname: ip,
      port: 3000,
      path: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    console.log(options)
    const request = client.request(options, (response) => {
      console.log(response.statusCode);
      console.log(response);
      // if (response.statusCode < 200 || response.statusCode > 299) {
      //   reject(new Error('Failed with status code: ' + response.statusCode));
      // }
      const body = [];
      response.on('data', (chunk) => {
        body.push(chunk)
      });
      response.on('end', () => {
        body.join(' ')
        console.log(body.toString());
        resolve(body.toString());
      });
    });
    request.on('error', (err) => console.log(err))
    request.write(data);
    request.end();
  })
};

const postManualData = function (url, flag, name, quantity, alexaID) {
  return new Promise((resolve, reject) => {
    const client = require('http');
    const data = JSON.stringify({
      'name': name,
      'flag': flag,
      'quantity': quantity,
      'alexaID': alexaID
    });
    const options = {
      hostname: ip,
      port: 3000,
      path: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    console.log(options)
    const request = client.request(options, (response) => {
      console.log(response.statusCode);
      console.log(response);
      // if (response.statusCode < 200 || response.statusCode > 299) {
      //   reject(new Error('Failed with status code: ' + response.statusCode));
      // }
      const body = [];
      response.on('data', (chunk) => {
        body.push(chunk)
      });
      response.on('end', () => {
        body.join(' ')
        console.log(body.toString());
        resolve(body.toString());
      });
    });
    request.on('error', (err) => console.log(err))
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

