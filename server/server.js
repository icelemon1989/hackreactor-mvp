var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes.js');

var app = express();
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/showly')
var port = process.env.port || 8000
router(app);

// start listening to requests on port 4532
app.listen(8000, () => {
    console.log("Server listening on the port 8000");
});

// export our app for testing and flexibility, required by index.js
module.exports = app;