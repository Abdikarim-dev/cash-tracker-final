// models/Audit.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Counter = require("./Counter");
const Users = require("./User");

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "audits",
    timestamps: true,
});

// ASSOCIATION FOR THE USER INFO
Audit.belongsTo(Users, {
    foreignKey: "userId",
    as: "userInfo"
})

module.exports = Audit