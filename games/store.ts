import {
  AnyAction,
  Dispatch,
  MiddlewareAPI,
  applyMiddleware,
  createStore,
  compose,
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./reducers"

//타입에 에러가 없으면 굳이 인터페이스 선언 안해도된다.
const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
}

//미들웨어 불러오기 (thunk는 13줄밖에 안되니까 디펜던시 추가안하고 그냥 입력해준다. 버전관리를 위해)
const firstMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    console.log("로깅", action)
    next(action)
  }

const thunkMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (typeof action === "function") {
      //비동기
      return action(store.dispatch, store.getState)
    }
    return next(action) //동기
  }

//미들웨어 장착 및 환경에따라 분리
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware))

const store = createStore(reducer, initialState, enhancer)

export default store
