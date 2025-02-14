const express = require("express");
const setupSwagger = require("./config/swagger");
const gadgetsRoutes = require("./routes/gadgets");

const app = express();
app.use(express.json());

setupSwagger(app);
app.use("/gadgets", gadgetsRoutes);

app.get("/", (req, res) => {
    res.send("IMF Gadget API is Live! 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));