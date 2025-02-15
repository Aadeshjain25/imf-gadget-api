const express = require("express");
const router = express.Router();
const Gadget = require("../models/gadget");


router.get("/", async(req, res) => {
    try {
        const gadgets = await Gadget.findAll();
        res.json(gadgets);
    } catch (error) {
        console.error(" Error in GET /gadgets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found!" });
        }
        res.json(gadget);
    } catch (error) {
        console.error(" Error in GET /gadgets/:id:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async(req, res) => {
    try {
        const { name, status } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Gadget name is required!" });
        }

        const gadget = await Gadget.create({
            name,
            status: status || "Available",
        });

        res.status(201).json(gadget);
    } catch (error) {
        console.error(" Error in POST /gadgets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found!" });
        }

        gadget.status = status;
        await gadget.save();

        res.json(gadget);
    } catch (error) {
        console.error("❌ Error in PATCH /gadgets/:id:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found!" });
        }

        await gadget.destroy();
        res.json({ message: "Gadget deleted successfully." });
    } catch (error) {
        console.error(" Error in DELETE /gadgets/:id:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/self-destruct", async(req, res) => {
    try {
        await Gadget.destroy({ where: {} });
        res.json({ message: " All gadgets have been self-destructed!" });
    } catch (error) {
        console.error(" Self-Destruct Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;