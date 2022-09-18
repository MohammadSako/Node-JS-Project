const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
const morgan = require('morgan');
const catchAsync = require('./utility/catchAsync');
const ExpressError = require('./utility/ExpressError');
const { productSchema, reviewsSchema } = require('./schemas.js');
const Review = require('./models/review');  

app.use(morgan('tiny'))//It helps us log HTTP request information to our terminal

mongoose.connect('mongodb://localhost:27017/shoppingMarket', {
    useNewUrlParser: true,
    // useCreateIndex: true,// maybe not supported..
    useUnifiedTopology: true
});
const db = mongoose.connection;
//mongoose.connection.on() to shortcut this
//mongoose.connection.once() to shortcut this
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database is connected..");
});

app.engine('ejs', ejsMate); // for SPA => (body) boilerpalte
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));//To let run the server from Any directory

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))//serving things like CSS, JS, and Bootstrap

const validateProduct = (req, res, next) => {
    const { errer } = productSchema.validate(req.body);
    if (errer) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
const validateReview = (req, res, next) => {
    const { errer } = reviewsSchema.validate(req.body);
    if (errer) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//The Home Page
app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

//To Add a new products
app.get('/products/new', (req, res) => {
    // console.log(req.params.body);
    res.render('products/new');
})
app.post('/products', validateProduct, catchAsync(async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`products/${ product._id }`);
}))

// When click on a product to show it in a its page 
app.get('/products/:id', catchAsync(async (req, res) => {
    const products = await Product.find({});
    const product = await Product.findById(req.params.id).populate('reviews');
    console.log(product);
    res.render('products/show', { product, products });
}));

//To edit the product
app.get('/products/:id/edit', catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/edit', { product });
}))
app.put('/products/:id', validateProduct, async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product})
    res.redirect(`/products/${product._id}`)
})

//To delete the product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/')
})

// Product Delete
app.delete('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect(`/products`)
}));


//Creating Reviews
app.post('/products/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${product._id}`);
}))

//Deleting Reviews: (473)
app.delete('/products/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: {reviews: reviewId} })
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/products/${id}`);
}))


//Defining ExpressError Class
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found!!!', 404))
})

//Page not found!!!
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'There is something wrong!!'
    res.status(statusCode).render('error', { err })
})


app.listen(8080, () => {
    console.log("Waiting on Port 8080")
})
