import { auth, database } from 'helpers/firebase';

export function checkAuth() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
}

export function saveUser(userId, user) {
  return new Promise((resolve) => {
    database.ref(`users/${userId}`).set({
      user,
    })
    .then(resolve);
  });
}

export function getUserName(userId) {
  return new Promise((resolve) => {
    database.ref(`users/${userId}`).once('value').then((snapshot) => {
      const userName = snapshot.val().user;
      resolve(userName);
    });
  });
}

export function getNewUserId() {
  return new Promise((resolve) => {
    auth.signInAnonymously()
    .then((user) => resolve(user.uid));
  });
}

export function saveMessage(userId, user, message, timestamp) {
  return new Promise((resolve) => {
    database.ref('messages/public').push().set({
      userId,
      user,
      message,
      timestamp,
    })
    .then(resolve);
  });
}
