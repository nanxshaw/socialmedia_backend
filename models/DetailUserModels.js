const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const DetailUser = db.define('T_DETAIL_USER', {
    id_detail_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    id_verification: {
        type: DataTypes.INTEGER
    },
    id_user_information: {
        type: DataTypes.INTEGER
    },
    id_education: {
        type: DataTypes.INTEGER
    },
    id_work: {
        type: DataTypes.INTEGER
    },
    id_lifestyle: {
        type: DataTypes.INTEGER
    },
    id_interested: {
        type: DataTypes.INTEGER
    },
    created_date: {
        type: DataTypes.STRING
    },
    updated_date: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});


module.exports = DetailUser;