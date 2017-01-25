// ------------------------------------
// Constants
// ------------------------------------
export const ADD_USER = 'ADD_USER'
export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const HANDLE_KEYDOWN = 'HANDLE_KEYDOWN'
export const HANDLE_CLICK = 'HANDLE_CLICK'

// ------------------------------------
// Actions
// ------------------------------------

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
  [ADD_USER]: (state, action) => {
    return {
      user: action.user,
      message: state.message,
      messages: state.messages
    }
  },
  [HANDLE_CHANGE]: (state, action) => {
    return {
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
  user: '',
  message: '',
  messages: []
}
export default function testReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
