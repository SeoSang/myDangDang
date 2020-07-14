const env = process.env.NODE_ENV || "development"
const config = require("../config/config.js")[env]
import { Sequelize } from "sequelize"
import { User, userInit } from "./user"
import Post, { postInit } from "./post"

const db: DB = {}
interface DB {
  User?: User
  Post?: Post
  sequelize?: Sequelize
}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

async function doStuffWithUser() {
  const newUser = await User.create({
    name: "Seo",
    password: "test",
    nickname: "SeoSang",
  })
  console.log(newUser.id, newUser.name, newUser.nickname)

  const ourUser = await User.findByPk(1, {
    include: [User.associations.posts],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  })

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(ourUser.posts![0].title)
}

postInit(sequelize)
userInit(sequelize)

export const user = User
export const post = Post
db.sequelize = sequelize

export default db
