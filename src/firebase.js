import firebase from 'firebase'
import 'firebase/firestore'

/*firebase = require("firebase/app");

// Add additional services you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");*/


firebase.initializeApp({
    apiKey: "AIzaSyDt4TUicjnEGLqpDpHdCVRdCAHcxF7IWbE",
    authDomain: "visitore-cli.firebaseapp.com",
    databaseURL: "https://visitore-cli.firebaseio.com",
    projectId: "visitore-cli",
    storageBucket: "visitore-cli.appspot.com",
    messagingSenderId: "768269165399"
  });
const db = firebase.firestore()
export default db
