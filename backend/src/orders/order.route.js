const express = require('express');
const { route } = require('../books/book.route');
const { createOrder, getOrderByEmail } = require('./order.controller');

const router = express.Router();

// create order endpoint

router.post("/", createOrder)

// get orders by user email
router.get("/email/:email", getOrderByEmail)


module.exports = router;