const express = require('express');
const router = express.Router();

console.log("req came : ")
router.use("/cart", require("./cart"))

module.exports= router;