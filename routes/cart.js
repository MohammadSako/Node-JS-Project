const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
// const catchAsync = require('../utility/catchAsync');
// const { isLoggedIn, validateContact } = require('../middleware');



router.get('/cart', cart.index);

router.get('/add-to-cart/:id', cart.addToCart);

router.get('/carts/shoppingcart', cart.shoppingCart);

router.get('/decrease/:id', cart.decrease);

router.get('/reduce/:id', cart.reduce);

router.get('/remove/:id', cart.remove);
router.get('/removenav/:id', cart.removeNav);

router.get('/checkout', cart.checkoutCart);

module.exports = router;