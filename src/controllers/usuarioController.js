const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const usuarioModel = require("../models/usuario");
const cifraModel = require("../models/cifra");
const artistaModel = require("../models/artista");
const musicaModel = require("../models/musica");
const cursoModel = require("../models/curso");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { consultarHistorico } = require('../services/historicoService');

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

    logar: async function (req, res) {
        const { senha, email } = req.body;

        const usuario = await usuarioModel.findOne({
            where: { email: email }
        });

        if (usuario) {
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (senhaCorreta) {
                req.session.usuario = usuario;
                req.session.message = `Bem vindo de volta, ${usuario.nome}`;
                return res.redirect('/');
            } else {
                req.session.message = `Senha incorreta!`;
                return res.redirect('/login');
            }
        } else {
            req.session.message = `Não foi encontrado usuário com E-mail: ${email}`;
            return res.redirect('/login');
        }
    },

    logout: function (req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao fazer logout' });
            }
            res.redirect('/login');
        });
    },

    cadastrar: async function (req, res) {

        const pastaUsuarios = path.join(
            __dirname,
            '../public/imagens/usuarios'
        );

        await fs.promises.mkdir(
            pastaUsuarios,
            { recursive: true }
        );

        const form = new formidable.IncomingForm({
            multiples: false,
            keepExtensions: true,
            allowEmptyFiles: true,
            minFileSize: 0,
            uploadDir: pastaUsuarios
        });

        function getFieldValue(field) {
            if (Array.isArray(field)) {
                return String(field[0]).trim();
            }

            return field ? String(field).trim() : '';
        }

        form.parse(req, async (err, fields, files) => {

            if (err) {
                console.error("Erro no Formidable:", err);

                return res.status(500).json({
                    message: 'Erro ao processar formulário'
                });
            }

            try {

                let nome = getFieldValue(fields.nome);
                let email = getFieldValue(fields.email);
                let senha = getFieldValue(fields.senha);
                let tipo = getFieldValue(fields.tipo) || 'aluno';

                if (!nome || !email || !senha) {
                    return res.status(400).json({
                        message: 'Todos os campos obrigatórios devem ser preenchidos.'
                    });
                }

                let imagem = "imagens/site/padrao.jpg";

                const file = files.imagem
                    ? (Array.isArray(files.imagem)
                        ? files.imagem[0]
                        : files.imagem)
                    : null;

                if (
                    file &&
                    file.size > 0 &&
                    file.originalFilename
                ) {

                    const ext = path.extname(file.originalFilename);

                    const novoNome =
                        crypto.randomBytes(16).toString('hex') + ext;

                    const novoCaminho = path.join(
                        pastaUsuarios,
                        novoNome
                    );

                    await fs.promises.rename(
                        file.filepath,
                        novoCaminho
                    );

                    imagem = "imagens/usuarios/" + novoNome;
                }

                const usuarioExistente =
                    await usuarioModel.findOne({
                        where: { email: email }
                    });

                if (usuarioExistente) {
                    return res.status(400).json({
                        message: 'Email já cadastrado'
                    });
                }

                const hashedSenha =
                    await bcrypt.hash(senha, 10);

                await usuarioModel.create({
                    nome,
                    email,
                    senha: hashedSenha,
                    imagem,
                    tipo
                });

                req.session.message = "Usuário cadastrado com sucesso!";
                return res.redirect('/login');

            } catch (erro) {

                console.error(
                    "Erro no cadastro:",
                    erro
                );

                return res.status(500).json({
                    message: 'Erro ao cadastrar usuário'
                });
            }
        });
    },


    Inicio: async function (req, res) {
        const usuarioId = req.session && req.session.usuario ? req.session.usuario.id : null;

        const [cifras, artistas, cursos, historicoCurso] = await Promise.all([
            cifraModel.findAll({
                limit: 5,
                order: [['acessos', 'DESC']],
                include: [{ model: musicaModel, as: 'Musica', include: [{ model: artistaModel, as: 'Artista' }] }]
            }),
            artistaModel.findAll({ limit: 5, order: [['acessos', 'ASC']] }),
            cursoModel.findAll({ limit: 5, order: [['nome', 'ASC']] }),
            usuarioId ? consultarHistorico(usuarioId, "curso") : Promise.resolve([])
        ]);

        const ultimoCurso = historicoCurso[0] || null;

        res.render('inicio', { cifras, artistas, cursos, ultimoCurso });
    }

};