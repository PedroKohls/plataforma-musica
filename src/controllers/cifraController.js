const cifraModel = require("../models/cifra");
const artistaModel = require("../models/artista");
const musicaModel = require("../models/musica");
const GeneroUsuario = require('../models/genero_usuario');
const { cifraBreadcrumb } = require('../utils/breadcrumb');
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const formidable = require("formidable");

const { salvarHistorico } = require('../services/historicoService');
const { registrarGenero } = require('../services/recomendacaoService');

module.exports = {

    listarCifra: async function (req, res) {
        const id = req.params.cifra;
        let tons = {};

        let cifra = await cifraModel.findOne({
            where: { id: id },
            include: [{ model: musicaModel, as: 'Musica', include: [{ model: artistaModel, as: 'Artista' }] }]
        });

        let artista = cifra.Musica.Artista;

        await Promise.all([
            cifra.increment('acessos'),
            artista.increment('acessos')
        ]);

        const cifras = await cifraModel.findAll({
            where: {
                musicaId: cifra.musicaId,
            }
        });

        if (cifra.tonalidade === "maior") {

            tons = [
                "A", "A#", "B", "C", "C#",
                "D", "D#", "E", "F", "F#",
                "G", "G#"
            ].map(nome => ({ nome }));

        } else {

            tons = [
                "Am", "A#m", "Bm", "Cm", "C#m",
                "Dm", "D#m", "Em", "Fm", "F#m",
                "Gm", "G#m"
            ].map(nome => ({ nome }));

        }

        if (req.session.usuario) {
            await salvarHistorico(
                req.session.usuario.id,
                'cifra',
                cifra.id
            );

            let valor = 1;

            await registrarGenero(
                req.session.usuario.id,
                cifra.Musica.genero, 
                valor
            );
        }

        const breadcrumb = cifraBreadcrumb(cifra);

        return res.render('cifra', {
            cifra,
            cifras,
            tons,
            breadcrumb
        });
    },

    store: async function (req, res) {
        console.log("A");

        const pastaArtistas = path.join(__dirname, "../public/imagens/artistas");

        await fs.promises.mkdir(pastaArtistas, { recursive: true });

        console.log("B");

        const form = new formidable.IncomingForm({
            multiples: false,
            keepExtensions: true,
            allowEmptyFiles: true,
            minFileSize: 0,
            uploadDir: pastaArtistas,
        });

        console.log("C");


        function getFieldValue(field) {
            if (Array.isArray(field)) {
                return String(field[0]).trim();
            }

            return field ? String(field).trim() : "";
        }

        form.parse(req, async (err, fields, files) => {

            console.log("D");

            if (err) {
                console.error(err);

                return res.status(500).send("Erro ao processar formulário");
            }

            console.log("E");

            try {

                const artistaId = getFieldValue(fields.artistaId);
                const musicaId = getFieldValue(fields.musicaId);
                const tomMusica = getFieldValue(fields.tomMusica);
                const cifra = getFieldValue(fields.cifra);
                const comentario = getFieldValue(fields.comentario);

                const criarArtista = fields.criarArtista !== undefined;
                const criarMusica = fields.criarMusica !== undefined;

                const tonalidade = tomMusica.includes("m") ? "menor" : "maior";

                let artista;

                if (criarArtista) {

                    const nomeArtista = getFieldValue(fields.nomeArtista);
                    const generoArtista = getFieldValue(fields.generoArtista);

                    let imagem = "imagens/site/padrao.jpg";

                    const file = files.imgArtista
                        ? Array.isArray(files.imgArtista)
                            ? files.imgArtista[0]
                            : files.imgArtista
                        : null;

                    if (file && file.size > 0 && file.originalFilename) {
                        const ext = path.extname(file.originalFilename);
                        const novoNome = crypto.randomBytes(16).toString("hex") + ext;
                        const novoCaminho = path.join(pastaArtistas, novoNome);

                        await fs.promises.rename(file.filepath, novoCaminho);

                        imagem = "imagens/artistas/" + novoNome;

                    } else if (file && file.filepath) {
                        fs.promises.unlink(file.filepath)
                            .catch(err => console.error(err));
                    }

                    artista = await artistaModel.create({
                        nome: nomeArtista,
                        genero: generoArtista,
                        verificado: false,
                        imagem: imagem
                    });

                } else {

                    artista = await artistaModel.findOne({
                        where: {
                            id: artistaId
                        }
                    });
                }

                let musica;
                if (criarMusica) {
                    const nomeMusica = getFieldValue(fields.nomeMusica);
                    musica = await musicaModel.create({
                        nome: nomeMusica,
                        artistaId: artista.id
                    });

                } else {

                    musica = await musicaModel.findOne({
                        where: {
                            id: musicaId
                        }
                    });

                }

                const linhasTexto = cifra
                    .replace(/\r/g, "")
                    .split("\n");

                let cifra_User = [];

                const regexCifra =
                    /^[A-G](#|b)?(m|maj7|m7|7M|7|2|4|5|6|9|11|sus2|sus4|dim|dim7|aug|add9|º|m6|7\(9\)|7M\(9\)|m9|7\(9-\)|7\(9\+\))?(\/[A-G](#|b)?)?$/;

                linhasTexto.forEach(linha => {
                    const palavras = linha.split(/(\s+)/);
                    palavras.forEach(palavra => {
                        const palavraTrim = palavra.trim();
                        if (palavraTrim === "" || palavraTrim === "|") {
                            cifra_User.push(palavra);
                            return;
                        }

                        if (regexCifra.test(palavraTrim)) {
                            cifra_User.push("$" + palavraTrim + "$");
                        } else {
                            cifra_User.push(palavra);
                        }

                    });

                    cifra_User.push("\n");

                });

                const texto_final = cifra_User.join("");

                const novaCifra = await cifraModel.create({
                    tom: tomMusica,
                    tonalidade,
                    cifra: texto_final,
                    comentario,
                    link: "",
                    musicaId: musica.id,
                    usuarioId: req.session.usuario.id

                });

                return res.redirect(`/cifras/${novaCifra.id}`);

            } catch (erro) {
                console.error(erro);
                return res.send("Erro ao criar cifra");
            }
        });
    }
};