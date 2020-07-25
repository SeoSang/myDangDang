import express, { Request } from "express"
import multer from "multer"
import path from "path"
import { posts, users } from "../models"
import { User } from "../models/user"

export interface CustomRequest extends Request {
  user?: any
  _passport?: any
}

const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "dangdangs")
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext)
      done(null, basename + new Date().valueOf() + ext)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
})

router.post("/image", upload.single("image"), (req, res) => {
  res.json(req.file.path)
})

router.get("/", async (req, res) => {
  try {
    const main_posts = await posts.findAll({})
    res.json(main_posts)
  } catch (e) {
    console.error(e)
  }
})
router.get("/:id", (req, res) => {})
router.post("/", upload.none(), async (req: CustomRequest, res, next) => {
  try {
    const newPost = await posts.create({
      title: req.body.title, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
      ownerId: req.user ? req.user.id : 1,
      imgSrc: req.body.image,
      description: req.body.description,
    })
    res.json(newPost)
  } catch (e) {
    console.error(e)
    next(e)
  }
}) //  add post

export default router
