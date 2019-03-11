import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCIGhFkfcny-nWlleKYG9pLiB5pXyTwsc8",
    authDomain: "my-project-1520250568624.firebaseapp.com",
    databaseURL: "https://my-project-1520250568624.firebaseio.com",
    projectId: "my-project-1520250568624",
    storageBucket: "my-project-1520250568624.appspot.com",
    messagingSenderId: "717675085949"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, base, facebookProvider }