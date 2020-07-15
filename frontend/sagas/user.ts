import { takeLatest, call, all, fork, put } from "redux-saga/effects"
import {
  LOG_IN_REQUEST,
  LoginRequestData,
  LoginRequestAction,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
} from "../custom/types/reducerTypes_user"
import axios from "axios"

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
      data: result,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

export default function* userSaga() {
  yield all([fork(watchLogin)])
}
