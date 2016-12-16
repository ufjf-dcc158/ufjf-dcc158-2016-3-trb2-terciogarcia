const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./config');
const ejs = require('ejs');


module.exports = function() {
  var app = express();
  if (process.env.NODE_ENV == 'devel') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV == 'production') {
    app.use(compression());
  }
  app.use(express.static('./assets'));
  app.use(bodyParser.urlencoded({extend:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/routes/jogador.server.routes.js')(app);
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/partida.server.routes.js')(app);
  return app;
}
