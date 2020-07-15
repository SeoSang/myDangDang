import { all, call } from "redux-saga/effects"
import userSaga from "./user"
import postSaga from "./post"

export default function* rootSaga() {
  all([call(userSaga), call(postSaga)])
}
