const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Verification = db.define('T_VERIFICATION', {
    id_verification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ktp: {
        type: DataTypes.STRING
    },
    user_ktp: {
        type: DataTypes.STRING
    },
    status_verification: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Verification;