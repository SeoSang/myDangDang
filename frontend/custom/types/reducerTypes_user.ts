// 로그인
export const RESET_EXCPEPT_USER = "RESET_EXCPEPT_USER" as const

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST" as const
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS" as const
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE" as const

export const LOG_IN_REQUEST = "LOG_IN_REQUEST" as const
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" as const
export const LOG_IN_FAILURE = "LOG_IN_FAILURE" as const

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST" as const
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS" as const
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE" as const

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST" as const
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS" as const
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE" as const

export interface LoginRequestData {
  email: string
  password: string
}
export interface SignUpRequestData {
  email: string
  password: string
  confirm: string
  nickname: string
  agreement: Boolean
}

export interface ResetExceptUserAction {
  type: typeof RESET_EXCPEPT_USER
}
export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  data: LoginRequestData
}
export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data?: any
}
export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
  error?: string
}
export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}
export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS
}
export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
  error?: string
}

export interface LoadUserRequestAction {
  type: typeof LOAD_USER_REQUEST
  userId: number
}
export interface LoadUserSuccessAction {
  type: typeof LOAD_USER_SUCCESS
  data: UserInfo
  me?: boolean
}
export interface LoadUserFailureAction {
  type: typeof LOAD_USER_FAILURE
  error?: string
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  data: SignUpRequestData
}
export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
  data?: any
}
export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE
  error?: string
}

export type UserActionTypes =
  | ResetExceptUserAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | LoadUserRequestAction
  | LoadUserSuccessAction
  | LoadUserFailureAction
  | SignUpRequestAction
  | SignUpSuccessAction
  | SignUpFailureAction

export interface UserInfo {
  id: number
  nickname: string
  email?: string
  createdAt?: string
  updatedAt?: string
  Posts: { id: number }[]
}

export interface UserState {
  isLoggingIn: boolean
  isLoggingOut: boolean
  loginErrorReason: string | undefined | ""
  isSignedUp: boolean
  isSigningUp: boolean
  signUpErrorReason: string | undefined | ""
  me: UserInfo | null
  userInfo: null | UserInfo
  isEditingNickname: boolean
}
