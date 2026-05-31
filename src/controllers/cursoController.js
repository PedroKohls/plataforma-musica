const { Op } = require("sequelize");
const cursoModel = require("../models/curso");
const paginaModel = require("../models/pagina");
const usuarioModel = require("../models/usuario");
const { salvarHistorico } = require('../services/historicoService');

module.exports = {
    store: async function (req, res) {
        if (!req.session.usuario) {
            return res.redirect('/login');
        }

        const { nome, descricao, paginas } = req.body;

        if (!nome || !descricao) {
            return res.status(400).send('Nome e descrição são obrigatórios.');
        }

        // Garante que paginas vire um array iterável
        const pageItems = Array.isArray(paginas)
            ? paginas
            : paginas && typeof paginas === 'object'
                ? Object.values(paginas)
                : [];

        try {
            const curso = await cursoModel.create({
                nome: nome,
                descricao: descricao,
                professorId: req.session.usuario.id
            });

            for (let i = 0; i < pageItems.length; i++) {
                const pagina = pageItems[i];

                if (!pagina || !pagina.titulo || !pagina.conteudo) {
                    continue;
                }

                await paginaModel.create({
                    titulo: pagina.titulo,
                    conteudo: pagina.conteudo, 
                    ordem: i + 1,
                    cursoId: curso.id
                });
            }

            return res.redirect('/');
        } catch (error) {
            console.error('Erro ao criar curso:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    },

    listarCurso: async function (req, res) {
        const id = req.params.curso;

        let curso = await cursoModel.findOne({
            where: {
                id: id
            }
        });

        if (!curso) {
            return res.status(404).send('Curso não encontrado');
        }

        const paginas = await paginaModel.findAll({
            where: { cursoId: id },
            order: [['ordem', 'ASC']]
        });

        if (req.session.usuario) {
            await salvarHistorico(
                req.session.usuario.id,
                "curso",
                id
            );
        }

        return res.render('visualizarCurso', { curso, paginas });
    },
}

