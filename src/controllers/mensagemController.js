const fs = require('fs');
const crypto = require('crypto');
const formidable = require('formidable');
const path = require('path');
const grupoModel = require("../models/grupo");
const usuarioModel = require("../models/usuario");
const mensagemModel = require("../models/mensagem");
const { Op } = require("sequelize");

module.exports = {
    store: async function (req, res) {
        const { conteudo, grupoId } = req.body;

        const novaMensagem = await mensagemModel.create({
            conteudo,
            grupoId,
            usuarioId: req.session.usuario.id
        });

        const mensagemCompleta = await mensagemModel.findByPk(novaMensagem.id, {
            include: ["usuario"]
        });

        res.json({
            sucesso: true,
            mensagem: mensagemCompleta
        });
    }
}
