var Jogador = require('mongoose').model('Jogador');

module.exports.form = function(req, res, next) {
  res.render('jogador/cadastro');
};


module.exports.list = function(req, res, next) {
  Jogador.find({}, function(err, jogadores) {
    if (err) {
      next(err);
    } else {
      res.render('jogador/index',{jogadores:jogadores});
    }
  });
}

module.exports.create = function(req, res, next) {
  var jogador = new Jogador(req.body);
  jogador.save(function(err) {
    if(err) {
      next(err);
    } else {
      res.redirect('/jogador');
    }
  });

};
