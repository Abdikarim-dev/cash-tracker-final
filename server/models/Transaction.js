const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Users = require("./User");

const Account = require("./Account")

const Transaction = sequelize.define("Transaction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM(["DEBIT", "CREDIT"]),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'Amount must be greater than zero',
            },
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    account: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: "id"
        }
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
Transaction.belongsTo(Account, {
    foreignKey: "account",
    as: "accountInfo"
})

// ASSOCIATION FOR THE USER INFO
Transaction.belongsTo(Users, {
    foreignKey: "userId",
    as: "userInfo"
})

module.exports = Transaction