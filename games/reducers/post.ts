import { ADD_POST, AddPostAction } from "../actions/post"

const initialState: string[] = []

// //객체의 속성으로는 never가 나오고 위처럼 string 안넣어주면 any가 된다. 꼭 타입넣어주기
// const obj = {
//   array: []
// }

const postReducer = (
  prevState = initialState,
  action: AddPostAction
): string[] => {
  switch (action.type) {
    case ADD_POST:
      return [...prevState, action.data]
    default:
      return prevState
  }
}

export default postReducer
