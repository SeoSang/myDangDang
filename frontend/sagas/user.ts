import { takeLatest, call, all, fork, put } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LoginRequestData,
  LoginRequestAction,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  SignUpRequestData,
  SignUpRequestAction,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LoadUserRequestAction,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
} from "../custom/types/reducerTypes_user"
import axios from "axios"
import { BACKEND_URL } from "../custom/types/general"

axios.defaults.baseURL = `${BACKEND_URL}/api`

function loginAPI(loginData: LoginRequestData) {
  return axios.post("/user/login", loginData, {
    withCredentials: true, // 쿠키 주고받을 수 있다.
  })
}

function* login(action: LoginRequestAction) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function signUpAPI(signUpData: SignUpRequestData) {
  return axios.post("/user/signup", signUpData)
}

function* signUp(action: SignUpRequestAction) {
  try {
    yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
    yield alert("회원가입이 완료되었습니다.")
  } catch (e) {
    console.error(e)
    yield alert("회원가입 실패했습니다.")
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    })
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function logoutAPI() {
  return axios.post("/user/logout")
}

function* logOut() {
  try {
    yield call(logoutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
    yield alert("로그아웃이 완료되었습니다!")
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_OUT_FAILURE,
    })
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function loadUserAPI(userId: number) {
  return axios.get(`/user/${userId}`, { withCredentials: true })
}

function* loadUser(action: LoadUserRequestAction) {
  try {
    const result = yield call(loadUserAPI, action.userId)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: action.userId == -1 ? true : false,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignup), fork(watchLoadUser), fork(watchLogout)])
}
