import request from 'utils/request'

export const getChannels = () => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    const { channels } = res.data
    dispatch({
      type: 'article/getChannels',
      payload: channels,
    })
  }
}
