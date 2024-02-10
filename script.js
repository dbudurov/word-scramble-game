const easyWords = [
    {
      word: "addition",
      hint: "The process of adding numbers",
    },
    {
      word: "meeting",
      hint: "Event in which people come together",
    },
    {
      word: "number",
      hint: "Math symbol used for counting",
    },
    {
      word: "exchange",
      hint: "The act of trading",
    },
    {
      word: "canvas",
      hint: "Piece of fabric for oil painting",
    },
    {
      word: "garden",
      hint: "Space for planting flower and plant",
    },
    {
      word: "position",
      hint: "Location of someone or something",
    },
    {
      word: "feather",
      hint: "Hair like outer covering of bird",
    },
    {
      word: "comfort",
      hint: "A pleasant feeling of relaxation",
    },
    {
      word: "tongue",
      hint: "The muscular organ of mouth",
    },
    {
      word: "expansion",
      hint: "The process of increase or grow",
    },
    {
      word: "country",
      hint: "A politically identified region",
    },
    {
      word: "group",
      hint: "A number of objects or persons",
    },
    {
      word: "taste",
      hint: "Ability of tongue to detect flavour",
    },
    {
      word: "store",
      hint: "Large shop where goods are traded",
    },
    {
      word: "field",
      hint: "Area of land for farming activities",
    },
    {
      word: "friend",
      hint: "Person other than a family member",
    },
    {
      word: "pocket",
      hint: "A bag for carrying small items",
    },
    {
      word: "needle",
      hint: "A thin and sharp metal pin",
    },
    {
      word: "expert",
      hint: "Person with extensive knowledge",
    },
    {
      word: "statement",
      hint: "A declaration of something",
    },
    {
      word: "second",
      hint: "One-sixtieth of a minute",
    },
    {
      word: "library",
      hint: "Place containing collection of books",
    },

  ];
  
  const hardWords = [
    {
      word: "MIGRATION",
      hint: "Movement from one place to another",
    },
    {
      word: "ENVIRONMENT",
      hint: "The surroundings in which an organism lives",
    },
    {
      word: "MICROSCOPE",
      hint: "An optical instrument for magnifying small objects",
    },
    {
      word: "TEMPERATURE",
      hint: "The degree or intensity of heat present in a substance or object",
    },
    {
      word: "ELEPHANT",
      hint: "A large herbivorous mammal with a long trunk",
    },
    {
      word: "CONTINENT",
      hint: "A large, continuous mass of land",
    },
    {
      word: "EXPERIMENT",
      hint: "A scientific procedure undertaken to make a discovery",
    },
    {
      word: "NUCLEUS",
      hint: "The central and most important part of an object or group",
    },
    {
      word: "MOLECULE",
      hint: "A group of atoms bonded together",
    },
    {
      word: "PLATINUM",
      hint: "A precious silvery-white metal",
    },
    {
      word: "SKELETON",
      hint: "The framework of bones in a human or animal body",
    },
    {
      word: "METAMORPHOSIS",
      hint: "A change of the form or nature of a thing or person into a completely different one",
    },
    {
      word: "ECLIPSE",
      hint: "An obscuring of the light from one celestial body by the passage of another",
    },
    {
      word: "PHOTOSYNTHESIS",
      hint: "The process by which green plants and some other organisms use sunlight to synthesize foods",
    },
    {
      word: "ASTEROID",
      hint: "A small rocky body orbiting the sun",
    },
    {
      word: "ELECTRONICS",
      hint: "The branch of physics and technology concerned with the design of circuits",
    },
    {
      word: "GLACIER",
      hint: "A slowly moving mass or river of ice formed by the accumulation and compaction of snow on mountains",
    },
    {
      word: "PRESSURE",
      hint: "Continuous physical force exerted on or against an object",
    },
    {
      word: "COMMUNICATION",
      hint: "The imparting or exchanging of information",
    },
    {
      word: "EVOLUTION",
      hint: "The gradual development of something",
    },
  ];
  
let words = easyWords;

const difficultyButtons = document.querySelector(".difficulty-buttons");

difficultyButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains("easy-btn")) {
    words = easyWords;
  } else if (event.target.classList.contains("hard-btn")) {
    words = hardWords;
  }
  initGame();
});

const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh"),
  checkBtn = document.querySelector(".check");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    Swal.fire({
      icon: 'info',
      title: 'Time off!',
      text: `${correctWord.toUpperCase()} was the correct word`,
    });
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return Swal.fire({
    icon: 'warning',
    title: 'Warning',
    text: 'Please enter the word to check!',
  });
  if (userWord !== correctWord)
    return Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: `${userWord} is not a correct word`,
    });
  Swal.fire({
    icon: 'success',
    title: 'Congrats!',
    text: `${correctWord.toUpperCase()} is the correct word`,
  }).then(() => {
    initGame();
  });
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);