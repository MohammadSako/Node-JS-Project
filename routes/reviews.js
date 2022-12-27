// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const Product = require('../models/product');
// const Review = require('../models/review');  
// const { reviewsSchema } = require('../schemas.js');
// const ExpressError = require('../utility/ExpressError');
// const catchAsync = require('../utility/catchAsync');

// const validateReview = (req, res, next) => {
//     const { errer } = reviewsSchema.validate(req.body);
//     if (errer) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// //Creating Reviews
// router.post('/', validateReview, catchAsync(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     const review = new Review(req.body.review);
//     product.reviews.push(review);
//     await review.save();
//     await product.save();
//     res.redirect(`/products/${product._id}`);
// }))

// //Deleting Reviews: (473)
// router.delete('/:reviewId', catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Product.findByIdAndUpdate(id, { $pull: {reviews: reviewId} })
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/products/${id}`);
// }))
// module.exports = router;


const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utility/catchAsync');


//Creating Reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//Deleting Reviews: (473)
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
