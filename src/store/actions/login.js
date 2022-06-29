import { setToken } from '@/utils/token'
import request from '@/utils/request'

export const login = (mobile, code) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', {
      mobile,
      code,
    })
    const { token } = res.data
    dispatch({
      type: 'login/token',
      payload: token,
    })
    setToken(token)
  }
}
