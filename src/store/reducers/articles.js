const initialState = {
  list: [],
  count: 0,
  page: 1,
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
