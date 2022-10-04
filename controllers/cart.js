const Cart = require('../models/cart');
const Product = require('../models/product');

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
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/products');
    });
}


module.exports.shoppingCart = async (req, res, next) => {
   
    if(!req.session.cart) {
        return res.render('carts/shoppingcart', {Product: null});
    }

    const cart = new Cart(req.session.cart);

    res.render('carts/shoppingcart', {
        Product: cart.generateArray(), 
        totalPrice: cart.totalPrice
    });

}