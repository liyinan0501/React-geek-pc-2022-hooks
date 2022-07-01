import { combineReducers } from 'redux'
import login from './login'
import user from './user'
import channel from './channel'
import article from './articles'

export default combineReducers({ login, user, channel, article })
