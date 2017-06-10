import moment from 'moment';
import { eventChannel } from 'redux-saga';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { makeSelectUserId, makeSelectUser, makeSelectMessage } from 'containers/FirebaseChat/selectors';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHECK_AUTHENTICATION_REQUEST, GET_NEW_USER_ID_REQUEST, GET_MESSAGES_REQUEST, PROCESS_SUBMIT_REQUEST } from 'containers/FirebaseChat/constants';
import { checkAuthentication, authenticateUser, getMessages, processSubmit } from 'containers/FirebaseChat/actions';

import { checkAuth, getNewUserId, saveMessage } from 'utils/firebase';
import { database } from 'helpers/firebase';

export function* authenticationCheck() {
  try {
    const userId = yield call(checkAuth);

    if (userId) {
      yield put(checkAuthentication.success(true, userId));
    } else {
      yield put(checkAuthentication.success(false, userId));
    }
  } catch (error) {
    yield put(checkAuthentication.failure(error));
  }
}

function* takeLatestAuthenticationCheck() {
  const watcher = yield takeLatest(CHECK_AUTHENTICATION_REQUEST, authenticationCheck);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* userIdRequest() {
  try {
    const newUserId = yield call(getNewUserId);

    if (newUserId) {
      yield put(authenticateUser.success(newUserId));
    } else {
      yield put(authenticateUser.success(newUserId));
    }
  } catch (error) {
    yield put(authenticateUser.failure(error));
  }
}

function* takeLatestUserIdRequest() {
  const watcher = yield takeLatest(GET_NEW_USER_ID_REQUEST, userIdRequest);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function userMessagesChannel() {
  return eventChannel((emit) => {
    database.ref('messages/public').on('child_added', (messages) => {
      emit(messages.val());
    });
    return () => false; // TODO: Add componentWillUnmount() to fix this unsubscribe function
  });
}

function* loadUserMessage() {
  const chan = yield call(userMessagesChannel);
  try {
    while (true) {
      const message = yield take(chan);
      yield put(getMessages.success(message));
    }
  } catch (error) {
    yield put(getMessages.failure(error));
  }
}

function* takeLatestLoadUserMessage() {
  const watcher = yield takeLatest(GET_MESSAGES_REQUEST, loadUserMessage);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


function* messageSubmit() {
  try {
    const timestamp = moment().format();
    const userId = yield select(makeSelectUserId());
    const user = yield select(makeSelectUser());
    const message = yield select(makeSelectMessage());

    yield call(saveMessage, userId, user, message, timestamp);
    yield put(processSubmit.success());
  } catch (error) {
    yield put(processSubmit.failure(error));
  }
}

function* takeLatestMessageSubmit() {
  const watcher = yield takeLatest(PROCESS_SUBMIT_REQUEST, messageSubmit);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  takeLatestAuthenticationCheck,
  takeLatestUserIdRequest,
  takeLatestLoadUserMessage,
  takeLatestMessageSubmit,
];
