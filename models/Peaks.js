const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Peaks extends Model {}

Peaks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    peak_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    elevation: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permit_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    peak_image_route: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "peaks",
  }
);

module.exports = Peaks;
