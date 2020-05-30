import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD55mjdOv2yJbGMjLPUSdoSlseTrKTZQU0',
  authDomain: 'userbricks-2e1de.firebaseapp.com',
  databaseURL: 'https://userbricks-2e1de.firebaseio.com',
  projectId: 'userbricks-2e1de',
  storageBucket: 'userbricks-2e1de.appspot.com',
  messagingSenderId: '669176879957',
  appId: '1:669176879957:web:01f0c306db10c7839eeddc',
};

// Get a Firestore instance
const db = firebase.initializeApp(firebaseConfig).firestore();

const {
  Timestamp, GeoPoint, FieldValue,
} = firebase.firestore;
export {
  db, Timestamp, GeoPoint, FieldValue,
};
