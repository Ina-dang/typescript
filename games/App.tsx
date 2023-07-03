import * as React from "react"
import { FC } from "react"
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { logIn, logOut } from "./actions/user"
import { RootState } from "./reducers"
import { UserState } from "./reducers/user"

const App: FC = () => {
  const { isLoggingIn, data } = useSelector<RootState, UserState>(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(logIn({ id: "inadang", password: "pwd" }))
  }

  const onLogout = () => {
    dispatch(logOut())
  }

  return (
    <div>
      {isLoggingIn ? (
        <div>로그인중</div>
      ) : data ? (
        <div>{data.nickname}</div>
      ) : (
        "로그인해주세요"
      )}
      {!data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </div>
  )
}

export default App
