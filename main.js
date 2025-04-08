// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters

let lettetrsArray = Array.from(letters);
console.log(lettetrsArray);

// Select Letters Container

let lettersContainer = document.querySelector(".letters");

// Generate Lettres

lettetrsArray.forEach((letter) => {
  let span = document.createElement("span");

  let theLetter = document.createTextNode(letter);

  span.appendChild(theLetter);

  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "python"],
  movies: ["attakc"],
  people: ["Helal Ahmed"],
  countries: ["Saudi"],
};
let allKeys = Object.keys(words);
// console.log(allKeys);
// Get Random Property
let keysPropName = allKeys[Math.floor(Math.random() * allKeys.length)];
let chosenArray = words[keysPropName];

let randomWord = chosenArray[Math.floor(Math.random() * chosenArray.length)];
console.log(randomWord);

let categorySpan = document.querySelector(".category span");

let randomWordNode = document.createTextNode(keysPropName);

// Append to Sapn

categorySpan.appendChild(randomWordNode);

// Select the element

let lettersGuess = document.querySelector(".letters-guess");

// convert randomWord To Array
const convertedWord = randomWord.toLowerCase().split("");

convertedWord.forEach((e) => {
  let span = document.createElement("span");
  if (e === " ") {
    span.className = "has-space";
  }
  lettersGuess.appendChild(span);
});

console.log(convertedWord);

// letters click
let allSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts

let wrongAttempets = 0;
let theSpansStates = 0;
//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
  let theStates = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get clicked Letter
    let letterClicked = e.target.innerHTML.toLowerCase();

    // loop on the chosen Word To Check If Meet The Clicked Letter
    convertedWord.forEach((e, index) => {
      if (e === letterClicked) {
        //Set States To True
        theStates = true;
        allSpans[index].innerHTML = letterClicked.toUpperCase();
        theSpansStates++;
      }
    });
    // If Letter Is Wrong
    if (!theStates) {
      wrongAttempets++;
      theDraw.classList.add(`wrong${wrongAttempets}`);

      if (wrongAttempets === 7) {
        lettersContainer.classList.add("finished");
      }
      document.getElementById("fail").play();
    } else {
      document.getElementById("success").play();
      if (convertedWord.includes(" ")) {
        if (theSpansStates === randomWord.length - 1) {
          lettersGuess.classList.add("corrected");
          winGame();
        }
      } else {
        if (theSpansStates === randomWord.length) {
          lettersGuess.classList.add("corrected");
          winGame();
        }
      }

      // Set The Animation
      if (theDraw.classList.contains("wrong7")) {
        document.querySelector(".the-man").style.animation =
          "moving 2s infinite ease-in-out alternate";
      }
    }
  }
});

function winGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode("");
  if (wrongAttempets === 0) {
    divText.textContent = `You Very Smart, You Win with ${wrongAttempets} Tries`;
  } else if (randomWord.length / 2 >= wrongAttempets) {
    divText.textContent = `You  Smart, You Win with ${wrongAttempets} Tries`;
  } else {
    divText.textContent = `You Win with ${wrongAttempets} Tries`;
  }
  div.appendChild(divText);
  div.classList.add("success-pop-up");
  document.body.appendChild(div);
}
