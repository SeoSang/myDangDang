import { UserActionTypes, UserState } from "./reducerTypes_user"
import { PostActionTypes, PostState } from "./reducerTypes_post"

export type AllActionTypes = UserActionTypes | PostActionTypes

export const BACKEND_URL =
  process.env.NODE_ENV === "production" ? "http://18.189.0.7" : "http://localhost:8388"

export interface StoreState {
  user: UserState
  post: PostState
}
