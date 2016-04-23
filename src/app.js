'use strict';
var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    nodemailer = require('nodemailer'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    blog = require('./routes/blog'),
    admin = require('./routes/admin');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
//routes
app.use("/blog", blog);
app.use("/admin", admin);

app.listen("3000", function() {
	console.log('server is running on port 3000');
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Page Not Found');
  err.status = 404;
  next(err);
});

//error handdler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});