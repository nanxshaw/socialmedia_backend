const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const User = db.define('users', {
    id_users: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status_login: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.STRING,
    },
    updated_at: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});
module.exports = User;