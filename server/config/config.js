const chalk = require("chalk");
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('cash_tracker', 'root', '', {
    host: 'localhost',
    dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

function connectDB() {
    require("../models/User")
    sequelize.authenticate()
        .then(() => console.log(chalk.bold.green("Database Connected")))
        .then(() => sequelize.sync())
        .then(() => console.log(chalk.bold.green("Tables Synced")))
        .catch((error) => console.log(chalk.bold.red("Database Error:"), chalk.red(error)))
}

module.exports = { connectDB, sequelize }