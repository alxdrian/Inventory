const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    let product = new Product(req.body);

    await product.save();
    res.send(product);

  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      location,
      price,
      quantity,
      description
    } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        msg: 'Product not found'
      });
    }

    product.name = name;
    product.category = category;
    product.location = location;
    product.price = price;
    product.quantity = quantity;
    product.description = description;

    product = await Product.findOneAndUpdate(
      {_id: req.params.id},
      product,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        msg: 'Product not found'
      });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        msg: 'Product not found'
      });
    }

    await Product.findOneAndRemove({_id: req.params.id});
    res.json({msg: 'Product deleted'});
  } catch (err) {
    console.log(err);
    res.status(500).json.send('Server Error');
  }
}