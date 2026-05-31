const cifraModel = require("../models/cifra");
const artistaModel = require("../models/artista");
const musicaModel = require("../models/musica");
const { cifraBreadcrumb } = require('../utils/breadcrumb');

const { salvarHistorico } = require('../services/historicoService');

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
                "cifra",
                cifra.id
            );
        }

        const breadcrumb = cifraBreadcrumb(cifra);

        return res.render('visualizarCifra', {
            cifra,
            cifras,
            tons,
            breadcrumb
        });
    },

    store: async function (req, res) {
        try {
            let { artistaId, musicaId, tomMusica, cifra, comentario } = req.body;
            let tonalidade = tomMusica.includes("m") ? "menor" : "maior";
            let artista;

            if (artistaId && artistaId.includes("novo|")) {
                const nomeArtista = artistaId.split("novo|")[1];
                artista = await artistaModel.create({
                    nome: nomeArtista,
                    verificado: false,
                    imagem: null
                });

            } else {
                artista = await artistaModel.findOne({
                    where: { id: artistaId }
                });
            }
            let musica;

            if (musicaId && musicaId.includes("novo|")) {
                const nomeMusica = musicaId.split("novo|")[1];
                musica = await musicaModel.create({
                    nome: nomeMusica,
                    artistaId: artista.id
                });
            } else {
                musica = await musicaModel.findOne({
                    where: { id: musicaId }
                });
            }

            const linhasTexto = cifra.replace(/\r/g, '').split('\n');
            let cifra_User = [];
            const regexCifra = /^[A-G](#|b)?(m|maj7|m7|7M|7|2|4|5|6|9|11|sus2|sus4|dim|dim7|aug|add9|º|m6|7\(9\)|7M\(9\)|m9|7\(9-\)|7\(9\+\))?(\/[A-G](#|b)?)?$/;

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
                tonalidade: tonalidade,
                cifra: texto_final,
                comentario: comentario,
                link: "",
                musicaId: musica.id,
                usuarioId: req.session.usuario.id
            });

            return res.redirect(`/cifras/${novaCifra.id}`);

        } catch (erro) {
            console.error(erro);
            return res.send("Erro ao criar cifra");
        }
    }
};