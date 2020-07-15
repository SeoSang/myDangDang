import { takeLatest, call, all, fork, put } from "redux-saga/effects"
import axios from "axios"
import {
  AddPostRequestAction,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../custom/types/reducerTypes_post"
import { BACKEND_URL } from "../custom/types/general"

axios.defaults.baseURL = `${BACKEND_URL}/api`

function addPostAPI(postData) {
  return axios.post("/post", postData, {
    withCredentials: true, // 쿠키 주고받을 수 있다.
  })
}

function* addPost(action: AddPostRequestAction) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
  yield all([fork(watchAddPost)])
}
