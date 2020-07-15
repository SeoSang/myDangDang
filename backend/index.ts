import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import userRouter from "./routes/user"
import postRouter from "./routes/post"
import db from "./models"
import cors from "cors"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

dotenv.config()
var app = express()

db.sequelize?.sync()

app.use(express.json()) // json 형싟 처리
app.use(express.urlencoded({ extended: true })) // form 처리
app.get("/favicon.ico", (req, res) => res.status(204))

if (IS_PRODUCTION) {
  app.use(
    cors({
      origin: /my-dangdang\.ml$/,
      credentials: true,
    }),
  )
} else {
  app.use(morgan("dev")) // 로그 저장용
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
}

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)

app.get("/", (req, res) => {
  res.send("Sever main")
})

app.listen(8388, () => {
  console.log("8388 server start http://localhost:8388 ")
})
