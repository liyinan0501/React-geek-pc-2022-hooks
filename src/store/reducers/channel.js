const initialState = []

const channel = (state = initialState, action) => {
  switch (action.type) {
    case 'article/getChannels':
      return action.payload
    default:
      return state
  }
}

export default channel
