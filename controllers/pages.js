const Contact = require('../models/contact');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken }); 
<<<<<<< HEAD
=======
const Cart = require('../models/cart');
const Product = require('../models/product');


>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
// const { cloudinary } = require('../cloudinary');

//contact index
module.exports.contact = async (req, res) => {
    const contacts = await Contact.find({});
<<<<<<< HEAD
    res.render('pages/contact/index', {contacts})
=======

    if(!req.session.cart) {
        return res.render('pages/contact/index', {contacts, Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('pages/contact/index', {contacts, Product: cart.generateArray(),totalPrice: cart.totalPrice})
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

//contact create page
module.exports.renderNewContact = (req, res) => {
<<<<<<< HEAD
    res.render('pages/contact/new');
=======
    if(!req.session.cart) {
        return res.render('pages/contact/new', {Product: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('pages/contact/new', {Product: cart.generateArray(),totalPrice: cart.totalPrice});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}
module.exports.createContact = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.contact.location,
        limit: 1
    }).send()
    const contact = new Contact(req.body.contact);
    contact.geometry = geoData.body.features[0].geometry;
    await contact.save();
    // console.log(contact);
    req.flash('success', 'A Contact Successfully Created');
    res.redirect('/contact');
}

module.exports.contactEdit = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    // console.log(contact)
    if (!contact) {
        req.flash('error', 'Contact not found!!!');
        return res.redirect('/contact');
    }
    res.render('pages/contact/edit', { contact });
}
module.exports.updateContact = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    const contact = await Contact.findByIdAndUpdate(id, {...req.body.contact})
    await contact.save();
    req.flash('success', 'A Contact Successfully Updated..')
    res.redirect('/contact');
}

module.exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    req.flash('success', 'A Contact Successfully Deleted..')
    res.redirect('/contact');
}