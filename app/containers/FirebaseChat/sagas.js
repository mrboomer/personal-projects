import moment from 'moment';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { makeSelectUserId, makeSelectUser, makeSelectMessage } from 'containers/FirebaseChat/selectors';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHECK_AUTHENTICATION_REQUEST, GET_NEW_USER_ID_REQUEST, GET_MESSAGES_REQUEST, PROCESS_SUBMIT_REQUEST } from 'containers/FirebaseChat/constants';
import { checkAuthentication, authenticateUser, getMessages, processSubmit } from 'containers/FirebaseChat/actions';

import { checkAuth, getNewUserId, getMessagesFromDb, saveMessage } from 'utils/firebase';

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

export function* takeLatestAuthenticationCheck() {
  const watcher = yield takeLatest(CHECK_AUTHENTICATION_REQUEST, authenticationCheck);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userIdRequest() {
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

export function* takeLatestUserIdRequest() {
  const watcher = yield takeLatest(GET_NEW_USER_ID_REQUEST, userIdRequest);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getUserMessages() {
  try {
    const dbMessages = yield call(getMessagesFromDb);

    yield put(getMessages.success(dbMessages));
  } catch (error) {
    yield put(getMessages.failure(error));
  }
}

export function* takeLatestGetUserMessages() {
  const watcher = yield takeLatest(GET_MESSAGES_REQUEST, getUserMessages);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* messageSubmit() {
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

export function* takeLatestMessageSubmit() {
  const watcher = yield takeLatest(PROCESS_SUBMIT_REQUEST, messageSubmit);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  takeLatestAuthenticationCheck,
  takeLatestUserIdRequest,
  takeLatestGetUserMessages,
  takeLatestMessageSubmit,
];
