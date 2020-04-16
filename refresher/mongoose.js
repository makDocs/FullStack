const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
  'mongodb://localhost:27017/myapp'
,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  
  const result = await createdProduct.save();
  console.log(typeof createdProduct._id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  console.log(products)
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
