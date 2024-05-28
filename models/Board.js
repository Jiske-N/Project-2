const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Board extends Model {}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "board",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Board;
