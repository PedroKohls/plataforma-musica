const fs = require("fs");
const crypto = require("crypto");
const formidable = require("formidable");
const path = require("path");
const grupoModel = require("../models/grupo");
const usuarioModel = require("../models/usuario");
const mensagemModel = require("../models/mensagem");
const GrupoUsuario = require("../models/grupo_usuario");
const { Op } = require("sequelize");
const { salvarHistorico } = require("../services/historicoService");

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
      return res.render("comunidade", { Dados: [], nomeArtista: "" });
    }
    let dados = await grupoModel.findAll({
      where: {
        nome: {
          [Op.like]: nome + "%",
        },
      },
      limit: 10,
    });

    dados.forEach((grupo) => {
      grupo.slug = slugify(grupo.nome);
    });

    for (let grupo of dados) {
      let membros = await GrupoUsuario.count({
        where: { grupoId: grupo.id },
      });

      grupo.dataValues.membros = membros;
    }

    res.send({ Dados: dados, nomeGrupo: nome });
  },

  listarGrupo: async function (req, res) {
    const url = req.params.grupos;

    const partes = url.split("-");
    const id = partes[partes.length - 1];

    await grupoModel.increment("acessos", {
      by: 1,
      where: { id: id },
    });

    let grupo = await grupoModel.findOne({
      where: { id },
      include: [
        {
          model: mensagemModel,
          as: "mensagens",
          include: [{ model: usuarioModel, as: "usuario" }],
        },
      ],
    });

    let membros = await GrupoUsuario.count({
      where: { grupoId: grupo.id },
    });

    grupo.dataValues.membros = membros;

    res.render("grupo", {
      grupo,
      mensagens: grupo.mensagens,
    });
  },

  store: async function (req, res) {
    const pastaGrupos = path.join(__dirname, "../public/imagens/grupos");

    await fs.promises.mkdir(pastaGrupos, { recursive: true });

    const form = new formidable.IncomingForm({
      multiples: false,
      keepExtensions: true,
      allowEmptyFiles: true,
      minFileSize: 0,
      uploadDir: pastaGrupos,
    });

    function getFieldValue(field) {
      if (Array.isArray(field)) {
        return String(field[0]).trim();
      }

      return field ? String(field).trim() : "";
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Erro no Formidable:", err);

        return res.status(500).json({
          message: "Erro ao processar formulário",
        });
      }

      try {
        let nome = getFieldValue(fields.nome);
        let descricao = getFieldValue(fields.descricao);

        if (!nome || !descricao) {
          return res.status(400).json({
            message: "Todos os campos obrigatórios devem ser preenchidos.",
          });
        }

        let imagem = "imagens/site/grupo_padrao.png";

        const file = files.imagem
          ? Array.isArray(files.imagem)
            ? files.imagem[0]
            : files.imagem
          : null;

        if (file && file.size > 0 && file.originalFilename) {
          const ext = path.extname(file.originalFilename);
          const novoNome = crypto.randomBytes(16).toString("hex") + ext;
          const novoCaminho = path.join(pastaUsuarios, novoNome);

          await fs.promises.rename(file.filepath, novoCaminho);
          imagem = "imagens/grupos/" + novoNome;
        } else if (file && file.filepath) {
          fs.promises
            .unlink(file.filepath)
            .catch((err) =>
              console.error("Erro ao deletar arquivo temporário vazio:", err),
            );
        }

        await grupoModel.create({
          nome,
          descricao,
          acessos: 0,
          imagem,
          criadorId: req.session.usuario.id,
        });
        return res.redirect("comunidade");
      } catch (erro) {
        console.error("Erro no cadastro:", erro);

        return res.status(500).json({
          message: "Erro ao cadastrar grupo",
        });
      }
    });
  },

  comunidade: async function (req, res) {
    try {
      const usuarioId = req.session?.usuario?.id || 0;

      // 1. LISTA 1: Grupos Populares
      const grupos = await grupoModel.findAll({
        limit: 5,
        order: [["acessos", "DESC"]],
        raw: true,
        nest: true,
        include: [
          { model: usuarioModel, as: "criador" },
          {
            model: usuarioModel,
            as: "usuarios",
            attributes: ["id"],
            where: { id: usuarioId },
            required: false,
            // AQUI ESTÁ A CORREÇÃO: Avisar ao Sequelize qual tabela intermediária usar
            through: { model: GrupoUsuario },
          },
        ],
      });

      const meusGrupos = await grupoModel.findAll({
        raw: true,
        nest: true,
        include: [
          { model: usuarioModel, as: "criador" },
          {
            model: usuarioModel,
            as: "usuarios",
            attributes: ["id"],
            where: { id: usuarioId },
            required: true,
            through: { model: GrupoUsuario },
          },
        ],
      });

      for (let grupo of grupos) {
        grupo.jaParticipa = !!grupo.usuarios.id;
        grupo.membros = await GrupoUsuario.count({
          where: { grupoId: grupo.id },
        });
      }

      for (let grupo of meusGrupos) {
        grupo.jaParticipa = true;
        grupo.membros = await GrupoUsuario.count({
          where: { grupoId: grupo.id },
        });
      }

      res.render("comunidade", { grupos, gruposUsuario: meusGrupos });
    } catch (erro) {
      console.error("Erro ao carregar a página de comunidade:", erro);
      res.status(500).send("Erro no servidor");
    }
  },

  inscrever: async function (req, res) {
    const { id } = req.params;

    let grupo = await grupoModel.findOne({
      where: { id },
      include: [
        {
          model: mensagemModel,
          as: "mensagens",
          include: [{ model: usuarioModel, as: "usuario" }],
        },
      ],
    });

    if (grupo && req.session.usuario.id) {
      const grupoUsuario = await GrupoUsuario.create({
        grupoId: grupo.id,
        usuarioId: req.session.usuario.id,
      });

      res.render("grupo", {
        grupo,
        mensagens: grupo.mensagens,
      });
    }
  },
};
