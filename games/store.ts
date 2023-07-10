import { observable, action } from "mobx"

export interface User {
  nickname: string
  password: string
}

interface UserStore {
  isLoggingIn: boolean
  data: User | null
  logIn: (data: User) => void
  logOut: () => void
}

//observable사용해서 객체로 묶어줌
const userStore = observable<UserStore>({
  isLoggingIn: false,
  data: null,
  //액션이 필수는 아니지만 없으면 비동기때 제대로 업데이트가 안될 수 있음 그래서 함수는 액션으로 감싸주는게 디버깅에 유리
  logIn: action((data: User) => {
    userStore.isLoggingIn = true
    setTimeout(() => {
      userStore.data = data
      userStore.isLoggingIn = false
      postStore.addPost("hello")
    }, 2000)
  }),
  logOut: action(() => {
    userStore.data = null
  }),
})

interface PostStore {
  data: string[]
  addPost: (data: string) => void
}

const postStore = observable<PostStore>({
  data: [],
  addPost: action((data: string) => {
    postStore.data.push(data)
  }),
})

export { userStore, postStore }
