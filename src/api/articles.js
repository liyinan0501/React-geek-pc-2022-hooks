import request from 'utils/request'
/**
 * get Article by id
 * @param {*} id
 */
export function getArticleById(id) {
  return request.get(`/mp/articles/${id}`)
}
