const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const usuarioModel = require("../models/usuario");
const cifraModel = require("../models/cifra");
const artistaModel = require("../models/artista");
const musicaModel = require("../models/musica");
const cursoModel = require("../models/curso");

const { consultarHistorico } = require("../services/historicoService");

module.exports = {
  index: async function (req, res) {
    const secao = req.query.secao || "cursos";

    const usuarioId =
      req.session && req.session.usuario
        ? req.session.usuario.id
        : null;

    switch (secao) {

      case "cursos": {
        const [cursos, historico] = await Promise.all([
          cursoModel.findAll({
            limit: 5,
            order: [["nome", "ASC"]],
          }),
          usuarioId
            ? consultarHistorico(usuarioId, "curso")
            : Promise.resolve([]),
        ]);

        const ultimoCurso = historico[0] || null;

        return res.render("inicio", {
          secao,
          titulo: "Cursos",
          cursos,
          ultimoCurso,
        });
      }

      case "cifras": {
        const cifras = await cifraModel.findAll({
          limit: 5,
          order: [["acessos", "DESC"]],
          include: [
            {
              model: musicaModel,
              as: "Musica",
              include: [
                {
                  model: artistaModel,
                  as: "Artista",
                },
              ],
            },
          ],
        });

        return res.render("inicio", {
          secao,
          titulo: "Cifras",
          cifras,
        });
      }

      case "artistas": {
        const artistas = await artistaModel.findAll({
          limit: 5,
          order: [["acessos", "DESC"]],
        });

        return res.render("inicio", {
          secao,
          titulo: "Artistas",
          artistas,
        });
      }

      default:
        return res.redirect("/?secao=cursos");
    }
  },
};