const Cart = require('../models/cart');
// const { cloudinary } = require('../cloudinary');

//contact index
module.exports.index = async (req, res) => {
    const carts = await Cart.find({});
    res.render('carts/cart', {carts})
}