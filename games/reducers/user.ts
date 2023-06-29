import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT,
  LogInFailureAction,
  LogInRequestAction,
  LogInSuccessAction,
  LogOutAction,
} from "../actions/user"

export interface UserState {
  isLoggingIn: boolean
  data: { nickname: string } | null
}

const initialState = {
  isLoggingIn: false,
  data: null,
}

type UserReducerActions =
  | LogInFailureAction
  | LogInRequestAction
  | LogInSuccessAction
  | LogOutAction
const userReducer = (prevState = initialState, action: UserReducerActions) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return
    case LOG_IN_SUCCESS:
      return
    case LOG_IN_FAILURE:
      return
    case LOG_OUT:
      return {
        ...prevState,
        data: null,
      }
    default:
      return prevState
  }
}

export default userReducer
