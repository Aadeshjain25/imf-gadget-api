const express = require("express");
const router = express.Router();
const Gadget = require("../models/gadget");

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
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;