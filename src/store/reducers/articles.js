const initialState = {
  list: [],
  total: 0,
  current: 1,
  pageSize: 10,
}

const article = (state = initialState, action) => {
  if (action.type === 'article/getArticles') {
    return {
      ...state,
      ...action.payload,
    }
  }
  return state
}

export default article
