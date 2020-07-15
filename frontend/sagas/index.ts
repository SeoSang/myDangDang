import { all, call } from "redux-saga/effects"
import userSaga from "./user"
import postSaga from "./post"
import axios from "axios"
import { BACKEND_URL } from "../custom/types/general"

axios.defaults.baseURL = `${BACKEND_URL}/api`

export default function* rootSaga() {
  yield all([call(userSaga), call(postSaga)])
}
