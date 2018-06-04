import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD3VqMDrwMSCU6EEKmRNyJjCS-z1GeEUPw",
  authDomain: "recipe-app-249ae.firebaseapp.com",
  databaseURL: "https://recipe-app-249ae.firebaseio.com",
  projectId: "recipe-app-249ae",
  storageBucket: "recipe-app-249ae.appspot.com",
  messagingSenderId: "185755837363"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firebase.AutoId
firestore.settings(settings);






const recipeDB = {

}



export {
  auth,
  recipeDB,
  firestore
};