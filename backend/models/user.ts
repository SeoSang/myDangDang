import {
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize,
  DataTypes,
} from "sequelize"
import Post from "./post"

interface UserAttributes {
  id: number
  name: string
  password: string
  nickname: string | null
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number // Note that the `null assertion` `!` is required in strict mode.
  public name!: string
  public password!: string
  public nickname!: string | null // for nullable fields

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getPosts!: HasManyGetAssociationsMixin<Post> // Note the null assertions!
  public addPost!: HasManyAddAssociationMixin<Post, number>
  public hasPost!: HasManyHasAssociationMixin<Post, number>
  public countPosts!: HasManyCountAssociationsMixin
  public createPost!: HasManyCreateAssociationMixin<Post>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly posts?: Post[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    posts: Association<User, Post>
  }
}

export const userInit = (sequelize: Sequelize) => {
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
      password: {
        type: DataTypes.STRING(100),
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
      modelName: "User", // We need to choose the model name
    },
  )

  User.hasMany(Post, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "posts", // this determines the name in `associations`!
  })
}
