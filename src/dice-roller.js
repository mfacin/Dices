require('dotenv').config();

async function rollDice(maxValue, elementId) {
  clearDice(elementId);

  let numbers;

  changeDiceStatus(elementId, 'waiting');

  if (shouldBeTrueRandom()) {
    numbers = await makeRequest(maxValue);
    changeDiceStatus(elementId, 'rolling');
    changeValue(elementId, numbers);
  }
  else {
    numbers = await createRandomNumbers(maxValue)
    changeDiceStatus(elementId, 'rolling');
    changeValue(elementId, numbers);
  }

}

function shouldBeTrueRandom() {
  return document.getElementById('trueRandom').checked;
}

async function makeRequest(maxValue) {
  const json = generateRequestJson(maxValue);

  const rawRes = await fetch('https://api.random.org/json-rpc/2/invoke', {
    method: 'post',
    body: json,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

  const res = await rawRes.json();

  const numbers = res.result.random.data;

  return numbers;
}

function generateRequestJson(maxValue) {
  const requestObject = {
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
        apiKey: process.env.API_KEY,
        n: 10,
        min: 1,
        max: maxValue,
        replacement: true
    },
    id: "1"
  }

  return JSON.stringify(requestObject)
}

function changeValue(elementId, value) {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      document.getElementById(elementId).innerHTML = value[i];

      if (i === 9) {
        changeDiceStatus(elementId, 'finished');
      }
    }, 100 * i);
  }
}

function createRandomNumbers(maxValue) {
  let numbers = [];

  for (let i = 0; i < 10; i++) {
    numbers.push(Math.floor((Math.random() * maxValue) + 1))
  }

  return numbers;
}

function clearDice(elementId) {
  document.getElementById(elementId).innerHTML = `${elementId}`.toUpperCase();
  document.getElementsByClassName(`${elementId}`)[0].setAttribute('class', `dice ${elementId}`)
}

function changeDiceStatus(elementId, status) {
  document.getElementsByClassName(elementId)[0].setAttribute('class', `dice ${elementId} ${status}`);
}