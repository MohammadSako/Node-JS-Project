const express = require('express');
const router = express.Router();
const pages = require('../controllers/pages');
const catchAsync = require('../utility/catchAsync');
const { isLoggedIn, validateContact } = require('../middleware');



router.get('/contact', catchAsync(pages.contact));

//To Add a NEW contact
router.get('/contact/new',isLoggedIn, validateContact, catchAsync(pages.renderNewContact));
//To Add a CREATE contact
router.post('/contact', isLoggedIn, validateContact, catchAsync(pages.createContact));

//To Add a EDIT contact
router.get('/contact/:id/edit', isLoggedIn, catchAsync(pages.contactEdit));

//To Add a UPDATE contact
router.put('/contact/:id', isLoggedIn, validateContact, catchAsync(pages.updateContact))

//To Add a DELETE contact
router.delete('/contact/:id', isLoggedIn, catchAsync(pages.deleteContact));

module.exports = router;