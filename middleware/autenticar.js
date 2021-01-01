const Usuário = require('../models/usuário');
const config = require('../config/auth');
const jwt = require("jsonwebtoken");

let id_usuario;

module.exports = {
    async verificarToken(req, res, next){
        const { token } = req.body;

        if(!token){return res.status(401).send({message: "Não autorizado."})};

        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(401).send({
                    message:"Não autorizado"
                });
            }
            next();
        });
    },
    async verificarTokenERetornar(req, res){
        const { token } = req.body;

        if(!token){return res.status(401).send({message: "Não autorizado."})};

        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(401).send({
                    message:"Não autorizado"
                });
            }
            return res.json("Autenticado.");
        });
    },
    async isAdm(req, res, next){
        const { token } = req.body;

        if(!token){return res.status(401).send({message: "Não autorizado."})};

        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(401).send({
                    message:"Não autorizado"
                });
            }
            id_usuario = decoded.id;
        });

        const usuário = await Usuário.findOne({
            where: {
                id:id_usuario
            }
        });

        if (!usuário){ return res.status(401).send({ message:"Não autorizado"});}

        if (usuário.tipo_usuario !== 1) {
            return res.status(401).send({message: "Não autorizado."})
        } else {
            next();
        }
    }
};