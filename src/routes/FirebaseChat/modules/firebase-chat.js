// ------------------------------------
// Constants
// ------------------------------------
export const ADD_USER = 'ADD_USER'
export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const HANDLE_KEYDOWN = 'HANDLE_KEYDOWN'
export const HANDLE_CLICK = 'HANDLE_CLICK'
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
export const AUTHENTICATE_FIREBASE = 'AUTHENTICATE_FIREBASE'

// ------------------------------------
// Actions
// ------------------------------------

export const checkAuthentication = (fireRef) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fireRef.auth().onAuthStateChanged(firebase => {
        let firebaseId = firebase.uid
        if (firebaseId) {
          // Firebase Authenticated
          dispatch({
            type: IS_AUTHENTICATED,
            isAuthenticated: true,
            firebaseId
          })
          resolve()
        } else {
          dispatch({
            type: IS_AUTHENTICATED,
            isAuthenticated: false,
            firebaseId: null
          })
          resolve()
        }
      })
    })
  }
}

export const authenticateFirebase = (fireRef) => {
  return (dispatch, getState) => {
    fireRef.auth().signInAnonymously().then(firebase => {
      console.log('redux.authenticateFirebase:', firebase)
      let firebaseId = firebase.uid
      return dispatch({
        type: AUTHENTICATE_FIREBASE,
        firebaseId
      })
    }).catch(() => {
      return dispatch({
        type: AUTHENTICATE_FIREBASE,
        firebaseId: null
      })
    })
  }
}

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  }
}

export const handleChange = (message) => {
  return {
    type: HANDLE_CHANGE,
    message
  }
}

export const handleKeyDown = (key) => {
  return {
    type: HANDLE_KEYDOWN,
    key
  }
}

export const handleClick = () => {
  return {
    type: HANDLE_CLICK
  }
}

export const actions = {
  handleChange,
  handleKeyDown,
  handleClick
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IS_AUTHENTICATED]: (state, action) => {
    return {
      isAuthenticated: action.isAuthenticated,
      firebaseId: action.firebaseId,
      user: state.user,
      userId: action.userId,
      message: state.message,
      messages: state.messages
    }
  },
  [AUTHENTICATE_FIREBASE]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      firebaseId: action.firebaseId,
      user: state.user,
      userId: action.userId,
      message: state.message,
      messages: state.messages
    }
  },
  [ADD_USER]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      firebaseId: state.firebaseId,
      user: action.user,
      userId: state.userId,
      message: state.message,
      messages: state.messages
    }
  },
  [HANDLE_CHANGE]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      firebaseId: state.firebaseId,
      user: state.user,
      message: action.message,
      messages: state.messages
    }
  },
  [HANDLE_KEYDOWN]: (state, action) => {
    if (action.key === 'Enter' && state.message) {
      const messages = [...state.messages, {
        user: state.user,
        text: state.message,
        time: new Date()
      }]
      return {
        isAuthenticated: state.isAuthenticated,
        firebaseId: state.firebaseId,
        user: state.user,
        message: '',
        messages
      }
    }
    return state
  },
  [HANDLE_CLICK]: (state, action) => {
    if (state.message) {
      const messages = [...state.messages, {
        user: state.user,
        text: state.message,
        time: new Date()
      }]
      return {
        isAuthenticated: state.isAuthenticated,
        firebaseId: state.firebaseId,
        user: state.user,
        message: '',
        messages
      }
    }
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuthenticated: false,
  firebaseId: null,
  user: '',
  message: '',
  messages: []
}
export default function firebaseChatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
