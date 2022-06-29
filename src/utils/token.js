const TOKEN_KEY = 'itcast_geek_pc'

// 获取token
export const getToken = () => localStorage.getItem(TOKEN_KEY)
// 存储token
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
// 清除token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
// 是否已登录
export const hasToken = () => !!getToken()
