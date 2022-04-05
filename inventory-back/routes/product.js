const express = require('express');
const router = express.Router();

// api/products
router.post('/', () => {
  console.log('create product');
});

module.exports = router