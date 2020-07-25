import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt"
import { users } from "../models"

//  로그인 전략
const local = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await users.findOne({ where: { email } })
          if (!user) {
            return done(null, false, { message: "존재하지 않는 사용자입니다!" })
          }
          const result = await bcrypt.compare(password, user.password)
          if (result) {
            return done(null, user)
          }
          return done(null, false, { message: "비밀번호가 틀립니다." })
        } catch (e) {
          console.error(e)
          return done(e) // 서버에러
        }
      },
    ),
  )
}

export default local
