import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdqMVQxTo8nUSFDbwi7isnvYqLLd9nSGk",
  authDomain: "presentation-semi.firebaseapp.com",
  databaseURL:
    "https://presentation-semi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "presentation-semi",
  storageBucket: "presentation-semi.appspot.com",
  messagingSenderId: "514626973839",
  appId: "1:514626973839:web:d9894890e83862fdb880fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const input = document.getElementById("main-input");
const form = document.getElementById("form");
const container = document.getElementById("container");

let oldDataLoaded = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // let id = makeid(5);
  console.log(input.value);
  if (input.value.trim() == "") return;
  set(ref(db, "input/" + Date.now().toString()), {
    input: input.value,
  });
  input.value = "";
});

const userInputData = () => {
  set(ref(db, "hello"), {
    hello: "hello",
    mello: "mello",
    tello: "shello",
  });
};
const dbRef = ref(db, "input");
userInputData();
onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (!oldDataLoaded) {
    for (const [key, value] of Object.entries(data)) {
      createParagraph(value, null);
      // let oNewP = document.createElement("p");
      // document.body.appendChild(oNewP);
      // let oText = document.createTextNode(value.input);
      // oNewP.appendChild(oText);
      // container.appendChild(oNewP);
      // let img = document.createElement("img");
      // img.src = value.input;
      // let src = document.getElementById("header");
      // src.appendChild(img);
    }
    oldDataLoaded = true;
  } else {
    console.log(Object.keys(data).pop());
    let last = Object.keys(data).pop();
    createParagraph(data, last);
    // let oNewP = document.createElement("p");

    // let text = document.createTextNode(data[last].input);
    // oNewP.appendChild(text);
    // // document.body.appendChild(oNewP);
    // container.appendChild(oNewP);
  }
});

const createParagraph = (data, lastElementTimeStamp) => {
  let oNewP = document.createElement("p");
  let text;

  if (!oldDataLoaded) {
    console.log(data);
    text = document.createTextNode(data.input);
  } else {
    console.log("triggered");
    text = document.createTextNode(data[lastElementTimeStamp].input);
  }
  oNewP.appendChild(text);
  container.appendChild(oNewP);
};
