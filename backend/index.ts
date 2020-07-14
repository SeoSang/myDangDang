import express from "express"
import userRouter from "./routes/user"
import postRouter from "./routes/post"
import db from "./models"

var app = express()

db.sequelize?.sync()

app.get("/api/user", userRouter)
app.get("/api/post", postRouter)

app.get("/", (req, res) => {
  res.send("Sever main")
})

app.listen(8080, () => {
  console.log("8080 server start http://localhost:8080 ")
})
