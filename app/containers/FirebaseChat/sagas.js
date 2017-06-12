import moment from 'moment';
import { eventChannel } from 'redux-saga';
import { take, call, fork, put, select, cancel, cancelled, takeLatest } from 'redux-saga/effects';
import { makeSelectUserId, makeSelectUser, makeSelectMessage } from 'containers/FirebaseChat/selectors';

import { LOCATION_CHANGE } from 'react-router-redux';
import {
  CHECK_AUTHENTICATION_REQUEST,
  GET_NEW_USER_ID_REQUEST,
  ADD_USER_REQUEST,
  START_MESSAGE_LISTENER,
  STOP_MESSAGE_LISTENER,
  PROCESS_SUBMIT_REQUEST,
} from 'containers/FirebaseChat/constants';

import { checkAuthentication, authenticateUser, addUser, getMessages, processSubmit } from 'containers/FirebaseChat/actions';

import { checkAuth, getNewUserId, saveUser, getUserName, saveMessage } from 'utils/firebase';
import { database } from 'helpers/firebase';


export function* authenticationCheck() {
  try {
    const userId = yield call(checkAuth);

    if (userId) {
      const user = yield call(getUserName, userId);
      yield put(checkAuthentication.success(true, userId, user));
    } else {
      yield put(checkAuthentication.success(false, userId, ''));
    }
  } catch (error) {
    yield put(checkAuthentication.failure(error));
  }
}

function* takeLatestAuthenticationCheck() {
  const watcher = yield takeLatest(CHECK_AUTHENTICATION_REQUEST, authenticationCheck);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


function* userIdRequest() {
  try {
    const newUserId = yield call(getNewUserId);
    yield put(authenticateUser.success(newUserId));
  } catch (error) {
    yield put(authenticateUser.failure(error));
  }
}

function* takeLatestUserIdRequest() {
  const watcher = yield takeLatest(GET_NEW_USER_ID_REQUEST, userIdRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


function* addUserRequest(action) {
  try {
    const user = action.user;
    const userId = yield select(makeSelectUserId());
    yield call(saveUser, userId, user);
    yield put(addUser.success(user));
  } catch (error) {
    yield put(addUser.failure(error));
  }
}

function* takeLatestAddUserRequest() {
  const watcher = yield takeLatest(ADD_USER_REQUEST, addUserRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


function messagesChannel() {
  return eventChannel((emit) => {
    const ref = database.ref('messages/public');
    ref.on('child_added', (messages) => {
      emit(messages.val());
    });
    return () => ref.off('child_added');
  });
}

function* loadMessages() {
  const chan = yield call(messagesChannel);
  try {
    while (true) {
      const message = yield take(chan);
      yield put(getMessages.success(message));
    }
  } catch (error) {
    yield put(getMessages.failure(error));
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}

function* startMessageListener() {
  while (true) {
    const loadMessagesTask = yield fork(loadMessages);
    yield take(STOP_MESSAGE_LISTENER);
    yield cancel(loadMessagesTask);
  }
}

function* takeLatestMessageListener() {
  const watcher = yield takeLatest(START_MESSAGE_LISTENER, startMessageListener);
  yield take(STOP_MESSAGE_LISTENER);
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
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  takeLatestAuthenticationCheck,
  takeLatestUserIdRequest,
  takeLatestAddUserRequest,
  takeLatestMessageListener,
  takeLatestMessageSubmit,
];
