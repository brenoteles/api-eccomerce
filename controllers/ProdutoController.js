const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const LIMIT = 10;
const Produto = require('../models/produto');

module.exports = {
    async teste (req, res){
        const { nome } = req.body;
        return res.json(nome);
    },  
    async index (req, res){
        const { page } = req.params
        const produtos = await Produto.findAndCountAll({
            offset: (parseInt(page) - 1) * LIMIT,
            limit: LIMIT,
            include: { association: 'produto_da_imagem'}
        });
        const resposta = {
            totalPaginas: Math.ceil(produtos.count / LIMIT),
            paginaAtual: parseInt(page),
            produtos: produtos.rows,
        }
        return res.json(resposta);
    },

    async store(req, res) {
        const { nome, preço_venda, descrição } = req.body;

        const qtd_estoque = 1;
        const preço_custo = 50.40;

        const produtos = await Produto.create({nome, qtd_estoque, preço_custo, preço_venda, descrição });
        
        return res.json(produtos);
    },
    async update(req, res){
        const { id } = req.params;

        const prod = await Produto.findAll({
            where:{
                id
            }
        })

        if(prod == ""){
            return res.status(400).json({ error: 'Produto não achado'});
        };


        const { nome, qtd_estoque, preço_custo, preço_venda, descrição } = req.body;

        const produto = await Produto.update({
            nome,
            qtd_estoque,
            preço_venda,
            preço_custo,
            descrição,
        }, {
            where: { id }
        });

        return res.json("Atualizado.")
    },
    async delete(req, res){
        const { id } = req.params;

        const prod = await Produto.findAll({
            where:{
                id
            }
        });

        if(prod == ""){
            return res.status(400).json({ erro: 'Produto não achado.'});
        } 

        const produto = await Produto.destroy({
            where:{
                id
            }
        });

        return res.json("Produto deletado");
    },
    async selectOne(req, res){
        const { id } = req.params;

        const produto = await Produto.findOne({
            where:{ id },
            include: { association: 'produto_da_imagem'}
        });

        return res.json(produto);
    },
    async procurarPorNome(req, res){
        const { page } = req.params;
        const { nome } = req.body;

        if(nome.length < 5 ){
            return res.status(400).json('O termo de nome deve ter no mínimo 5 caracteres.')
        }
        
        const produtos = await Produto.findAndCountAll({
            offset: (parseInt(page) - 1) * LIMIT,
            limit: LIMIT,
            include: { association: 'produto_da_imagem'},
            where:{
                [Op.or]: 
                [
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
                ],
            }
        });
        const resposta = {
            totalPaginas: Math.ceil(produtos.count / LIMIT),
            paginaAtual: parseInt(page),
            produtos: produtos.rows,
        }
        return res.json(resposta);
    }
};