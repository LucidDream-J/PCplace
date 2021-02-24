"use strict";

var main = document.querySelector('main');
var voicesSelect = document.getElementById('voices');
var textarea = document.getElementById('text');
var readBtn = document.getElementById('read');
var toggleBtn = document.getElementById('toggle');
var closeBtn = document.getElementById('close');
var data = [{
  image: './img/doctor.jpg',
  text: " has a dick"
}, {
  image: './img/scared.jpg',
  text: "I'm scared"
}, {
  image: './img/oppression.jpg',
  text: "I'm So Oppressed  all this money"
}, {
  image: './img/hurt.jpg',
  text: "I'm Hurt"
}, {
  image: './img/happy.jpg',
  text: "I'm very Happy"
}, {
  image: './img/bigot.jpg',
  text: " your a bigot"
}, {
  image: './img/sad.jpg',
  text: "I'm Sad"
}, {
  image: './img/microaggression.jpg',
  text: "your a little bigot"
}, {
  image: './img/school.jpg',
  text: 'I Want To Go To School'
}, {
  image: './img/education2.jpg',
  text: 'I Want To Go Outside'
}, {
  image: './img/home.jpg',
  text: 'Im not oppressed'
}, {
  image: './img/education.jpg',
  text: 'see no hear no speak no '
}, {
  image: './img/gramsci.jpg',
  text: 'triump by capturing culture'
}, {
  image: './img/peasants.jpg',
  text: 'let them eat ice cream'
}, {
  image: './img/media.jpg',
  text: 'Say no to covid'
}, {
  image: './img/peaceful.jpg',
  text: 'peaceful protest starter pack'
}, {
  image: './img/biden.jpg',
  text: 'you aint black'
}, {
  image: './img/vote1.jpg',
  text: 'you aint hispanic'
}, {
  image: './img/smurf2.jpg',
  text: 'so i aint black...smurfs rule anyway'
}, {
  image: './img/vote2.jpg',
  text: 'you aint in the hood'
}, {
  image: './img/liebig.jpg',
  text: 'lie big and repeat'
}, {
  image: './img/freeshit.jpg',
  text: 'Save the Planet stop cows farting'
}, {
  image: './img/mark.jpg',
  text: 'community standards'
}, {
  image: './img/ms13.jpg',
  text: 'she thinks we be stupid'
}, {
  image: './img/puffin.jpg',
  text: 'she thinks we are stupid'
}];
data.forEach(createBox); // Create speech boxes

function createBox(item) {
  var box = document.createElement('div');
  var image = item.image,
      text = item.text;
  box.classList.add('box');
  box.innerHTML = "\n    <img src=\"".concat(image, "\" alt=\"").concat(text, "\" />\n    <p class=\"info\">").concat(text, "</p>\n  ");
  box.addEventListener('click', function () {
    setTextMessage(text);
    speakText(); // Add active effect

    box.classList.add('active');
    setTimeout(function () {
      return box.classList.remove('active');
    }, 800);
  });
  main.appendChild(box);
} // Init speech synth


var message = new SpeechSynthesisUtterance(); // Store voices

var voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(function (voice) {
    var option = document.createElement('option');
    option.value = voice.name;
    option.innerText = "".concat(voice.name, " ").concat(voice.lang);
    voicesSelect.appendChild(option);
  });
} // Set text


function setTextMessage(text) {
  message.text = text;
} // Speak text


function speakText() {
  speechSynthesis.speak(message);
} // Set voice


function setVoice(e) {
  message.voice = voices.find(function (voice) {
    return voice.name === e.target.value;
  });
} // Voices changed


speechSynthesis.addEventListener('voiceschanged', getVoices); // Toggle text box

toggleBtn.addEventListener('click', function () {
  return document.getElementById('text-box').classList.toggle('show');
}); // Close button

closeBtn.addEventListener('click', function () {
  return document.getElementById('text-box').classList.remove('show');
}); // Change voice

voicesSelect.addEventListener('change', setVoice); // Read text button

readBtn.addEventListener('click', function () {
  setTextMessage(textarea.value);
  speakText();
});
getVoices();
var mobilenet;
var puffin;
var label;
var prob;
mobilenet = ml5.imageClassifier('MobileNet', modelReady);

function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(puffin, gotResults);
}

function gotResults(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    label = data[0].className;
    prob = data[0].probability;
    fill(255);
    textSize(32);
    text(label, 10, height / 2);
    createP(label);
    createP(prob);
  }
}

function imageReady() {// image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(500, 100);
  puffin = createImg('img/puffin.jpg');
  puffin.hide();
  background(0); // mobilenet = ml5.imageClassifier('MobileNet', modelReady);

  console.log(puffin);
}