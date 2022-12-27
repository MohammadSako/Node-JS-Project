const Product = require('../models/product');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
}

module.exports.renderNewForm = (req, res) => {
    res.render('products/new');
}

module.exports.createProduct = async (req, res) => {
    const product = new Product(req.body.product);
    product.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    product.author = req.user._id;
    await product.save();
    req.flash('success', 'A Product Successfully Created..')
    res.redirect(`/products/${ product._id }`);
}

// When click on a product to show it in a its page 
module.exports.showProduct = async (req, res) => {
    const products = await Product.find({});
    const product = await Product.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path: 'author'
        } 
    }).populate('author');
    // console.log(product);
    if (!product) {
        req.flash('error', 'Product not found!!!');
        return res.redirect('/products');
    }
    res.render('products/show', { product, products });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        req.flash('error', 'Product not found!!!');
        return res.redirect('/products');
    }
    res.render('products/edit', { product });
}
module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product})
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    product.images.push(...imgs);
    await product.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) { //this will delete from Cloudinary
            await cloudinary.uploader.destroy(filename);
        } 
        await product.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}}) //this will delete from Mongo
    }
    req.flash('success', 'A Product Successfully Updated..')
    res.redirect(`/products/${product._id}`)
}

//Cart
module.exports.cart = async (req, res) => {
    res.render('products/cart');
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'A Product Successfully Deleted..')
    res.redirect(`/`)
}
