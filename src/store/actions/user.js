import request from 'utils/request'

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    const res = await request.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${getState().login}`,
      },
    })
    dispatch({
      type: 'user/getUserProfile',
      payload: res.data,
    })
  }
}
