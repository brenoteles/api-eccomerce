const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//Importando models
const usuário = require('../models/usuário');
const produto = require('../models/produto');
const pedido = require('../models/pedido');
const item_pedido = require('../models/item_pedido');
const imagem_pedido = require('../models/imagem_produto');

//Iniciando connection
const connection = new Sequelize(dbConfig);

//Iniciando model
usuário.init(connection);
produto.init(connection);
pedido.init(connection);
item_pedido.init(connection);
imagem_pedido.init(connection);

//Fazendo associações
usuário.associate(connection.models);
produto.associate(connection.models);
pedido.associate(connection.models);
item_pedido.associate(connection.models);
imagem_pedido.associate(connection.models);


module.exports = connection;