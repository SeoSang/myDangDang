const env = process.env.NODE_ENV || "development"
const config = require("../config/config.js")[env]
import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize"

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// These are all the attributes in the User model
interface UserAttributes {
  id: number
  name: string
  nickname: string | null
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number // Note that the `null assertion` `!` is required in strict mode.
  public name!: string
  public nickname!: string | null // for nullable fields

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Post> // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Post, number>
  public hasProject!: HasManyHasAssociationMixin<Post, number>
  public countProjects!: HasManyCountAssociationsMixin
  public createProject!: HasManyCreateAssociationMixin<Post>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly posts?: Post[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Post>
  }
}

interface PostAttributes {
  id: number
  ownerId: number
  title: string
  description?: string
  imgSrc: string
}

interface ProjectCreationAttributes extends Optional<PostAttributes, "id"> {}

class Post extends Model<PostAttributes, ProjectCreationAttributes> implements PostAttributes {
  public id!: number
  public ownerId!: number
  public title!: string
  public description?: string
  public imgSrc!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(400),
      allowNull: true,
    },
    imgSrc: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장돼요
    sequelize,
    tableName: "projects",
  },
)

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    nickname: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장돼요
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  },
)

User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "projects", // this determines the name in `associations`!
})

async function doStuffWithUser() {
  const newUser = await User.create({
    name: "Seo",
    nickname: "SeoSang",
  })
  console.log(newUser.id, newUser.name, newUser.nickname)

  const ourUser = await User.findByPk(1, {
    include: [User.associations.projects],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  })

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(ourUser.posts![0].title)
}
