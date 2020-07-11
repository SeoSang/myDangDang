var express = require("express")
var app = express()

app.get("/", (req, res) => {
  res.send("Sever main")
})

app.listen(8080, () => {
  console.log("8080 server start http://localhost:8080 ")
})
