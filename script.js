const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/doctor.jpg",
    text: " it definitely has a dick",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm scared",
  },
  {
    image: "./img/oppression.jpg",
    text: "I'm So Oppressed  all this money",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm very Happy",
  },
  {
    image: "./img/bigot.jpg",
    text: " you are a non trans bigot",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/microaggression.jpg",
    text: "I am a victim and your a little bigot",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/education2.jpg",
    text: "I Want learn and think for myself",
  },
  {
    image: "./img/home.jpg",
    text: "not oppressed well then you are disgrace to your people",
  },

  {
    image: "./img/education.jpg",
    text: "a safe space with just one world view ",
  },
  {
    image: "./img/gramsci.jpg",
    text: "triumph by imposing an unquestioned culture",
  },
  {
    image: "./img/peasants.jpg",
    text: "let them eat ice cream",
  },
  {
    image: "./img/media.jpg",
    text: "say more to covid",
  },
  {
    image: "./img/peaceful.jpg",
    text: "peaceful protest starter pack",
  },
  {
    image: "./img/biden.jpg",
    text: "you aint black",
  },
  {
    image: "./img/vote1.jpg",
    text: "you aint hispanic",
  },
  {
    image: "./img/smurf2.jpg",
    text: "so i aint black...smurfs rule anyway",
  },
  {
    image: "./img/vote2.jpg",
    text: "you aint in the hood",
  },
  {
    image: "./img/liebig.jpg",
    text: "lie big and repeat",
  },
  {
    image: "./img/freeshit.jpg",
    text: "Save the Planet make cows extinct and stop farting",
  },
  {
    image: "./img/mark.jpg",
    text: "community controller, I will dominate",
  },
  {
    image: "./img/ms13.jpg",
    text: "she thinks we be stupid",
  },
  {
    image: "./img/puffin.jpg",
    text: "open seas and fresh air ",
  },
  {
    image: "./img/mad-monk.jpg",
    text: "totalitarian dictator! yes I'm so great ",
  },
  {
    image: "./img/puffin.jpg",
    text: "open seas and fresh air ",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();

let mobilenet;
let puffin;
let label;
let prob;
mobilenet = ml5.imageClassifier("MobileNet", modelReady);
function modelReady() {
  console.log("Model is ready!!!");
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

function imageReady() {
  // image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(500, 100);
  puffin = createImg("img/mad-monk.jpg");
  puffin.hide();
  background(0);
  // mobilenet = ml5.imageClassifier('MobileNet', modelReady);
  // console.log(puffin);
}
