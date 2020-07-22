import produce from "immer"
import {
  PostState,
  PostActionTypes,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../custom/types/reducerTypes_post"

export const initialState: PostState = {
  mainPosts: [],
  imagePath: "",
  imagePaths: [],
  addPostErrorReason: "", // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false,
  addCommentErrorReason: "",
  commentAdded: false,
  likeErrorReason: "",
  unlikeErrorReason: "",
  hasMorePost: true,
  singlePost: null,
}

const reducer = (state = initialState, action: PostActionTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true
        draft.addPostErrorReason = ""
        draft.postAdded = false
        break
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false
        draft.mainPosts.unshift(action.data)
        draft.postAdded = true
        draft.imagePaths = []
        draft.imagePath = ""
        break
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false
        draft.addPostErrorReason = action.error
        break
      }
      case UPLOAD_IMAGE_REQUEST: {
        break
      }
      case UPLOAD_IMAGE_SUCCESS: {
        draft.imagePath = action.data
      }
      case UPLOAD_IMAGE_FAILURE: {
        break
      }
      case UPLOAD_IMAGES_REQUEST: {
        break
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data?.forEach((imgPath: string) => {
          draft.imagePaths.push(imgPath)
        })
      }
      case UPLOAD_IMAGES_FAILURE: {
        break
      }
    }
  })
}

export default reducer
