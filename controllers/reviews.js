const Review = require('../models/review');
const Product = require('../models/product');

module.exports.createReview = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'A Review Successfully Created..')
    res.redirect(`/products/${product._id}`);
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: {reviews: reviewId} })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'A Review Successfully Deleted..')
    res.redirect(`/products/${id}`);
}
