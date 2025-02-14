const express = require("express");
const setupSwagger = require("./config/swagger");
const gadgetsRoutes = require("./routes/gadgets");
const sequelize = require("./config/database");

const app = express();

// Initialize database connection
(async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await sequelize.sync();
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Setup Swagger documentation
setupSwagger(app);

// Routes
app.use("/gadgets", gadgetsRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.send("IMF Gadget API is Live! 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));