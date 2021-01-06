//Set up a database
const database = {
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  symbols: ["?", "!", "#", "&", "$", "@", "*", "%", "^"],
  lowercase: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
};
database["uppercase"] = database.lowercase.map((item) => item.toUpperCase());
const collection = [];
const parameters = document.querySelectorAll(".checkbox");

parameters.forEach((checkbox) => {
  checkbox.addEventListener("change", checked);
});

//Choose a random character
function randomChar() {
  let setNumber = Math.floor(Math.random() * collection.length);
  let randomSet = collection[setNumber];
  let randomPos = Math.floor(Math.random() * randomSet.length);
  character = randomSet[randomPos];
}

//Set up the length of a password
const range = document.querySelector("#range");
const lengthDisplay = document.querySelector(".length-number");
lengthDisplay.value = range.value;

range.addEventListener("input", reload);

function reload() {
  lengthDisplay.value = this.value;
}

let password = document.querySelector(".password");
const generateBtn = document.querySelector(".gen-btn");
const copyBtn = document.querySelector(".copy-btn");

generateBtn.addEventListener("click", () => {
  changeBG();
  deletePrev();
  isEmpty();
  for (i = 0; i < range.value; i++) {
    randomChar();
    password.value += character;
  }
});

//Copy the generated password//
copyBtn.addEventListener("click", copyText);

function copyText() {
  password.select();
  document.execCommand("copy");
  alert("password has been copied: " + password.value);
}

function checked() {
  if (this.checked == true) {
    collection.push(database[this.name]);
  } else {
    index = collection.indexOf(database[this.name]);
    collection.splice(index, 1);
  }
}
function deletePrev() {
  password.value = [];
}

function isEmpty() {
  if (collection.length == 0) {
    alert("Please select the category/ies of signs for your password ");
  }
}

//Background
const auth = "563492ad6f917000010000013dde5380f0be489db2c25d66e3c0574d";
const body = document.querySelector("body");

async function changeBG() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/search?query=forest&per_page=80",
    {
      method: "GET",
      headers: {
        Accept: "application/JSON",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  randomPhoto = Math.floor(Math.random() * 80);
  let photo = data.photos[randomPhoto].src.landscape;
  body.style.backgroundImage = "url(" + photo + ")";
}
changeBG();
