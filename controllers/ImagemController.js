const Produto = require('../models/produto');
const Imagem_produto = require('../models/imagem_produto');


module.exports = {
    async index (req, res){
        const { id_produto } = req.params;

        //Procurando produto por chave estrangeira
        const produto = await Produto.findByPk(id_produto, {
            include: { association: 'produto_da_imagem'}
        });

        return res.json(produto);
    },
    async store(req, res) {
        const { id_produto } = req.params;

        const produto = await Produto.findByPk(id_produto);
        if(!produto){
            return res.json(400).json({ error: 'Produto não achado.'});
        } 

        const imagem_produto = await Imagem_produto.create({
            nome_arquivo : req.file.filename
        })

    
        return res.json(imagem_produto);
    },
    async update(req, res){
        const { id } = req.params;

        const imagemProduto = await Imagem_produto.findOne({
            where:{
                id
            }
        });
        if(imagemProduto == ""){
            return res.json(400).json({error: 'Imagem não achada'});
        }

        const { id_produto } = req.params;

        const produto = await Produto.findByPk(id_produto);
        if(produto == ""){
            return res.json(400).json({ error: 'Produto não achado.'});
        } 
        
        const { nome, principal } = req.body;

        const imagem_produto = await Imagem_produto.update({
            principal,
            nome,
            id_produto
        }, {
            where: { id }
        });
     
        //Retornando isso pois a requisição está voltando "{ 1 }" e não sei o por quê. Resolver isso em outra oportunidade
        return res.json("Atualizado.");
    },

    async delete(req, res){
        const { id } = req.params;

        const imagemProduto = await Imagem_produto.findOne({
            where:{
                id
            }
        });
        if(imagemProduto == ""){
            return res.json(400).json({error: 'Imagem não achada'});
        }

        const { id_produto } = req.params;

        const produto = await Produto.findByPk(id_produto);
        if(produto == ""){
            return res.status(400).json({ error: 'Produto não achado.'});
        } 
        
        const imagem_produto = Imagem_produto.destroy({
            where:{
                id
            }
        })

        return res.json("Imagem deletada");
    },
    async selectOne(req, res){
        const { id } = req.params;
        const imagem_produto = await Imagem_produto.findOne({
            where:{
                id
            }
        });
        return res.json(imagem_produto);
    }

};