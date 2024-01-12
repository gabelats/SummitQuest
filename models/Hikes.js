const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Hikes extends Model {}

Hikes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    peak_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "peaks",
        key: "id",
      },
    },
    time_taken: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
    journal: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "hikes",
  }
);

module.exports = Hikes;
