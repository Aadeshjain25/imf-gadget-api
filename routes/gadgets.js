const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Gadget = require("../models/gadget"); // Assuming Sequelize ORM is used

// GET all gadgets with random success probability
router.get("/", async(req, res) => {
    try {
        const gadgets = await Gadget.findAll();
        const gadgetsWithProbability = gadgets.map(gadget => ({
            ...gadget.toJSON(),
            successProbability: `${Math.floor(Math.random() * 100)}%`
        }));
        res.json(gadgetsWithProbability);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new gadget with a unique codename
router.post("/", async(req, res) => {
    try {
        const gadget = await Gadget.create({ name: `The ${uuidv4().split('-')[0]}` });
        res.status(201).json(gadget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PATCH update a gadget's status
router.patch("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const gadget = await Gadget.findByPk(id);
        if (!gadget) return res.status(404).json({ error: "Gadget not found" });

        await gadget.update({ status });
        res.json(gadget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE (mark gadget as decommissioned)
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const gadget = await Gadget.findByPk(id);
        if (!gadget) return res.status(404).json({ error: "Gadget not found" });

        await gadget.update({ status: "Decommissioned", decommissionedAt: new Date() });
        res.json({ message: "Gadget decommissioned", gadget });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Self-Destruct Sequence (POST /gadgets/:id/self-destruct)
router.post("/:id/self-destruct", async(req, res) => {
    try {
        const { id } = req.params;
        const gadget = await Gadget.findByPk(id);
        if (!gadget) return res.status(404).json({ error: "Gadget not found" });

        // Generate a random 4-digit confirmation code
        const confirmationCode = Math.floor(1000 + Math.random() * 9000);

        // Mark gadget as "Destroyed"
        await gadget.update({ status: "Destroyed" });

        res.json({
            message: "Self-destruct sequence initiated!",
            confirmationCode
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;