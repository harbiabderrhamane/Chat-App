import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCilM-sxj50VqzZ3L0_so0eyQnH6PWupWs",
    authDomain: "chat-app-3e626.firebaseapp.com",
    projectId: "chat-app-3e626",
    storageBucket: "chat-app-3e626.appspot.com",
    messagingSenderId: "164890424454",
    appId: "1:164890424454:web:680cea3f4f5df805684d07",
    measurementId: "G-4PHWPFB2FE"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }