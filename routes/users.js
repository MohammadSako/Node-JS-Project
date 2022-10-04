const express = require('express');
const router = express.Router();
const catchAsync = require('../utility/catchAsync'); 
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login', failureMessage: true, keepSessionInfo: true}), users.login)
router.get('/logout', users.logout); 
module.exports = router;


//--------------------------
// router.get('/register', users.renderRegister);

// router.post('/register', catchAsync(users.register));

// //Login
// router.get('/login', users.renderLogin);

// router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login', failureMessage: true, keepSessionInfo: true}), users.login);

// //Logout
// router.get('/logout', users.logout); 


// module.exports = router;
