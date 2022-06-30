const initialState = {}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'user/getUserProfile':
      return action.payload

    case 'user/clearInfo':
      return initialState

    default:
      return state
  }
}

export default user
