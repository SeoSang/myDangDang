// 로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST" as const
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" as const
export const LOG_IN_FAILURE = "LOG_IN_FAILURE" as const

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
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
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
