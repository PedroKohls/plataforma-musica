const fs = require('fs');
const crypto = require('crypto');
const formidable = require('formidable');
const path = require('path');
const artistaModel = require("../models/artista");
const musicaModel = require("../models/musica");
const cifraModel = require("../models/cifra");
const { Op } = require("sequelize");

const buscarMusicas = async function ({ artistaId, nome, limit = 10 }) {
    let busca = {};

    if (artistaId) {
        busca.artistaId = artistaId;
    }
    if (nome) {
        busca.nome = { [Op.like]: nome + "%" };
    }

    return await musicaModel.findAll({
        where: busca,
        limit: limit
    })
};

module.exports = {

    buscarMusicas: buscarMusicas,

    list: async function (req, res) {
        const { nome, artistaId } = req.query;

        const dados = await buscarMusicas({ artistaId, nome });

        return res.send({ Dados: dados, nomeMusica: nome });
    },

    listarMusica: async function (req, res) {
        const { musica } = req.params;

        const partes = musica.split("-");
        const id = partes[partes.length - 1];

        let cifras = await cifraModel.findAll({
            where: {
                musicaId: id
            }
        });

        if (cifras.length > 0) {
            return res.redirect(`/cifras/${cifras[0].id}`);
        }

        return res.render('visualizarMusica', { cifras, musica });
    },

    store: async function (req, res) {
        const nome = req.body.nome || req.query.nome;
        const artistaId = req.body.artistaId || req.query.artistaId;

        const musica = await musicaModel.create({
            nome: nome,
            artistaId: parseInt(artistaId),
        });

        res.render('formCifra', { idArtista: artistaId, musicaId: musica.id });
    },

    valida: async function (req, res) {
        const valor = req.body.musicaId;
        const artistaId = req.body.artistaId || req.query.artistaId;

        if (valor && valor.includes("novo|")) {
            const nome = valor.split("novo|")[1];
            req.body.nome = nome;

            return module.exports.store(req, res);
        }
        return res.render('formCifra', { idArtista: artistaId, musicaId: valor });
    }

}

/*edit: async function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        musicaModel.create({
            nome: fields['nome'][0],
            artistaId: parseInt(fields['artistaId'][0]),
        });

        res.redirect('/');
    });
},

create: async function (req, res) {
    const nome = req.body.nome || req.query.nome;
    const artistaId = req.body.artistaId || req.query.artistaId;
    
    if (!nome || !artistaId) {
        return res.status(400).send({ erro: "Nome da música e artistaId são obrigatórios" });
    }

    try {
        const musica = await musicaModel.create({
            nome: nome,
            artistaId: parseInt(artistaId),
            verificado: false,
            imagem: null
        });

        res.send({ sucesso: true, musicaId: musica.id, nome: musica.nome });
    } catch (error) {
        res.status(500).send({ erro: error.message });
    }
}*/

