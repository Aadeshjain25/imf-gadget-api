const { Sequelize } = require("sequelize");
require("dotenv").config();


if (!process.env.DATABASE_URL) {
    throw new Error(" DATABASE_URL is missing! Set it in Render's Environment Variables.");
}


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

(async() => {
    try {
        await sequelize.authenticate();
        console.log(" Database connected successfully!");
    } catch (error) {
        console.error(" Database connection failed! Please check Render logs.");
        console.error(error);
        process.exit(1);
    }
})();

module.exports = sequelize;