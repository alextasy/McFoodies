import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBIvf2hp3BX5Oj9gZmmRJ7ZjEeVzzBIUl8",
    authDomain: "mcfoodie-s.firebaseapp.com",
    databaseURL: "https://mcfoodie-s.firebaseio.com",
    projectId: "mcfoodie-s",
    storageBucket: "mcfoodie-s.appspot.com",
    messagingSenderId: "987727906598",
    appId: "1:987727906598:web:87223537039431f6d323e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const storage = firebase.storage();
  export const database = firebase.firestore();
  export const firebaseAuth = firebase.auth(); 

  export default firebase;

 