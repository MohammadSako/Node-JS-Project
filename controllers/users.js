const User = require('../models/user')
<<<<<<< HEAD

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
=======
const Cart = require('../models/cart');

module.exports.renderRegister = (req, res) => {
    if(!req.session.cart) {
        return res.render('users/register', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('users/register', {Product: cart.generateArray(),totalPrice: cart.totalPrice});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

module.exports.register = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {//req.login => Passport.js method
            if (err) return next(err);
            req.flash('success', 'Welcome To Shopping Market');
            res.redirect('/products');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
<<<<<<< HEAD
    res.render('users/login');
=======
    if(!req.session.cart) {
        return res.render('users/login', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('users/login', {Product: cart.generateArray(),totalPrice: cart.totalPrice});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome To Shopping Market');
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.flash('success', "You Successfully Logged Out");
        res.redirect('/');
    });
<<<<<<< HEAD
}
=======
}
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
