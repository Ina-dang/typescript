import * as React from "react"
import { createContext } from "react"
import { userStore, postStore } from "./store"

//MobX특징 =>reducer x, 객체 사용해서 자유롭게 사용가능
export const storeContext = React.createContext({
  userStore,
  postStore,
})

export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider value={{ userStore, postStore }}>
      {children}
    </storeContext.Provider>
  )
}
