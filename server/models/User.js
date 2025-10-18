const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");

const userRoles = process.env.USER_ROLES

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "https://api.dicebear.com/7.x/adventurer-neutral/svg"
    },

    role: {
        type: DataTypes.ENUM(["ADMIN","STAFF"]),
        defaultValue: "STAFF"
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

})

module.exports = Users