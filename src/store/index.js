import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/index'
import { getToken } from '@/utils'

const initialState = {
  login: getToken(),
}

const store = configureStore({ reducer, preloadedState: initialState })

export default store
