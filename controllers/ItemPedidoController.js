const Pedido = require('../models/pedido');
const ItemPedido = require('../models/item_pedido');
const Produto = require('../models/produto');

module.exports = {
    async index (req, res){
        const { id_pedido } = req.params;

        const pedido = await Pedido.findAll({
            where: { id: id_pedido }
        });

        if ( pedido == "") { return res.status(400).json({error: 'Pedido não achado.'}) };

        const ped = await Pedido.findByPk(id_pedido, {
            include: { association: 'item-pedido'}
        });

        return res.status(200).json(ped);
    },

    async store (req, res){
        const { id_pedido } = req.params;

        const pedido = await Pedido.findAll({
            where: { id: id_pedido }
        });

        if ( pedido == "") { return res.status(400).json({error: 'Pedido não achado.'}) };

        const { id_produto, quantidade } = req.body;

        const produto = await Produto.findAll({
            where: { id: id_produto}
        });

        if ( produto == ""){ return res.status(400).json({error: 'Produto não achado.'}) };

        const preço_unitário = produto[0].preço_venda;

        const itempedido = await ItemPedido.create({
            id_pedido,
            id_produto,
            preço_unitário,
            quantidade,
        });

        return res.status(200).json(itempedido);

    },

    async update (req, res){
        const { id_pedido, id } = req.params;

        const pedido = await Pedido.findAll({
            where: { id: id_pedido }
        });

        if ( pedido == "") { return res.status(400).json({error: 'Pedido não achado.'}) };

        const itemped = await ItemPedido.findAll({
            where: { id }
        });

        if ( itemped == "") { return res.status(400).json({error: 'Este item do pedido não foi achado.'})};

        const { quantidade } = req.body;

        const itempedido = await ItemPedido.update({
            quantidade
        }, {
            where: { id }
        });

        return res.status(200).json("Atualizado")
    },

    async delete (req, res){
        const { id_pedido, id } = req.params;

        const pedido = await Pedido.findAll({
            where: { id: id_pedido }
        });

        if ( pedido == "") { return res.status(400).json({error: 'Pedido não achado.'}) };

        const itemped = await ItemPedido.findAll({
            where: { id }
        });

        if ( itemped == "") { return res.status(400).json({error: 'Este item do pedido não foi achado.'})}; 

        const itempedido = await ItemPedido.destroy({
            where : {id}
        });

        return res.status(400).json('Deletado')
    }

}