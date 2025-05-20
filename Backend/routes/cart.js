const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// GET all items in cart
router.get('/', async (req, res) => {
  try {
    const cart = await CartItem.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD to cart
router.post('/add', async (req, res) => {
  const { product } = req.body;

  try {
    let existing = await CartItem.findOne({ 'product.id': product.id });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
    } else {
      await CartItem.create({ product, quantity: 1 });
    }

    const updatedCart = await CartItem.find();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE quantity
router.put('/:id', async (req, res) => {
  try {
    const item = await CartItem.findOne({ 'product.id': parseInt(req.params.id) });
    if (item) {
      item.quantity = req.body.quantity;
      await item.save();
    }
    const cart = await CartItem.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.deleteOne({ 'product.id': parseInt(req.params.id) });
    const cart = await CartItem.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
