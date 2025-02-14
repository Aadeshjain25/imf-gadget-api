const { Sequelize } = require("sequelize");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables!");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Set to true if you want to see SQL queries in logs
});

module.exports = sequelize;