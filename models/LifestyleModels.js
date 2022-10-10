const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Lifestyle = db.define('T_LIFESTYLE', {
    id_lifestyle: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    looking_for: {
        type: DataTypes.STRING
    },
    pets: {
        type: DataTypes.STRING
    },
    exercise: {
        type: DataTypes.STRING
    },
    smoking: {
        type: DataTypes.STRING
    },
    drinking: {
        type: DataTypes.STRING
    },
    off_day: {
        type: DataTypes.STRING
    },
    diet: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Lifestyle;