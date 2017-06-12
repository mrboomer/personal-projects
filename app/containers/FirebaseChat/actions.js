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
  START_MESSAGE_LISTENER,
  STOP_MESSAGE_LISTENER,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  HANDLE_CHANGE,
  PROCESS_SUBMIT_REQUEST,
  PROCESS_SUBMIT_SUCCESS,
  PROCESS_SUBMIT_FAILURE,
} from './constants';

const checkAuthentication = {
  request: () => ({
    type: CHECK_AUTHENTICATION_REQUEST,
  }),
  success: (isAuthenticated, userId, user) => ({
    type: CHECK_AUTHENTICATION_SUCCESS,
    isAuthenticated,
    userId,
    user,
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
  start: () => ({
    type: START_MESSAGE_LISTENER,
  }),
  stop: () => ({
    type: STOP_MESSAGE_LISTENER,
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

const addUser = {
  request: (user) => ({
    type: ADD_USER_REQUEST,
    user,
  }),
  success: (user) => ({
    type: ADD_USER_SUCCESS,
    user,
  }),
  failure: (error) => ({
    type: ADD_USER_FAILURE,
    error,
  }),
};

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
