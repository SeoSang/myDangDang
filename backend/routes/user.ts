import express from "express"
import { user } from "../models"
import bcypt from "bcrypt"
const router = express.Router()

router.get("/", (req, res) => {})

router.get("/:id", (req, res) => {})

// 회원가입
router.post("/signup", async (req: express.Request, res, next) => {
  try {
    console.log("routes__user.ts")
    const exUser = await user.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUser) {
      console.log("이미 사용중인 아이디입니다.")
      return res.status(403).send("이미 사용중인 아이디입니다.")
    }
    const hashedPassword = await bcypt.hash(req.body.password, 12)
    const newUser = await user.create({
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
