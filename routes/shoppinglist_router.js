const express = require('express');
const router = express.Router();
const Shoppinglist = require('../models/shoppinglist.js'); //brings in the shoppinglist model

// get all shoppinglists
router.get('/', async (req, res) => {
    let shoppinglists;
    try {
        shoppinglists = await Shoppinglist.find();
        res.json(shoppinglists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one shoppinglist
router.get('/:id', async (req, res) => {
    let shoppinglist;
    try {
        shoppinglist = await Shoppinglist.findById(req.params.id);
        res.json(shoppinglist);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// creating one shoppinglist
router.post('/', async (req, res) => {
    const shoppinglist = new Shoppinglist({
        name: req.body.name,
        items: req.body.items
    });
    try {
        const newList = await shoppinglist.save();
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update one shoppinglist
router.patch('/:id', async (req, res) => {
    let shoppinglist;
    try {
        shoppinglist = await Shoppinglist.findById(req.params.id);
        if (req.body.name != null) {
            shoppinglist.name = req.body.name;
        }
        if (req.body.items != null) {
            shoppinglist.items = req.body.items;
        }
        const newList = await shoppinglist.save();
        res.json(shoppinglist);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// deleting one shoppinglist
router.delete('/:id', async (req, res) => {
    let shoppinglist;
    try {
        shopplinglist = await Shoppinglist.findById(req.params.id);
        if (shopplinglist == null) {
            return res.status(404).json({ message: "Cannot find shopping list with that ID"});
        } else {
            shoppinglist = await Shoppinglist.findById(req.params.id);
            await shoppinglist.remove();
            return res.status(401).json({ message: "removed successfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;