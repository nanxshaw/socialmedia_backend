const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Content = db.define('content', {
    id_content: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    desc: {
        type: DataTypes.STRING
    },
    id_users: {
        type: DataTypes.INTEGER,
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
module.exports = Content;