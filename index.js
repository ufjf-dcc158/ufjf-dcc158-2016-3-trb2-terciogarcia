process.env.NODE_ENV = process.env.NODE_ENV || 'devel';

const mongoose = require('./config/mongoose');
const express = require('./config/express');
var db = mongoose();
var app = express();

if(process.env.NODE_ENV == 'production'){
	app.listen(process.env.PORT);
}
else{
	app.listen(3000);
}

module.exports = app;
