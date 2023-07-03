import { observable, action } from "mobx"

//observable사용해서 객체로 묶어줌
const userStore = observable({
  isLoggingIn: false,
  data: null,
  //액션이 필수는 아니지만 없으면 비동기때 제대로 업데이트가 안될 수 있음 그래서 함수는 액션으로 감싸주는게 디버깅에 유리
  logIn: action((data) => {
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

const postStore = observable({
  data: [],
  addPost: action((data) => {
    postStore.data.push(data)
  }),
})

export { userStore, postStore }
