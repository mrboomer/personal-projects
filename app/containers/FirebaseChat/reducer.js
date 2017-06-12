/*
 *
 * FirebaseChat reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  CHECK_AUTHENTICATION_SUCCESS,
  CHECK_AUTHENTICATION_FAILURE,
  GET_NEW_USER_ID_SUCCESS,
  GET_NEW_USER_ID_FAILURE,
  STOP_MESSAGE_LISTENER,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
  ADD_USER_SUCCESS,
  HANDLE_CHANGE,
  PROCESS_SUBMIT_SUCCESS,
  PROCESS_SUBMIT_FAILURE,
} from './constants';

const initialState = fromJS({
  isAuthenticated: null,
  userId: null,
  user: '',
  message: '',
  messages: [],
  authCheckError: null,
  getUserIdError: null,
  getMessagesError: null,
  processSubmitError: null,
});

function firebaseChatReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_AUTHENTICATION_SUCCESS:
      return state
        .set('isAuthenticated', action.isAuthenticated)
        .set('userId', action.userId)
        .set('user', action.user)
        .set('authCheckError', null);
    case CHECK_AUTHENTICATION_FAILURE:
      return state
        .set('authCheckError', action.error);
    case GET_NEW_USER_ID_SUCCESS:
      return state
        .set('isAuthenticated', true)
        .set('userId', action.userId)
        .set('getUserIdError', null);
    case GET_NEW_USER_ID_FAILURE:
      return state
        .set('getUserIdError', action.error);
    case STOP_MESSAGE_LISTENER:
      return state
        .set('isAuthenticated', null)
        .set('userId', null)
        .set('user', '')
        .set('messages', List());
    case GET_MESSAGE_SUCCESS:
      return state
        .set('messages', state.get('messages').push(action.message));
    case GET_MESSAGE_FAILURE:
      return state
        .set('getMessagesError', action.error);
    case ADD_USER_SUCCESS:
      return state
        .set('user', action.user);
    case HANDLE_CHANGE:
      return state
        .set('message', action.message);
    case PROCESS_SUBMIT_SUCCESS:
      return state
        .set('message', '');
    case PROCESS_SUBMIT_FAILURE:
      return state
        .set('processSubmitError', action.error);
    default:
      return state;
  }
}

export default firebaseChatReducer;
