const fs = require('fs');
const crypto = require('crypto');
const formidable = require('formidable');
const path = require('path');
const grupoModel = require("../models/grupo");
const usuarioModel = require("../models/usuario");
const mensagemModel = require("../models/mensagem");
const { Op } = require("sequelize");
const { salvarHistorico } = require('../services/historicoService');

function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}
module.exports = {

    list: async function (req, res) {
        const nome = req.query.nome;
        if (!nome) {
            return res.render('comunidade', { Dados: [], nomeArtista: "" });
        }
        let dados = await grupoModel.findAll({
            where: {
                nome: {
                    [Op.like]: nome + "%"
                }
            },
            limit: 10
        });

        dados.forEach(grupo => {
            grupo.slug = slugify(grupo.nome);
        });
        res.send({ Dados: dados, nomeGrupo: nome });
    },

    listarGrupo: async function (req, res) {
        console.log("ENTROU NO CONTROLLER");
        const url = req.params.grupos;

        const partes = url.split("-");
        const id = partes[partes.length - 1];

        await grupoModel.increment('acessos', {
            by: 1,
            where: { id: id }
        });

        let grupo = await grupoModel.findOne({
            where: { id },
            include: [{
                model: mensagemModel,
                as: 'mensagens',
                include: [{
                    model: usuarioModel,
                    as: 'usuario'
                }]
            }]
        });

        res.render('grupo', { grupo, mensagens: grupo.mensagens });
    }
}