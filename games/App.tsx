import { action } from "mobx"
import { useLocalStore, useObserver } from "mobx-react"
import * as React from "react"
import { useCallback } from "react"

import { postStore, userStore } from "./store"

const App = () => {
  //mobx의 state
  const state = useLocalStore(() => ({
    name: "",
    password: "",
    onChangeName: action(function (e) {
      this.name = e.target.value
    }),
    onChangePassword: action(function (e) {
      this.password = e.target.value
    }),
  }))

  const onLogIn = useCallback(() => {
    userStore.logIn({
      nickname: state.name,
      password: state.password,
    })
  }, [state.name, state.password])

  const onLogOut = useCallback(() => {
    userStore.logOut()
  }, [])

  return useObserver(() => (
    <div>
      {userStore.isLoggingIn ? (
        <div>로그인중</div>
      ) : userStore.data ? (
        <div>{userStore.data.nickname}</div>
      ) : (
        "로그인해주세요"
      )}
      {!userStore.data ? (
        <button onClick={onLogIn}>로그인</button>
      ) : (
        <button onClick={onLogOut}>로그아웃</button>
      )}
      <div>
        <input value={state.name} onChange={state.onChangeName} />
        <input
          value={state.password}
          type="password"
          onChange={state.onChangePassword}
        />
      </div>
    </div>
  ))
}

export default App
