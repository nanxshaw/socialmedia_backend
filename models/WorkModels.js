const { Sequelize } = require("sequelize");
const db = require("./db");

const { DataTypes } = Sequelize;

const Work = db.define('T_WORK', {
    id_work: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    occupation: {
        type: DataTypes.STRING
    },
    company: {
        type: DataTypes.STRING
    },
    job_type: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,

});


module.exports = Work;