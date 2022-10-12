const Cart = require('../models/cart');
const Product = require('../models/product');
const { cloudinary } = require('../cloudinary');

//contact index
module.exports.index = async (req, res) => {
    res.render('carts/index');
}

module.exports.addToCart = async (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product) {
        if(err) {
            return res.redirect('/products');
        }
        cart.add(product, product.id);
        // console.log(product);
        req.session.cart = cart;
        req.flash('success', 'Successfully Item Added')
        res.redirect('/products');
    });
}

module.exports.reduce = async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/carts/shoppingcart');
}

module.exports.decrease = async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.decreaseByOne(productId);
    req.session.cart = cart;
    res.redirect('/carts/shoppingcart');
}

module.exports.remove = async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/carts/shoppingcart');
}

//remove items from navbar cart
module.exports.removeNav = async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/products');
}

module.exports.shoppingCart = async (req, res) => {
    if(!req.session.cart) {
        return res.render('carts/shoppingcart', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('carts/shoppingcart', {
        Product: cart.generateArray(), 
        totalPrice: cart.totalPrice
    });
}

module.exports.checkoutCart = async (req, res) => {
    if(!req.session.cart) {
        return res.render('carts/checkout', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('carts/checkout', {Product: cart.generateArray(),totalPrice: cart.totalPrice});
}



