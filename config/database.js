const { Sequelize } = require("sequelize");
require("dotenv").config();

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing in environment variables!");
}

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Set to true if you want SQL logs in console
});

// ✅ Test connection
(async() => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database is running and connected!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

module.exports = sequelize;