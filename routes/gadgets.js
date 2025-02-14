const express = require("express");
const router = express.Router();
const Gadget = require("../models/gadget");

// ✅ Get all gadgets
router.get("/", async(req, res) => {
    try {
        const gadgets = await Gadget.findAll();
        res.json(gadgets);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Create a new gadget
router.post("/", async(req, res) => {
    try {
        const gadget = await Gadget.create({ name: "The Falcon" });
        res.status(201).json(gadget);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;