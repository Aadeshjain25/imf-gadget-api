const express = require("express");
const setupSwagger = require("./config/swagger"); // Import Swagger setup
const gadgetsRoutes = require("./routes/gadgets"); // ✅ Import gadgets route

const app = express();
app.use(express.json()); // Middleware for JSON parsing

setupSwagger(app); // Set up Swagger UI
app.use("/gadgets", gadgetsRoutes); // ✅ Use the gadgets route

// ✅ Home Route (Check if API is running)
app.get("/", (req, res) => {
    res.send("IMF Gadget API is Live! 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));