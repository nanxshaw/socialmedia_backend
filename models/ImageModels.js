const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Image = db.define('T_IMAGE', {
    id_image: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.INTEGER
    },
    id_detail_user: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Image;