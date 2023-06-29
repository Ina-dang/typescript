export const LOG_IN_REQUEST = "LOG_IN_REQUEST" as const
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" as const
export const LOG_IN_FAILURE = "LOG_IN_FAILURE" as const
export const LOG_OUT = "LOG_OUT"

export interface LogInRequestAction {
  type: typeof LOG_IN_REQUEST
  data: { id: string; password: string }
}
export interface LogInSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data: { id: string; nickname: string }
}
export interface LogInFailureAction {
  type: typeof LOG_IN_FAILURE
  err: Error
}

export const logIn = (data: { id: string; password: string }) => {
  //thunk 구현할거
}

export interface LogOutAction {
  type: typeof LOG_OUT
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}
