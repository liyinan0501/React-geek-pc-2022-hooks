import axios from 'axios'
import { setToken } from '@/utils'

export const login = (mobile, code) => {
  return async (dispatch) => {
    const res = await axios.post(
      'http://geek.itheima.net/v1_0/authorizations',
      {
        mobile,
        code,
      }
    )
    const { token } = res.data.data
    dispatch({
      type: 'login/token',
      payload: token,
    })
    setToken(token)
  }
}
