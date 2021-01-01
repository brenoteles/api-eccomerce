const Pedido = require('../models/pedido');
const Usuário = require('../models/usuário');

const LIMIT = 10;

module.exports = {
    async index (req, res){
        const { page } = req.params;
        const pedidos = await Pedido.findAndCountAll({
            offset: (parseInt(page) - 1) * LIMIT,
            limit: LIMIT,
        });
        const resposta = {
            totalPaginas: Math.ceil(pedidos.count / LIMIT),
            paginaAtual: parseInt(page),
            pedidos: pedidos.rows,
        }
        return res.json(resposta);
    },

    async store(req, res) {
        const { id_cliente } = req.params;

        const cliente = await Usuário.findAll({
            where: { id: id_cliente }
        });

        if ( cliente == "") { return res.status(400).json({ error: 'Cliente não achado'}) };

        const { cep, numero, complemento } = req.body;

        const total = 0;
        const status = 2;

        const pedidos = await Pedido.create({id_cliente, total, status, cep, numero, complemento });
        
        return res.json(pedidos);
    },
    async update(req, res){
        const { id_cliente, id } = req.params;

        const cliente = await Usuário.findAll({
            where:{id: id_cliente}
        });

        if (cliente == "") { return res.status(400).json({ error: 'Cliente não achado'}) };

        const ped = await Pedido.findAll({
            where: {id}
        });

        if (ped == "") { return res.status(400).json({ error: 'Pedido não achado'}) };

        const {  total, status, cep, numero, complemento } = req.body;

        const pedido = await Pedido.update({
            total, status, cep, numero, complemento
        }, {
            where: { id }
        });

        return res.status(200).json("Atualizado.")
    },
    async delete(req, res){
               const { id_cliente, id } = req.params;

        const cliente = await Usuário.findAll({
            where:{id: id_cliente}
        });

        if (cliente == "") { return res.status(400).json({ error: 'Cliente não achado'}) };

        const ped = await Pedido.findAll({
            where: {id}
        });

        if (ped == "") { return res.status(400).json({ error: 'Pedido não achado'}) };

        const pedido = await Pedido.destroy({
            where:{ id }
        });

        return res.status(200).json("Pedido deletado");
    }
};