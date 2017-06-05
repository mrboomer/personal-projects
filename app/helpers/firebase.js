import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAik25zvy6K6THu41L6X5TQszEcndziTHM',
  authDomain: 'daniel-escobedo.firebaseapp.com',
  databaseURL: 'https://daniel-escobedo.firebaseio.com',
  projectId: 'daniel-escobedo',
  storageBucket: 'daniel-escobedo.appspot.com',
  messagingSenderId: '762731445141',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const database = firebase.database();
