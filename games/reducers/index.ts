import { combineReducers } from "redux"
import userReducer from "./user"
import postReducer from "./post"

const reducer = combineReducers({
  user: userReducer,
  posts: postReducer,
})

//함수의 리턴타입을 가져옴
export type RootState = ReturnType<typeof reducer>
export default reducer
