const Sequelize = require('sequelize');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op;

const Usuário = require('../models/usuário');
const config = require('../config/auth');



const LIMIT = 10;

module.exports = {
    async logar (req, res){
        const { email, senha} = req.body;
        
        const usuário = await Usuário.findOne({
            where:{
                email,
            }
        });

        if(!usuário){ return res.status(400).json("Usuário ou email incorretos.") };

        const autenticar = await bcrypt.compareSync(
            senha,
            usuário.senha,
        );

        if(!autenticar){ return res.status(400).json("Usuário ou email incorretos.") };

        const token = await jwt.sign({ id: usuário.id }, config.secret, {
            expiresIn: 86400 // 24 horas
        });

        return res.json(token);
    },

    async index (req, res){
        const { page } = req.params;
        const usuários = await Usuário.findAndCountAll({
            offset: (parseInt(page) - 1) * LIMIT,
            limit: LIMIT,
        });
        const resposta = {
            totalPaginas: Math.ceil(usuários.count / LIMIT),
            paginaAtual: parseInt(page),
            usuários: usuários.rows,
        };
        return res.json(resposta);
    },

    async store(req, res){
        const { nome, email, cpf, cep, numero, complemento } = req.body;


        const compras_feitas = 0;
        const tipo_usuario = 0;
        const senha = await bcrypt.hashSync(req.body.senha, 8);

        const usuario = await Usuário.create({
            nome,
            email,
            senha,
            tipo_usuario,
            cpf,
            cep,
            numero,
            complemento,
            compras_feitas
        });

        return res.json(usuario);
    },

    async update(req, res){
        const { id } = req.params;

        const usuarios = await Usuário.findAll({
            where:{
                id
            }
        });

        if (usuarios == ""){
            return res.status(400).json({ error: 'Usuário não achado'});
        };

        const { nome, email, senha, tipo_usuario, cpf, cep, numero, complemento, compras_feitas } = req.body;

        const usuário = await Usuário.update({
            nome,
            email,
            senha,
            tipo_usuario,
            cpf,
            cep,
            numero,
            complemento,
            compras_feitas
        }, {
            where: { id }
        });

        return res.status(200).json("Atualizado.")
    },

    async delete(req, res){
        const { id } = req.params;

        const usuarios = await Usuário.findAll({
            where:{ id }
        });

        if ( usuarios == ""){ return res.status(400).json({ error: 'Usuário não achado'}) };

        const usuário = await Usuário.destroy({ where: { id } });

        return res.status(200).json("Deletado")
    },
    async filtrar(req, res){
        const { page } = req.params;
        let { id, nome, cpf, email, tipo_usuario} = req.body;
        
        if(!id){ id = 0};
        if(!nome){nome = ""};
        if(!cpf){cpf= ""};
        if(!email){email=""};
        if(!tipo_usuario){tipo_usuario=100};

        const usuários = await Usuário.findAndCountAll({
            offset: (parseInt(page) - 1) * LIMIT,
            limit: LIMIT,
            where:{
                [Op.or]: [
                    { id},
                    { nome },
                    { cpf },
                    { email },
                    { tipo_usuario },
                  ]
            }
        });
        const resposta = {
            totalPaginas: Math.ceil(usuários.count / LIMIT),
            paginaAtual: parseInt(page),
            usuários: usuários.rows,
        };

        return res.json(resposta);
    }
};