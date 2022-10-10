const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const UserInformation = db.define('T_USER_INFORMATION', {
    id_user_information: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    weight: {
        type: DataTypes.STRING
    },
    height: {
        type: DataTypes.STRING
    },
    zodiac: {
        type: DataTypes.STRING
    },
    blood_type: {
        type: DataTypes.STRING
    },
    vaccinated: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = UserInformation;