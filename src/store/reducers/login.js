const login = (state = '', action) => {
  switch (action.type) {
    case 'login/token':
      return action.payload

    default:
      return state
  }
}

export default login
