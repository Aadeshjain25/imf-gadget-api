const express = require("express");
const router = express.Router();
const Gadget = require("../models/gadget");

// ✅ Get all gadgets
router.get("/", async(req, res, next) => {
    try {
        const gadgets = await Gadget.findAll();
        res.json(gadgets);
    } catch (error) {
        next(error); // ✅ Passes error to Express middleware
    }
});

// ✅ Create a new gadget
router.post("/", async(req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) throw new Error("Gadget name is required!");
        const gadget = await Gadget.create({ name });
        res.status(201).json(gadget);
    } catch (error) {
        next(error);
    }
});

module.exports = router;