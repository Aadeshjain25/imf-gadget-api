const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Gadget = require("../models/gadget");
const auth = require("../middleware/auth");

// Apply authentication middleware to all routes
router.use(auth);

// GET all gadgets with improved success probability
router.get("/", async(req, res) => {
    try {
        const gadgets = await Gadget.findAll();
        const gadgetsWithProbability = gadgets.map(gadget => ({
            ...gadget.toJSON(),
            successProbability: calculateSuccessProbability(gadget)
        }));
        res.json(gadgetsWithProbability);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new gadget with validation
router.post("/", async(req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: "Name and type are required" });
        }

        const gadget = await Gadget.create({
            name,
            type,
            status: "Available"
        });
        res.status(201).json(gadget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Helper function for success probability calculation
function calculateSuccessProbability(gadget) {
    // Example calculation based on gadget properties
    const baseProbability = 50;
    const typeBonus = gadget.type === "Advanced" ? 20 : 0;
    const agePenalty = Math.min(10, Math.floor((Date.now() - gadget.createdAt) / (1000 * 60 * 60 * 24 * 365)));
    return Math.min(100, baseProbability + typeBonus - agePenalty);
}