import express from "express"
import multer from "multer"
import path from "path"

const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "/dangdangs")
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext)
      done(null, basename + new Date().valueOf() + ext)
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
})

router.post("/images", upload.single("image"), (req, res) => {
  res.json(req.file)
})

router.get("/", (req, res) => {})
router.get("/:id", (req, res) => {})
router.post("/", (req, res) => {})

export default router
