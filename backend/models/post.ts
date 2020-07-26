import { Model, Optional, DataTypes, Sequelize, Association } from "sequelize"
import { User } from "./user"

interface PostAttributes {
  id: number
  ownerId: number
  title: string
  description?: string
  imgSrc: string
}

interface ProjectCreationAttributes extends Optional<PostAttributes, "id"> {}

export default class Post extends Model<PostAttributes, ProjectCreationAttributes>
  implements PostAttributes {
  public id!: number
  public ownerId!: number
  public title!: string
  public description?: string
  public imgSrc!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public static associations: {
    owner: Association<Post, User>
  }
}

export const postInit = (sequelize: Sequelize) => {
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
      tableName: "posts",
      modelName: "Post", // We need to choose the model name
    },
  )
}
