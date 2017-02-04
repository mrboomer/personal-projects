// ------------------------------------
// Constants
// ------------------------------------
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const LOAD_MESSAGES = 'LOAD_MESSAGES'
export const ADD_USER = 'ADD_USER'
export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const HANDLE_SUBMIT = 'HANDLE_SUBMIT'

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

export const authenticateUser = (auth) => {
  return (dispatch, getState) => {
    auth.signInAnonymously().then(user => {
      let userId = user.uid
      return dispatch({
        type: AUTHENTICATE_USER,
        userId
      })
    }).catch(() => {
      return dispatch({
        type: AUTHENTICATE_USER,
        userId: null
      })
    })
  }
}

export const loadMessages = (database) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      database.ref('messages/public').on('child_added', dbMessages => {
        let messages = [
          ...getState().chat.messages,
          dbMessages.val()
        ]
        return dispatch({
          type: LOAD_MESSAGES,
          messages
        })
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

export const handleSubmit = (database, type, key) => {
  return (dispatch, getState) => {
    const onKeyEnter = type === 'keydown' && key === 'Enter' && getState().chat.message
    const onClick = type === 'click' && getState().chat.message
    if (onKeyEnter || onClick) {
      const time = new Date()
      database.ref('messages/public').push().set({
        userId: getState().chat.userId,
        user: getState().chat.user,
        message: getState().chat.message,
        time: JSON.stringify(time)
      }).then(() => {
        return dispatch({
          type: HANDLE_SUBMIT,
          time
        })
      })
    }
  }
}

export const actions = {
  checkAuthentication,
  authenticateUser,
  loadMessages,
  addUser,
  handleChange,
  handleSubmit
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
  [AUTHENTICATE_USER]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      userId: action.userId,
      user: state.user,
      message: state.message,
      messages: state.messages
    }
  },
  [LOAD_MESSAGES]: (state, action) => {
    return {
      isAuthenticated: state.isAuthenticated,
      userId: state.userId,
      user: state.user,
      message: state.message,
      messages: action.messages
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
  [HANDLE_SUBMIT]: (state, action) => {
    if (state.message) {
      let messages = [...state.messages]
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
