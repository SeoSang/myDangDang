export const ADD_POST_REQUEST = "ADD_POST_REQUEST" as const
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS" as const
export const ADD_POST_FAILURE = "ADD_POST_FAILURE" as const

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST
  data?: any
}
export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  data?: any
}
export interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE
  error?: any
}

export type PostActionTypes = AddPostRequestAction | AddPostSuccessAction | AddPostFailureAction

export interface Image {
  id: number
  src: string
  createdAt: string
  updatedAt: string
  postId?: number
}

export interface PostState {
  // TODO
  mainPosts: Array<MainPost>
  imagePaths: string[]
  addPostErrorReason: string | null
  isAddingPost: boolean
  postAdded: boolean
  isAddingComment: boolean
  addCommentErrorReason: string | null
  commentAdded: boolean
  likeErrorReason: string | null
  unlikeErrorReason: string | null
  hasMorePost: boolean
  singlePost: MainPost | null
}

export interface MainPost {
  id: number
  UserId?: number
  content: string
  Images?: Image[]
  createdAt?: any
  deletedAt?: any
  Likers?: { id: number }[] | null
  User?: { id: number; nickname: string }
}
