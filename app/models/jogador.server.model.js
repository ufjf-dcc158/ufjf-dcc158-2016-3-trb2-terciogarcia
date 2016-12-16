const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JogadorSchema = new Schema({
  nome_completo: String,
  data_nascimento: String,
  email: String,
  telefone: String,
  vitorias: {type: Number, default: 0},
  derrotas: {type: Number, default: 0},
  empates: {type: Number, default: 0},
  elo: {type: Number, default: 1500}
});

mongoose.model('Jogador', JogadorSchema);

