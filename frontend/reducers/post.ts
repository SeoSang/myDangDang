import produce from "immer"
import { PostState, PostActionTypes } from "../custom/types/reducerTypes_post"

export const initialState: PostState = {
  mainPosts: [],
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
    }
  })
}

export default reducer
