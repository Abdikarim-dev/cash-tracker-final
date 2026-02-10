const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");

const Counter = sequelize.define("counters", {
    prefix: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    lastNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "id_counters",
    timestamps: false,
});

module.exports = Counter;
