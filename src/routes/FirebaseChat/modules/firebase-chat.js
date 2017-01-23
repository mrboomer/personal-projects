// ------------------------------------
// Constants
// ------------------------------------
export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const HANDLE_KEYDOWN = 'HANDLE_KEYDOWN'
export const HANDLE_CLICK = 'HANDLE_CLICK'

// ------------------------------------
// Actions
// ------------------------------------

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
  [HANDLE_CHANGE]: (state, action) => {
    return {
      messages: state.messages,
      message: action.message
    }
  },
  [HANDLE_KEYDOWN]: (state, action) => {
    if (action.key === 'Enter' && state.message) {
      let messages = [...state.messages, state.message]
      return {
        messages,
        message: ''
      }
    }
    return state
  },
  [HANDLE_CLICK]: (state, action) => {
    if (state.message) {
      let messages = [...state.messages, state.message]
      return {
        messages,
        message: ''
      }
    }
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  messages: [],
  message: ''
}
export default function testReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
