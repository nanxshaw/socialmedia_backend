const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Comment = db.define('comment', {
    id_comment: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_content: {
        type: DataTypes.INTEGER
    },
    id_users: {
        type: DataTypes.INTEGER,
    },
    comment: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});
module.exports = Comment;