import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY58ltu6EpqDw31z-0YhOoU4Kgt8tUrpQ",
    authDomain: "studentrecords-efc70.firebaseapp.com",
    projectId: "studentrecords-efc70",
    storageBucket: "studentrecords-efc70.appspot.com",
    messagingSenderId: "561287654338",
    appId: "1:561287654338:web:694600eae3acec3fa2c45b",
    measurementId: "G-R704YJPS2Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;