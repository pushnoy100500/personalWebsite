'use strict';
var express = require('express');

var app = express();

app.use(express.static('public'));


app.get('/', function(req, res) {
	res.send('WOHOO!');
})
app.get('/api/todos', function(req, res) {
	res.send('todos');
})

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