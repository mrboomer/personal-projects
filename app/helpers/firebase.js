import * as firebase from 'firebase';
import config from '../../config';

// Initialize Firebase
const fbConfig = {
  apiKey: config.FIREBASE.API_KEY,
  authDomain: config.FIREBASE.AUTH_DOMAIN,
  databaseURL: config.FIREBASE.DATABASE_URL,
  projectId: config.FIREBASE.PROJECT_ID,
  storageBucket: config.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE.MESSAGING_SENDER_ID,
};

firebase.initializeApp(fbConfig);

export const auth = firebase.auth();

export const database = firebase.database();
