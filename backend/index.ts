import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import userRouter from "./routes/user"
import cookieParser from "cookie-parser"
import postRouter, { CustomRequest } from "./routes/post"
import db from "./models"
import cors from "cors"
import expressSession from "express-session"
import passport from "passport"
import passportConfig from "./passport"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

dotenv.config()
var app = express()
db.sequelize?.sync()

app.use(express.json()) // json 형싟 처리
app.use(express.urlencoded({ extended: true })) // form 처리
app.get("/favicon.ico", (req, res) => res.status(204))

// ------ session과 쿠키 관련 ------------------------------------------------

app.use(cookieParser(process.env.COOKIE_PASSWORD))
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_PASSWORD!,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: false, // https를 쓸 때 true
      domain: IS_PRODUCTION ? "my-dangdnag.ml" : "",
    },
    name: "mingsesss",
  }),
)

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

// ------ 로그인 관련 ------------------------------------------------

passportConfig() // express Session 후에 해야된다.
app.use(passport.initialize())
app.use(passport.session())

// ------ ajax ------------------------------------------------------------

app.use(express.static("dangdangs"))
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)

app.get("/debug", (req: CustomRequest, res) => {
  res.json({
    "req.session": req.session, // 세션 데이터
    "req.user": req.user, // 유저 데이터(뒷 부분에서 설명)
    "req._passport": req._passport, // 패스포트 데이터(뒷 부분에서 설명)
  })
})

app.get("/", (req, res) => {
  res.send("Sever main")
})

app.listen(8388, () => {
  console.log("8388 server start http://localhost:8388 ")
})
