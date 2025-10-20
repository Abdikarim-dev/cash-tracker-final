const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Users = require("./User");

const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
})

// ASSOCIATION FOR THE USER INFO
Account.belongsTo(Users, {
    foreignKey: "userId",
    as: "userInfo"
})

module.exports = Account