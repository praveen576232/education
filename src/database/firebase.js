import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCiThJSs-LtrhoH6JyfwzAVe9O9xgH7bHA",
    authDomain: "education-d4662.firebaseapp.com",
    projectId: "education-d4662",
    storageBucket: "education-d4662.appspot.com",
    messagingSenderId: "898090174312",
    appId: "1:898090174312:web:276bd90cd29a81fbae78dd"
  };
  const app = firebase.initializeApp(firebaseConfig)
  const auth = app.auth();
  const db = app.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  export default db;
  export {auth,provider};