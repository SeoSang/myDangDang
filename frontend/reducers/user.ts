import {
  UserState,
  UserActionTypes,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
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
      case LOG_IN_REQUEST:
        break
      case LOG_IN_SUCCESS:
        break
      case LOG_IN_FAILURE:
        break

      case SIGN_UP_REQUEST:
        break
      case SIGN_UP_SUCCESS:
        break
      case SIGN_UP_FAILURE:
        break
    }
  })
}

export default reducer
