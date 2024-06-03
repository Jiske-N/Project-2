const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create Task model and datatypes.
class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user_s",
                key: "id",
            },
        },

        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "list",
                key: "id",
            },
        },
        due_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "task",
    }
);

module.exports = Task;
