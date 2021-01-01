const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const LIMIT = 10;
const Usuário = require('../models/usuário');
const Produto = require('../models/produto');
const Pedido = require('../models/pedido');



module.exports = {
    async filtroGeral(req, res){
        const { page, id_filtro } = req.params;
        
        if(id_filtro === "1"){ // Procurar por usuário
            let { id, nome, cpf, email, tipo_usuario} = req.body;
    
    
            // Pede ao servidor os produtos filtrando de acordo com o objeto passado como parametro
            async function retornarUsuários(objeto){ 
                let usuários = await Usuário.findAndCountAll({
                    offset: (parseInt(page) - 1) * LIMIT,
                    limit: LIMIT,
                    where: {
                        [Op.and]: [
                            objeto
                        ],
                    }
                });
                
                let resposta = {
                    totalPaginas: Math.ceil(usuários.count / LIMIT),
                    paginaAtual: parseInt(page),
                    usuários: usuários.rows,
                };
                return resposta;
            };

            //Iniciando condicionais, através deles se verifica qual filtro é nulo, com base nisso sabemos o que deve ser filtrado
            
            //Procurando por ID
            if(id !== null & nome === null & cpf === null & email === null & tipo_usuario === null){
                return res.json(await retornarUsuários({
                    id
                }))
            };

            //Procurando por NOME e TIPO_USUARIO
            if(id === null & email === null & cpf === null & nome !== null & tipo_usuario !== null){
                return res.json(await retornarUsuários({
                    nome:{[Op.substring]: `${'%'+nome+'%'}`},
                    tipo_usuario
                }))
            };

            //Procurando por NOME
            if(id === null & email === null & cpf === null & tipo_usuario === null & nome !== null){
                return res.json(await retornarUsuários({
                    nome:{[Op.substring]: `${'%'+nome+'%'}`}
                }))
            };

            //Procurando por CPF
            if(id === null & email === null & nome === null & tipo_usuario === null & cpf !== null){
                return res.json(await retornarUsuários({
                    cpf
                }))
            };

            //Procurando por EMAIL
            if(id == null & cpf === null & nome === null & tipo_usuario === null & email !== null){
                return res.json(await retornarUsuários({
                    email
                }))

            //Filtros não batem com os definidos
            } else{
                return res.status(400).json("Os parametros passados não batem, eles estão incorretos/nulos.")
            }

        };

        if(id_filtro === "2"){ //Procurar por produto
            let { id, nome, estoque_min, estoque_max, valor_min, valor_max } = req.body;

            // Pede ao servidor os produtos filtrando de acordo com o objeto passado como parametro
            async function retornarProdutos(objeto){ 
                let produtos = await Produto.findAndCountAll({
                    offset: (parseInt(page) - 1) * LIMIT,
                    limit: LIMIT,
                    include: { association: 'produto_da_imagem'},
                    where: {
                        [Op.and]: [
                            objeto
                        ],
                    }
                });
                
                let resposta = {
                    totalPaginas: Math.ceil(produtos.count / LIMIT),
                    paginaAtual: parseInt(page),
                    produtos: produtos.rows,
                };
                return resposta;
            };

            //Iniciando condicionais, através deles se verifica qual filtro é nulo, com base nisso sabemos o que deve ser filtrado
            if(id === null & nome === null & estoque_min !== null & estoque_max !== null & valor_max === null & valor_min === null){
                return res.json(await retornarProdutos({
                    qtd_estoque: {[Op.between]: [estoque_min, estoque_max]}              
                }))
            }; 
            if(nome === null & id === null & valor_max !== null & valor_min !== null & estoque_max !== null & estoque_min !== null){
                return res.json(await retornarProdutos({
                    qtd_estoque: {[Op.between]: [estoque_min, estoque_max]},
                    preço_venda: {[Op.between]: [valor_min, valor_max]} 
                }))
            };
            if(id === null & nome === null & estoque_max === null & estoque_min === null & valor_min !== null & valor_max !== null){
                return res.json(await retornarProdutos({
                    preço_venda: {[Op.between]: [valor_min, valor_max]} 
                }))
            };
            if(id === null & nome !== null & valor_min !== null & valor_max !== null & estoque_min !== null & estoque_max !== null){
                return res.json(await retornarProdutos({
                    qtd_estoque: {[Op.between]: [estoque_min, estoque_max]},
                    preço_venda: {[Op.between]: [valor_min, valor_max]},
                    nome:{[Op.substring]: `${'%'+nome+'%'}`}
                }))
            };
            if(id === null & valor_min === null & valor_max === null & nome !== null & estoque_min !== null & estoque_max !== null){
                return res.json(await retornarProdutos({
                    qtd_estoque: {[Op.between]: [estoque_min, estoque_max]},
                    nome:{[Op.substring]: `${'%'+nome+'%'}`}
                }))
            };
            if(id === null & estoque_min === null & estoque_max === null & nome !== null & valor_min !== null & valor_max !== null ){
                return res.json(await retornarProdutos({
                    preço_venda: {[Op.between]: [valor_min, valor_max]},
                    nome:{[Op.substring]: `${'%'+nome+'%'}`}
                }))
            };
            if(id === null & valor_min === null & valor_max === null & estoque_min === null & estoque_max === null & nome !== null){
                return res.json(await retornarProdutos({
                    nome:{[Op.substring]: `${'%'+nome+'%'}`}
                }))
            };
            if(valor_min === null & valor_max === null & valor_max === null & valor_min === null & nome === null & id !== null){
                return res.json(await retornarProdutos({
                    id
                }))
            } else {
                return res.status(400).json("Os parametros passados não batem, eles estão incorretos/nulos.")
            };

        };


        if(id_filtro === "3"){
            let { id, id_cliente, valor_min, valor_max, cep, cpf } = req.body;
        }
        return res.status(400).json("Um ou mais parâmetros dos filtros estão errados.")


    }
}

/*
where:{
    [Op.or]: 
    [
        { id },
        { 
            nome:{
                [Op.startsWith]: `${nome}`,
            }
        },
        { 
            nome:{
                [Op.endsWith]: `${nome}`,
            }
        },
        { 
            nome:{
                [Op.substring]: `${'%'+nome+'%'}`,
            }
        },
        { 
            qtd_estoque:{
                [Op.between]: [estoque_min, estoque_max]
            }
        },
        {
            preço_venda:{
                [Op.between]: [valor_min, valor_max]
            }
        }

    ],
}
*/