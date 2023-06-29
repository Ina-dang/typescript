import { createStore } from "redux"
import reducer from "./reducers"

//타입에 에러가 없으면 굳이 인터페이스 선언 안해도된다.
const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
}

const store = createStore(reducer, initialState)

export default store
