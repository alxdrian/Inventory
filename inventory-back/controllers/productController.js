const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    let product

    // create a new product
    product = new Product(req.body);

    await product.save();
    res.send(product);

  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
}