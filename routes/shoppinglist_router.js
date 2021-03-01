const express = require('express');
const router = express.Router();
const ShoppingList = require('../models/shoppinglist.js');

// get all shoppinglists
router.get('/', async (req, res) => {
    try {
        const shoppinglists = await ShoppingList.find();
        res.json(shoppinglists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one shoppinglist
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

// creating one shoppinglist
router.post('/', (req, res) => {
    
});

// update one shoppinglist
router.patch('/:id', (req, res) => {
    
});

// deleting one shoppinglist
router.delete('/:id', (req, res) => {
    
});

module.exports = router;