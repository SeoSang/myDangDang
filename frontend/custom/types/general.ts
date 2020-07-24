import { UserActionTypes, UserState } from "./reducerTypes_user"
import { PostActionTypes, PostState } from "./reducerTypes_post"
import { NextPageContext } from "next"
import { Store } from "redux"

export type AllActionTypes = UserActionTypes | PostActionTypes

export const BACKEND_URL =
  process.env.NODE_ENV === "production" ? "http://18.189.0.7" : "http://localhost:8388"

export interface StoreState {
  user: UserState
  post: PostState
}

export interface Context extends NextPageContext {
  // store : {getState() : StoreState}
  store: Store
}
