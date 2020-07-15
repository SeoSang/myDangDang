// 하위 리듀서들 하나로 묶어주는 index

import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import { UserState } from "../custom/types/reducerTypes_user"
import { PostState } from "../custom/types/reducerTypes_post"

export interface StoreState {
  user: UserState
  post: PostState
}

const rootReducer = combineReducers<StoreState>({
  user,
  post,
})

export default rootReducer
