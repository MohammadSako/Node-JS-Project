if (process.env.NODE_ENV !== 'production') {
<<<<<<< HEAD
    require('dotenv').config();
=======
  require('dotenv').config();
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utility/ExpressError');
const methodOverride = require('method-override');
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const pageRoutes = require('./routes/pages');
const cartRoutes = require('./routes/cart');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
<<<<<<< HEAD



mongoose.connect('mongodb://localhost:27017/shoppingMarket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
=======
const MongoStore = require('connect-mongo');//new

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/shoppingMarket';//new
mongoose.connect(dbUrl, {//new
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// mongoose.connect('mongodb://localhost:27017/shoppingMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
const db = mongoose.connection;
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
app.use(mongoSanitize({replaceWith: '_',}),);

<<<<<<< HEAD
app.use(mongoSanitize());

// Configuring Express-Session
const sessionConfig = {
    secret: 'session',
    resave: false,
    saveUninitialized: true,
    // store: new connectMongo({ mongooseConnection: mongoose.connection }),//cart
    cookie: {
        httpOnly: true,
        // secure: true, //only when deploying 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
=======
const secret = process.env.SECRET || 'mysecretcode';//new
const store = MongoStore.create({//new
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
})
store.on("error", function(e) {//new
  console.log('Session Store has an Error!!!', e)
})

// Configuring Express-Session
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      // secure: true, //only when deploying 
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
}
app.use(session(sessionConfig))
app.use(flash())

// Configuring Passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
<<<<<<< HEAD
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // res.locals.session = req.session;//cart
    next();
=======
  console.log(req.query);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.session = req.session;//cart
  next();
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
})



<<<<<<< HEAD

app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', pageRoutes); //(footer Links) => contact US, FAQs, About US..
app.use('/products/:id/reviews', reviewRoutes);
app.use('/', cartRoutes);
=======
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', pageRoutes); //(footer Links) => contact US, FAQs, About US..
app.use('/products/:id/reviews', reviewRoutes);
app.use('/', cartRoutes);

>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945

app.get('/', (req, res) => {
  res.render('home')
});

app.get('/', (req, res) => {
    res.render('home')
});

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

<<<<<<< HEAD
app.listen(8080, () => {
    console.log("Waiting on Port 8080")
})
=======
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server Ready on ${port}..`)
});
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
