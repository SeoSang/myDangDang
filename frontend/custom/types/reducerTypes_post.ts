// 포스팅 관련
export const ADD_POST_REQUEST = "ADD_POST_REQUEST" as const
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS" as const
export const ADD_POST_FAILURE = "ADD_POST_FAILURE" as const
export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST" as const
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS" as const
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE" as const
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST" as const
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS" as const
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE" as const

// 이미지 관련
export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST" as const
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS" as const
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE" as const
export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST" as const
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS" as const
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE" as const

export interface Image {
  id: number
  src: string
  createdAt: string
  updatedAt: string
  postId?: number
}

export interface PostState {
  dangdangPosts: Array<DangDangPost>
  addPostErrorReason: string | null
  singlePost: DangDangPost | null
  isAddingPost: boolean
  isLoadingPost: boolean
  isAddingComment: boolean
  hasMorePost: boolean
  postAdded: boolean
  addCommentErrorReason: string | null
  commentAdded: boolean
  likeErrorReason: string | null
  unlikeErrorReason: string | null
  // image
  imagePath: string
  imagePaths: string[]
}

export interface DangDangPost {
  id: number
  title: string
  description: string
  userId?: number
  image?: Image
  createdAt?: any
  deletedAt?: any
  Likers?: { id: number }[] | null
  User?: { id: number; nickname: string }
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

export interface LoadPostRequestAction {
  type: typeof LOAD_POST_REQUEST
  postId?: number
}
export interface LoadPostSuccessAction {
  type: typeof LOAD_POST_SUCCESS
  data: DangDangPost
}
export interface LoadPostFailureAction {
  type: typeof LOAD_POST_FAILURE
  error?: any
}
export interface LoadPostsRequestAction {
  type: typeof LOAD_POSTS_REQUEST
  userId?: number
}
export interface LoadPostsSuccessAction {
  type: typeof LOAD_POSTS_SUCCESS
  data: DangDangPost[]
}
export interface LoadPostsFailureAction {
  type: typeof LOAD_POSTS_FAILURE
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
  | LoadPostRequestAction
  | LoadPostSuccessAction
  | LoadPostFailureAction
  | LoadPostsRequestAction
  | LoadPostsSuccessAction
  | LoadPostsFailureAction
  | UploadImagesRequestAction
  | UploadImagesSuccessAction
  | UploadImagesFailureAction
  | UploadImageRequestAction
  | UploadImageSuccessAction
  | UploadImageFailureAction
