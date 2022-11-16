import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC9vYwger-d8DkWDY8NNj3QPNrqtOPGoR4",
  authDomain: "myhealth-60cb4.firebaseapp.com",
  projectId: "myhealth-60cb4",
  storageBucket: "myhealth-60cb4.appspot.com",
  messagingSenderId: "481384165019",
  appId: "1:481384165019:web:01f22bb0e600a274c3203e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { app, auth }