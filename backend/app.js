require("dotenv").config();
const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("./db/conn"); // ✅ Ensures MongoDB is connected

// Import Routes
const productDetails = require('./routes/productDetails');

const app = express();

// ✅ Middleware
app.use(cors(
    origin = 'https://product-lis-ui.netlify.app/', // or Netlify URL
));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/product', productDetails);

// ✅ Error Handling (404 Not Found)
app.use((req, res, next) => {
    next(createError(404));
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = app;
