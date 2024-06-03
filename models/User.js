const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require("argon2");

class User extends Model {
  checkPassword(loginPw) {
    try {
      return argon2.verify(this.password, loginPw);
    } catch (error) {
      console.log("Error with user-checkpassword models/user.js", error);
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        try {
          newUserData.password = await argon2.hash(newUserData.password);
          return newUserData;
        } catch (error) {
          console.log("Error with beforeCreate hook models/user.js", error);
        }
      },
      beforeUpdate: async (updatedUserData) => {
        try {
          updatedUserData.password = await argon2.hash(
            updatedUserData.password
          );
          return updatedUserData;
        } catch (error) {
          console.log("Error with beforeUpdate hook models/user.js", error);
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
