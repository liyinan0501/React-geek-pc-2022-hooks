import request from 'utils/request'

export const getArticles = (params) => {
  return async (dispatch) => {
    const res = await request.get('/mp/articles', { params })
    const {
      page,
      per_page: pageSize,
      results: list,
      total_count: count,
    } = res.data

    dispatch({
      type: 'article/getArticles',
      payload: {
        list: list.map((item) => {
          return {
            ...item,
            cover: item.cover.images[0],
          }
        }),
        count,
        page,
        pageSize,
      },
    })
  }
}
