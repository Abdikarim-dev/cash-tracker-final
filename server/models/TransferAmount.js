const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Users = require("./User");

const Account = require("./Account")

const TransferAmount = sequelize.define("TransferAmount", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    from_account: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: "id"
        }
    },
    to_account: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: "id"
        }
    },
    description: {
        type: DataTypes.STRING,
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

// ASSOCIATION FOR Account INFO  
TransferAmount.belongsTo(Account, {
    foreignKey: 'from_account',
    as: "from_transfer"
})
TransferAmount.belongsTo(Account, {
    foreignKey: 'to_account',
    as: "to_transfer"
})

// ASSOCIATION FOR THE USER INFO
TransferAmount.belongsTo(Users, {
    foreignKey: "userId",
    as: "userInfo"
})

module.exports = TransferAmount