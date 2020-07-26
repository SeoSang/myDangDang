import express from "express"
import { users, posts } from "../models"
import bcypt from "bcrypt"
import passport from "passport"
const router = express.Router()

router.get("/", (req, res) => {})

router.get("/:id", (req, res) => {})

// 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (info) {
      console.log(info.reason)
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr)
        }
        const fullUser = await users.findOne({
          where: { id: user.id },
          include: [
            {
              model: posts as any,
              attributes: ["id"],
            },
          ],
          attributes: ["id", "nickname", "email"],
        })
        return res.json(fullUser)
      } catch (e) {
        next(e)
      }
    })
  })(req, res, next)
})
// 회원가입
router.post("/signup", async (req: express.Request, res, next) => {
  try {
    const exUser = await users.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUser) {
      console.log("이미 사용중인 아이디입니다.")
      return res.status(403).send("이미 사용중인 아이디입니다.")
    }
    const hashedPassword = await bcypt.hash(req.body.password, 12)
    const newUser = await users.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    })
    return res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    console.log("routes__user__fail.ts")

    return next(e)
  }
})

export default router
