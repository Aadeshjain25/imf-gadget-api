const express = require("express");
const setupSwagger = require("./config/swagger"); // Import Swagger setup

const app = express();
app.use(express.json()); // Middleware for JSON parsing

setupSwagger(app); // Set up Swagger UI

app.listen(3000, () => console.log("Server running on port 3000"));