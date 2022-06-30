import { setToken, removeToken } from 'utils/token'
import request from 'utils/request'

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

export const logout = () => {
  return (dispatch, getState) => {
    // 1 清除 token
    dispatch({ type: 'login/clearToken' })
    // 清除本地 token
    removeToken()
    // 2 清除个人信息
    dispatch({ type: 'user/clearInfo' })
  }
}
