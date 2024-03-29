const Product = require('../models/product');
<<<<<<< HEAD
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
}

module.exports.renderNewForm = (req, res) => {
    res.render('products/new');
=======
const Cart = require('../models/cart');

module.exports.index = async (req, res) => {
    const products = await Product.find({});

    if(!req.session.cart) {
        return res.render('products/index', { products, Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('products/index', {
        products,
        Product: cart.generateArray(), 
        totalPrice: cart.totalPrice
    });
}

module.exports.renderNewForm = (req, res) => {
    if(!req.session.cart) {
        return res.render('products/new', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('products/new', {Product: cart.generateArray(),totalPrice: cart.totalPrice});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
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
<<<<<<< HEAD
        req.flash('error', 'Product not found!!!');
        return res.redirect('/products');
    }
    res.render('products/show', { product, products });
=======
        req.flash('error', 'Product Not Found!!');
        return res.redirect('/products');
    }
    if(!req.session.cart) {
        return res.render('products/show', {product, products, Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('products/show', { product, products, Product: cart.generateArray(),totalPrice: cart.totalPrice});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
<<<<<<< HEAD
        req.flash('error', 'Product not found!!!');
        return res.redirect('/products');
    }
    res.render('products/edit', { product });
=======
        req.flash('error', 'Product Not Found!!');
        return res.redirect('/products');
    }
    if(!req.session.cart) {
        return res.render('products/edit', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('products/edit', { product, Product: cart.generateArray(),totalPrice: cart.totalPrice });
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
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

<<<<<<< HEAD
=======
//Search
// module.exports.search = async (req, res) => {
//     const data = await Product.find(
//         {
//         $or: [
//             { name: { $regex:req.params.id }}
//         ]
//         }
//     )
//     const datas = data;
//     // console.log(req.params.id);
//     console.log(data);
//     // res.send(`<h1>${data}</h1>`);
//     res.render('products/search', {datas});
// }

>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'A Product Successfully Deleted..')
<<<<<<< HEAD
    res.redirect(`/`)
=======
    res.redirect(`/products`)
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

