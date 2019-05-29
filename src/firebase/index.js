import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyA3kl48PAopu6qY1wdXCMTMXc66p-SGeDc",
    authDomain: "image-480de.firebaseapp.com",
    databaseURL: "https://image-480de.firebaseio.com",
    projectId: "image-480de",
    storageBucket: "image-480de.appspot.com",
    messagingSenderId: "305796985388",
    appId: "1:305796985388:web:995d96006fe00922"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  const storage = firebase.storage();
  const database = firebase.database();

  export {
      storage, database, firebase as default
  }