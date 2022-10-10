const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Interested = db.define('T_INTERESTED', {
    id_interested: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sport: {
        type: DataTypes.STRING
    },
    food: {
        type: DataTypes.STRING
    },
    music: {
        type: DataTypes.STRING
    },
    movie: {
        type: DataTypes.STRING
    },
    books: {
        type: DataTypes.STRING
    },
    travel: {
        type: DataTypes.STRING
    },
    other: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Interested;