// models/Audit.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Counter = require("./Counter");

const Audit = sequelize.define("Audit", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tableName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recordId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "audits",
    timestamps: true,
});

module.exports = Audit