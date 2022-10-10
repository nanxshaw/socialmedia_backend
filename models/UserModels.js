const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const User = db.define('T_USER', {
    id_user: {
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
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    password_old: {
        type: DataTypes.STRING
    },
    id_detail_user: {
        type: DataTypes.INTEGER
    },
    token: {
        type: DataTypes.TEXT,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = User;