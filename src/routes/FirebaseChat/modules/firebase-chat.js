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

export const checkAuthentication = (auth) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          let userId = user.uid
          dispatch({
            type: IS_AUTHENTICATED,
            isAuthenticated: true,
            userId
          })
          resolve()
        } else {
          dispatch({
            type: IS_AUTHENTICATED,
            isAuthenticated: false,
            userId: null
          })
          resolve()
        }
      })
    })
  }
}

export const authenticateFirebase = (auth) => {
  return (dispatch, getState) => {
    auth.signInAnonymously().then(user => {
      let userId = user.uid
      return dispatch({
        type: AUTHENTICATE_FIREBASE,
        userId
      })
    }).catch(() => {
      return dispatch({
        type: AUTHENTICATE_FIREBASE,
        userId: null
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
      userId: action.userId,
      user: state.user,
      message: state.message,
      messages: state.messages
    }
  },
  [AUTHENTICATE_FIREBASE]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      userId: action.userId,
      user: state.user,
      message: state.message,
      messages: state.messages
    }
  },
  [ADD_USER]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      userId: state.userId,
      user: action.user,
      message: state.message,
      messages: state.messages
    }
  },
  [HANDLE_CHANGE]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      userId: state.userId,
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
        userId: state.userId,
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
        userId: state.userId,
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
  isAuthenticated: null,
  userId: null,
  user: '',
  message: '',
  messages: []
}
export default function firebaseChatReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
