const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const catchAsync = require('../utility/catchAsync');
const { isLoggedIn, isAuthor, validateProduct} = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// router.get('', catchAsync(products.home));
router.get('/products', catchAsync(products.index));
router.post('/products', isLoggedIn, upload.array('image'), validateProduct, catchAsync(products.createProduct))
router.get('/products/new', isLoggedIn, products.renderNewForm);
router.route('/products/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateProduct, catchAsync(products.updateProduct))
    .delete(isLoggedIn, catchAsync(products.deleteProduct))
router.get('/products/:id/edit', isLoggedIn, isAuthor, catchAsync(products.renderEditForm));

// router.get('/search/:id', catchAsync(products.search));

module.exports = router;

//---------------------------
// // //The Home Page
// router.get('/', catchAsync(products.index));

// //To Add a new products
// router.get('/products/new', isLoggedIn, products.renderNewForm);

// router.post('/products', isLoggedIn, validateProduct, catchAsync(products.createProduct))

// // When click on a product to show it in a its page 
// router.get('/products/:id', catchAsync(products.showProduct));

// //To edit the product (note: ex: isLoggedIn => in the middleware.js)
// router.get('/products/:id/edit', isLoggedIn, isAuthor, catchAsync(products.renderEditForm));

// router.put('/products/:id', isLoggedIn, isAuthor, validateProduct, catchAsync(products.updateProduct))

// //To delete the product
// router.delete('/products/:id', isLoggedIn, catchAsync(products.deleteProduct));
// module.exports = router;


