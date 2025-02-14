const { Sequelize } = require("sequelize");
require("dotenv").config();

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is missing! Set it in Render's Environment Variables.");
}

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // ✅ Ensure SSL is required for Render DB
            rejectUnauthorized: false // ✅ Fix Render SSL issues
        }
    },
    logging: false // Set to true if you want SQL logs
});

// ✅ Retry Connection on Failure
const connectWithRetry = async() => {
    let attempts = 5;
    while (attempts > 0) {
        try {
            await sequelize.authenticate();
            console.log("✅ Database connected successfully!");
            return;
        } catch (error) {
            console.error(`❌ Database connection failed! Retrying... (${attempts} attempts left)`);
            attempts--;
            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
        }
    }
    console.error("❌ Database connection failed after multiple attempts.");
    process.exit(1);
};

connectWithRetry();

module.exports = sequelize;