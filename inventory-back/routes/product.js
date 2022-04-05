const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// api/products
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router