const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: Object, // Or: type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('CartItem', CartItemSchema);
