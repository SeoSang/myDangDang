import {
  UserState,
  UserActionTypes,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  RESET_EXCPEPT_USER,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../custom/types/reducerTypes_user"
import produce from "immer"

export const initialState: UserState = {
  isLoggingIn: false,
  isLoggingOut: false,
  loginErrorReason: "",
  isSignedUp: false,
  isSigningUp: false,
  isEditingNickname: false,
  signUpErrorReason: "",
  me: null,
  userInfo: null,
}

const reducer = (state = initialState, action: UserActionTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RESET_EXCPEPT_USER:
        draft.isEditingNickname = false
        draft.isSignedUp = false
        draft.isSigningUp = false
        draft.signUpErrorReason = ""
        draft.userInfo = null
        draft.isLoggingIn = false
        draft.isLoggingOut = false
        draft.loginErrorReason = ""
        break
      case LOG_IN_REQUEST:
        draft.isLoggingIn = true
        draft.loginErrorReason = ""
        break
      case LOG_IN_SUCCESS:
        draft.isLoggingIn = false
        draft.me = action.data
        break
      case LOG_IN_FAILURE:
        draft.me = null
        draft.isLoggingIn = false
        draft.loginErrorReason = action.error
        break
      case LOAD_USER_REQUEST:
        break
      case LOAD_USER_SUCCESS:
        if (action.me) {
          draft.me = action.data
        } else {
          draft.userInfo = action.data
        }
        break
      case LOAD_USER_FAILURE:
        break

      case SIGN_UP_REQUEST:
        draft.isSigningUp = true
        draft.signUpErrorReason = ""
        break
      case SIGN_UP_SUCCESS:
        draft.isSigningUp = false
        draft.isSignedUp = true
        break
      case SIGN_UP_FAILURE:
        draft.isSigningUp = false
        draft.signUpErrorReason = action.error
        break
    }
  })
}

export default reducer
