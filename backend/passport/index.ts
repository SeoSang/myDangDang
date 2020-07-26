import passport from "passport"
import { users, posts } from "../models"
import local from "./local"
import { User } from "../models/user"
import { Model } from "sequelize/types"

// 세션에 로그인 정보 넣기.
const index = () => {
  // 세션에 user.id 값을 넣어준다.
  passport.serializeUser((user: User, done) => {
    return done(null, user.id)
  })
  // 세션에서 찾아서 req.user에 넣어주기
  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log("passport__index.js 실행")
      const user = await users.findOne({
        where: { id },
        include: [
          {
            model: posts as any,
            as: "posts",
            attributes: ["id"],
          },
        ],
      })
      return done(null, user) // req.user
    } catch (e) {
      console.error(e)
      return done(e)
    }
  })

  local()
}

export default index
