const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const catchAsync = require('../utility/catchAsync');



router.get('/cart', catchAsync(cart.index));

router.get('/add-to-cart/:id', catchAsync(cart.addToCart));

router.get('/carts/shoppingcart', catchAsync(cart.shoppingCart));

router.get('/decrease/:id', catchAsync(cart.decrease));

router.get('/reduce/:id', catchAsync(cart.reduce));

router.get('/remove/:id', catchAsync(cart.remove));
router.get('/removenav/:id', catchAsync(cart.removeNav));//remove items from navbar cart

router.get('/checkout', catchAsync(cart.checkoutCart));

module.exports = router;