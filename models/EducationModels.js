const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Education = db.define('T_EDUCATION', {
    id_education: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    school: {
        type: DataTypes.STRING
    },
    IPK: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Education;