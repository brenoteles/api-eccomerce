const express = require('express');

//Importando Middlewares
const upload = require('./middleware/upload');
const autenticar = require('./middleware/autenticar');

//Importando Controllers
const ProdutoController = require('./controllers/ProdutoController');
const ImagemController = require('./controllers/ImagemController');
const UsuarioController = require('./controllers/UsuarioController');
const PedidoController = require('./controllers/PedidoController');
const ItemPedidoController = require('./controllers/ItemPedidoController');
const FiltroGeralController = require('./controllers/FiltroGeralController');

const routes = express.Router();

//Rotas

//Rotas diretas de autenticação
routes.post('/verificartoken', autenticar.verificarTokenERetornar);

//Rotas dos produtos 
routes.get('/produtos/:page', ProdutoController.index);
routes.post('/produtos', [autenticar.isAdm],  ProdutoController.store);
routes.put('/produtos/:id', [autenticar.isAdm],  ProdutoController.update);
routes.delete('/produtos/:id', [autenticar.isAdm],  ProdutoController.delete);
routes.get('/produto/:id', ProdutoController.selectOne);
routes.get('/produtospornome/:page', ProdutoController.procurarPorNome);

//Rotas das imagens dos produtos
routes.get('/produtos/:id_produto/imagens', ImagemController.index);
routes.post('/produtos/:id_produto/imagens', [autenticar.isAdm], upload.single("file"), ImagemController.store);
routes.put('/produtos/:id_produto/imagens/:id', [autenticar.isAdm], ImagemController.update);
routes.delete('/produtos/:id_produto/imagens/:id', [autenticar.isAdm], ImagemController.delete);
routes.get('/produtos/:id_produto/imagens/:id', ImagemController.selectOne);

//Rotas dos usuários
routes.post('/logar', UsuarioController.logar); //Login
routes.post('/usuarios', UsuarioController.store); // Registro

routes.post('/todosusuarios/:page', [autenticar.isAdm], UsuarioController.index);
routes.put('/usuarios/:id', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.delete);
routes.post('/filtrarusuarios/:page', [autenticar.isAdm], UsuarioController.filtrar); // Registro

//Rotas dos pedidos
routes.get('/pedidos/:page', [autenticar.verificarToken], PedidoController.index);
routes.post('/usuarios/:id_cliente/pedidos', [autenticar.verificarToken], PedidoController.store);
routes.put('/usuarios/:id_cliente/pedidos/:id', PedidoController.update);
routes.delete('/usuarios/:id_cliente/pedidos/:id', PedidoController.delete);

//Rotas dos itens dos pedidos
routes.post('/pedidos/:id_pedido/itempedido', [autenticar.verificarToken], ItemPedidoController.index);
routes.post('/pedidos/:id_pedido/itempedido', [autenticar.verificarToken], ItemPedidoController.store);
routes.put('/pedidos/:id_pedido/itempedido/:id', ItemPedidoController.update);
routes.delete('/pedidos/:id_pedido/itempedido/:id', ItemPedidoController.delete);

//Rota do filtro geral
routes.post('/filtrogeral/:id_filtro/:page', [autenticar.isAdm], FiltroGeralController.filtroGeral);

module.exports = routes;