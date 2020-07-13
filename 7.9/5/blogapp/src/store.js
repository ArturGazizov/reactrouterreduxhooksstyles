import { createStore, combineReducers,applyMiddleware } from 'redux'
import {restartReducer,userReducer,usersReducer,notificationReducer,blogsReducer,BlogformVisibleReducer,LoginVisibleReducer} from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  restart:restartReducer,
  BlogformVisible:BlogformVisibleReducer,
  LoginVisible:LoginVisibleReducer
})

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk)))/**/
export default store
