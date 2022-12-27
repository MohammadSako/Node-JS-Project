const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
<<<<<<< HEAD
// const catchAsync = require('../utility/catchAsync');
// const { isLoggedIn, validateContact } = require('../middleware');



router.get('/cart', cart.index);

router.post('/cart', async (req, res) => {
    // const owner = req.user._id;
    // const { itemId, quantity } = req.body;
})
// //To Add a NEW contact
// router.get('/contact/new',isLoggedIn, validateContact, catchAsync(pages.renderNewContact));
// //To Add a CREATE contact
// router.post('/contact', isLoggedIn, validateContact, catchAsync(pages.createContact));

// //To Add a EDIT contact
// router.get('/contact/:id/edit', isLoggedIn, catchAsync(pages.contactEdit));

// //To Add a UPDATE contact
// router.put('/contact/:id', isLoggedIn, validateContact, catchAsync(pages.updateContact))

// //To Add a DELETE contact
// router.delete('/contact/:id', isLoggedIn, catchAsync(pages.deleteContact));
=======
const catchAsync = require('../utility/catchAsync');



router.get('/cart', catchAsync(cart.index));

router.get('/add-to-cart/:id', catchAsync(cart.addToCart));

router.get('/carts/shoppingcart', catchAsync(cart.shoppingCart));

router.get('/decrease/:id', catchAsync(cart.decrease));

router.get('/reduce/:id', catchAsync(cart.reduce));

router.get('/remove/:id', catchAsync(cart.remove));
router.get('/removenav/:id', catchAsync(cart.removeNav));//remove items from navbar cart

router.get('/checkout', catchAsync(cart.checkoutCart));
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945

module.exports = router;