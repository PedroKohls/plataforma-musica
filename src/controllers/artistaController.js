const fs = require('fs');
const crypto = require('crypto');
const formidable = require('formidable');
const path = require('path');
const artistaModel = require("../models/artista");
const musicaController = require("./musicaController.js");
const { Op } = require("sequelize");
const { salvarHistorico } = require('../services/historicoService');
const { artistaBreadcrumb } = require('../utils/breadcrumb');

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
            return res.render('formArtista', { Dados: [], nomeArtista: "" });
        }
        let dados = await artistaModel.findAll({
            where: {
                nome: {
                    [Op.like]: nome + "%"
                }
            },
            limit: 10
        });

        dados.forEach(artista => {
            artista.slug = slugify(artista.nome);
        });
        res.send({ Dados: dados, nomeArtista: nome });
    },

    listarArtista: async function (req, res) {
        const { artista } = req.params;

        const partes = artista.split("-");
        const id = partes[partes.length - 1];

        await artistaModel.increment('acessos', {
            by: 1,
            where: { id: id }
        });

        let artistaData = await artistaModel.findOne({
            where: { id: id }
        });

        if (!artistaData) {
            return res.send("Artista não encontrado");
        }

        const musicas = await musicaController.buscarMusicas({ artistaId: id });

        artistaData.slug = slugify(artistaData.nome);

        if (musicas && musicas.length > 0) {
            for (let musica of musicas) {
                musica.slug = slugify(musica.nome);
            }
        }

        if (req.session.usuario) {
            await salvarHistorico(
                req.session.usuario.id,
                "artista",
                id
            );
        }

        const breadcrumb = artistaBreadcrumb(artistaData);
        return res.render('artista', { artista: artistaData, musicas, breadcrumb });
    },

    store: async function (req, res) {
        const nome = req.body.nome || req.query.nome;
        const artista = await artistaModel.create({
            nome: nome,
            verificado: false,
            imagem: null
        });

        res.render('formMusica', { idArtista: artista.id });
    },

    valida: async function (req, res) {
        const valor = req.body.artistaId;

        if (valor.includes("novo|")) {
            const nome = valor.split("novo|")[1];
            req.body.nome = nome;
            return module.exports.store(req, res);
        }
        return res.render('formArtista', { idArtista: valor });
    }
}

/*edit: async function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        var oldpath = files.imagem[0].filepath;
        var hash = crypto.createHash('md5')
            .update(Date.now().toString())
            .digest('hex');

        var ext = path.extname(files.imagem[0].originalFilename);
        var nomeimg = hash + ext;

        var newpath = path.join(__dirname, '../public/imagens/artistas', nomeimg);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });

        artistaModel.create({
            nome: fields['nome'][0],
            verificado: false,
            imagem: nomeimg
        });

        res.redirect('/enviarMusica');
    });
},*/

