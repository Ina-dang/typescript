import * as React from "react"
import { createContext, ReactElement, FC } from "react"
import { userStore, postStore } from "./store"

//MobX특징 =>reducer x, 객체 사용해서 자유롭게 사용가능
export const storeContext = React.createContext({
  userStore,
  postStore,
})

interface Props {
  children: ReactElement
}

export const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <storeContext.Provider value={{ userStore, postStore }}>
      {children}
    </storeContext.Provider>
  )
}
