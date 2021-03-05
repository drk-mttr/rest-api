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

router.get('/:id', getShoppinglist, (req, res) => {
    res.json(res.shoppinglist);
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

router.patch('/:id', getShoppinglist, checkFields, async (req, res) => {
    try {
        const newList = await res.shoppinglist.save();
        res.json(newList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// deleting one shoppinglist

router.delete('/:id', getShoppinglist, async (req, res) => {
    try {
        await res.shoppinglist.remove();
        res.status(401).json({ message: "removed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  ###### MIDDLEWARE ######

/* attempts to find the shoppinglist in the db by ID. if
    no shoppinglist is found, returns an error and a status.
*/

async function getShoppinglist(req, res, next) {
    let shoppinglist;
    try {
        shoppinglist = await Shoppinglist.findById(req.params.id);
        if (shoppinglist == null) {
            return res.status(400).json({ message: "Cannot find Shoppinglist with that ID." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.shoppinglist = shoppinglist;
    next();
}

/* checks for populated fields in the JSON request. if
    req.body.name (required field in the db schema) is not
    passed in the payload, it returns a 400 error.
*/

function checkFields(req, res, next) {
    if (req.body.name != null) {
        res.shoppinglist.name = req.body.name;
    } else {
        return res.status(400).json({ message: "Shoppinglist name is required." });
    }
    if (req.body.items != null) {
        res.shoppinglist.items = req.body.items;
    }
    next();
}

module.exports = router;