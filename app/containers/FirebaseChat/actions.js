/*
 *
 * FirebaseChat actions
 *
 */

import {
  CHECK_AUTHENTICATION_REQUEST,
  CHECK_AUTHENTICATION_SUCCESS,
  CHECK_AUTHENTICATION_FAILURE,
  GET_NEW_USER_ID_REQUEST,
  GET_NEW_USER_ID_SUCCESS,
  GET_NEW_USER_ID_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
  ADD_USER,
  HANDLE_CHANGE,
  PROCESS_SUBMIT_REQUEST,
  PROCESS_SUBMIT_SUCCESS,
  PROCESS_SUBMIT_FAILURE,
} from './constants';

const checkAuthentication = {
  request: () => ({
    type: CHECK_AUTHENTICATION_REQUEST,
  }),
  success: (isAuthenticated, userId) => ({
    type: CHECK_AUTHENTICATION_SUCCESS,
    isAuthenticated,
    userId,
  }),
  failure: (error) => ({
    type: CHECK_AUTHENTICATION_FAILURE,
    error,
  }),
};

const authenticateUser = {
  request: () => ({
    type: GET_NEW_USER_ID_REQUEST,
  }),
  success: (userId) => ({
    type: GET_NEW_USER_ID_SUCCESS,
    userId,
  }),
  failure: (error) => ({
    type: GET_NEW_USER_ID_FAILURE,
    error,
  }),
};

const getMessages = {
  request: () => ({
    type: GET_MESSAGES_REQUEST,
  }),
  success: (message) => ({
    type: GET_MESSAGE_SUCCESS,
    message,
  }),
  failure: (error) => ({
    type: GET_MESSAGE_FAILURE,
    error,
  }),
};

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

const handleChange = (message) => ({
  type: HANDLE_CHANGE,
  message,
});

const processSubmit = {
  request: () => ({
    type: PROCESS_SUBMIT_REQUEST,
  }),
  success: () => ({
    type: PROCESS_SUBMIT_SUCCESS,
  }),
  failure: (error) => ({
    type: PROCESS_SUBMIT_FAILURE,
    error,
  }),
};

export {
  checkAuthentication,
  authenticateUser,
  getMessages,
  addUser,
  handleChange,
  processSubmit,
};
