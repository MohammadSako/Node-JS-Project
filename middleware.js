const { productSchema, reviewsSchema, contactSchema } = require('./schemas.js');
const ExpressError = require('./utility/ExpressError');
const Product = require('./models/product');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You Must Sign in !');
        return res.redirect('/login');
    }
    next();
}

//JOI Validation Middleware: (450)
module.exports.validateProduct = (req, res, next) => {
    const { errer } = productSchema.validate(req.body);
    if (errer) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.validateContact = (req, res, next) => {
    const { errer } = contactSchema.validate(req.body);
    if (errer) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//Authorization Middleware, Permissions
module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You dont have the permission!!');
        return res.redirect(`/products/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You dont have the permission!!');
        return res.redirect(`/products/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { errer } = reviewsSchema.validate(req.body);
    if (errer) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// => isAuthenticated => is Passport.js method => checking if the user logged in or not.
