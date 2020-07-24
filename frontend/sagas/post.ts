import { takeLatest, call, all, fork, put } from "redux-saga/effects"
import axios from "axios"
import {
  AddPostRequestAction,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  DangDangPost,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
  ImageData,
  UploadImagesRequestAction,
  UploadImageRequestAction,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LoadPostRequestAction,
  LoadPostsRequestAction,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
} from "../custom/types/reducerTypes_post"
import { BACKEND_URL } from "../custom/types/general"

axios.defaults.baseURL = `${BACKEND_URL}/api`

function addPostAPI(postData: DangDangPost) {
  return axios.post("/post", postData)
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

function loadPostAPI(userId: number) {
  return axios.get(`/post/${userId}`)
}

function* loadPost(action: LoadPostRequestAction) {
  try {
    const result = yield call(loadPostAPI, action.postId!)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_POST_FAILURE,
      error: e,
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function loadPostsAPI() {
  return axios.get(`/post`)
}

function* loadPosts(action: LoadPostsRequestAction) {
  try {
    const result = yield call(loadPostsAPI)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: e,
    })
  }
}

function* watchLoadsPost() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function uploadImagesAPI(imageData: ImageData) {
  return axios.post(`/post/images`, imageData)
}
function* uploadImages(action: UploadImagesRequestAction) {
  try {
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data, // image 주소들
    })
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    })
  }
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function uploadImageAPI(imageData: ImageData) {
  return axios.post(`/post/image`, imageData)
}
function* uploadImage(action: UploadImageRequestAction) {
  try {
    const result = yield call(uploadImageAPI, action.data)
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data, // image 주소
    })
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: e,
    })
  }
}
function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchUploadImages),
    fork(watchUploadImage),
    fork(watchLoadPost),
    fork(watchLoadsPost),
  ])
}
