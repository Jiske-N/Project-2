const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class List extends Model {}

List.init(
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
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "board",
                key: "id",
            },
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "user_s",
        //         key: "id",
        //     },
        // },
    },
    {
        sequelize,
        modelName: "list",
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = List;
