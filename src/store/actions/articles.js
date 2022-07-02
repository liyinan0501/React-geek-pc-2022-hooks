import request from 'utils/request'

export const getArticles = (params) => {
  return async (dispatch) => {
    const res = await request.get('/mp/articles', { params })
    const {
      page: current,
      per_page: pageSize,
      results: list,
      total_count: total,
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
        total,
        current,
        pageSize,
      },
    })
  }
}

export const delArticle = (id, params) => {
  return async (dispatch) => {
    await request.delete(`/mp/articles/${id}`)
    dispatch(getArticles(params))
  }
}

// export const addArticle = (data, draft = false) => {
//   return async () => {
//     await request.post(`/mp/articles?draft=${draft}`, data)
//   }
// }

// export const editArticle = (data, draft) => {
//   return async () => {
//     await request.put(`/mp/articles/${data.id}?draft=${draft}`, data)
//   }
// }

export function publishArticle(data, isDraft, isEdit) {
  return async () => {
    if (!isEdit) {
      //  发布
      await request.post(`/mp/articles?draft=${isDraft}`, data)
    } else {
      // 修改
      await request.put(`/mp/articles/${data.id}?draft=${isDraft}`, data)
    }
  }
}
