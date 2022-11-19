const msgEl = document.querySelector('.msg');
const container = document.querySelector('.container');

const randomNumber = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let reco = new window.SpeechRecognition();

// start
reco.start();

// get user speaking
function onSpeak(e) {
  const message = e.results[0][0].transcript;
  writeMessage(message);
  checkNumber(message);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
  <h1>You said: </h1>
  <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;

  // check if number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  if (num === randomNumber) {
    container.innerHTML = `
    <div>Congrats! You have guessed the number! <br /> <br /></div>
    <h1>It was ${num}</h1>
    <button class="play-again">Play Again</button>
    `;
  } else if (num > randomNumber) {
    msgEl.innerHTML += '<div>Go lower!</div>';
  } else {
    msgEl.innerHTML += '<div>Go Higher!</div>';
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// speak result
reco.addEventListener('result', onSpeak);
reco.addEventListener('end', () => reco.start());
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});
