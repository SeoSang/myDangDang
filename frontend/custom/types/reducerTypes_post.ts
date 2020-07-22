export const ADD_POST_REQUEST = "ADD_POST_REQUEST" as const
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS" as const
export const ADD_POST_FAILURE = "ADD_POST_FAILURE" as const
export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST" as const
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS" as const
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE" as const
export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST" as const
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS" as const
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE" as const

export interface PostData {
  imgSrc: string
  description: string
  title: string
}

export interface ImageData {
  imgSrc: string
}

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
export interface UploadImagesRequestAction {
  type: typeof UPLOAD_IMAGES_REQUEST
  data?: any
}
export interface UploadImagesSuccessAction {
  type: typeof UPLOAD_IMAGES_SUCCESS
  data?: any
}
export interface UploadImagesFailureAction {
  type: typeof UPLOAD_IMAGES_FAILURE
  error?: any
}
export interface UploadImageRequestAction {
  type: typeof UPLOAD_IMAGE_REQUEST
  data?: any
}
export interface UploadImageSuccessAction {
  type: typeof UPLOAD_IMAGE_SUCCESS
  data?: any
}
export interface UploadImageFailureAction {
  type: typeof UPLOAD_IMAGE_FAILURE
  error?: any
}

export type PostActionTypes =
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  | UploadImagesRequestAction
  | UploadImagesSuccessAction
  | UploadImagesFailureAction
  | UploadImageRequestAction
  | UploadImageSuccessAction
  | UploadImageFailureAction

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
  imagePath: string
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
