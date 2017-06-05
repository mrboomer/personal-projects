import { createSelector } from 'reselect';

/**
 * Direct selector to the firebaseChat state domain
 */
const selectFirebaseChatDomain = () => (state) => state.get('firebaseChat');

/**
 * Other specific selectors
 */
const makeSelectIsAuthenticated = () => createSelector(
   selectFirebaseChatDomain(),
   (substate) => substate.get('isAuthenticated')
 );

const makeSelectUserId = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('userId')
);

const makeSelectUser = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('user')
 );

const makeSelectMessage = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('message')
);

const makeSelectMessages = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('messages')
);

const makeSelectAuthCheckError = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('authCheckError')
);

const makeSelectGetUserIdError = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('getUserIdError')
);

const makeSelectGetMessagesError = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('getMessagesError')
);

const makeSelectProcessSubmitError = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.get('processSubmitError')
);


/**
 * Default selector used by FirebaseChat
 */

const makeSelectFirebaseChat = () => createSelector(
  selectFirebaseChatDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFirebaseChat;
export {
  makeSelectIsAuthenticated,
  makeSelectUserId,
  makeSelectUser,
  makeSelectMessage,
  makeSelectMessages,
  makeSelectAuthCheckError,
  makeSelectGetUserIdError,
  makeSelectGetMessagesError,
  makeSelectProcessSubmitError,
};
