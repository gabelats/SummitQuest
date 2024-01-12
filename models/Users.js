const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed_peaks: {
      type: DataTypes.ARRAY,
      references: {
        model: "peaks",
        key: "id",
      },
    },
    wishlist: {
      type: DataTypes.ARRAY,
      references: {
        model: "peaks",
        key: "id",
      },
    },
    bio: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

module.exports = Users;
