import express from "express"
import db, { user } from "../models"
import bcypt from "bcrypt"
const router = express.Router()

router.get("/", (req, res) => {})

router.get("/:id", (req, res) => {})

// 회원가입
router.post("/", async (req: express.Request, res) => {
  try {
    const exUser = await user.findOne({
      where: {
        id: req.body.userId,
      },
    })
    if (exUser) {
      console.log("이미 사용중인 아이디입니다.")
      return res.status(403).send("이미 사용중인 아이디입니다.")
    }
    const hashedPassword = await bcypt.hash(req.body.password, 12)
    const newUser = await user.
  } catch (e) {
    console.error(e)
  }
})

export default router
