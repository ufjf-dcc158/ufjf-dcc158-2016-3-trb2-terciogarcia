var Partida = require('mongoose').model('Partida');
var Jogador = require('mongoose').model('Jogador');
var Elo = require('arpad');

module.exports.form = function(req, res, next) {
  Jogador.find({}, function(err, jogadores) {
    if (err) {
      next(err);
    } else {
      res.render('partida/cadastro',{jogadores:jogadores});
    }
  });
};

module.exports.formResultado = function(req, res, next) {
  Partida.find({'realizada': false}).populate('jogador_1').populate('jogador_2').exec(function(err, partidas) {
    if (err) {
      next(err);
    } else {
      res.render('partida/resultado',{partidas:partidas});
    }
  });
};

module.exports.createResultado = function(req, res, next) {
  Partida.findByIdAndUpdate(req.body.partida, {$set: {
    'vitoria_jogador_1': (req.body.resultado == 'jogador1' ? true : false),
    'vitoria_jogador_2': (req.body.resultado == 'jogador2' ? true : false),
    'empate': (req.body.resultado == 'empate' ? true : false),
    'realizada': true
    }}
   ).exec( function (err, partida) {
    if (err) {
        next(err);
    }
    else{
       atualizaJogadores(partida._id);
       res.redirect('/partida');
    }
  });
};

var atualizaJogadores = function(id_partida) {
  Partida.findById(id_partida, function(err, partida){
    if (err) {
          next(err);
      }
      else{
         var vitoria_jogador_1 = partida.vitoria_jogador_1;
          var vitoria_jogador_2 = partida.vitoria_jogador_2;
          var elo = new Elo();
          Jogador.findById(partida.jogador_1).exec(function(err, jogador1){
            Jogador.findById(partida.jogador_2).exec(function(err, jogador2){
              if(vitoria_jogador_1){
                jogador1.vitorias++; 
                jogador2.derrotas++;

                jogador1.elo = elo.newRatingIfWon(jogador1.elo, jogador2.elo); 
                jogador2.elo = elo.newRatingIfLost(jogador2.elo, jogador1.elo);  
              }
              else if(vitoria_jogador_2){
                jogador1.derrotas++; 
                jogador2.vitorias++; 

                jogador2.elo = elo.newRatingIfWon(jogador2.elo, jogador1.elo); 
                jogador1.elo = elo.newRatingIfLost(jogador1.elo, jogador2.elo);  
              }
              else{
                jogador1.empates++;
                jogador2.empates++;

                jogador1.elo = elo.newRatingIfTied(jogador1.elo, jogador2.elo); 
                jogador2.elo = elo.newRatingIfTied(jogador2.elo, jogador2.elo);  
              }

              jogador1.save();
              jogador2.save();
            });
          });   
      }
  });
};


module.exports.create = function(req, res, next) {
  var partida = new Partida(req.body);
  partida.save(function(err) {
    if(err) {
      next(err);
    } else {
 		 res.redirect('/partida');
    }
  });
};


module.exports.list = function(req, res, next) {
  Partida.find({}).populate('jogador_1').populate('jogador_2').exec(function(err, partidas) {
    if (err) {
      next(err);
    } else {
      res.render('partida/index',{partidas:partidas});
    }
  });
}