const express = require("express");
const setupSwagger = require("./config/swagger");
const cors = require("cors");


const gadgetsRoutes = require("./routes/gadgets");
const sequelize = require("./config/database");

const app = express();
app.use(cors());

(async() => {
    try {
        await sequelize.authenticate();
        console.log(" Database connection established successfully.");
        await sequelize.sync();
        console.log(" Database synchronized.");
    } catch (error) {
        console.error(" Unable to connect to the database:", error);
        process.exit(1);
    }
})();


app.use(express.json());


app.use("/gadgets", gadgetsRoutes);


setupSwagger(app);


app.get("/", (req, res) => {
    res.send("IMF Gadget API is Live! ");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
    console.error(" API Error:", err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});