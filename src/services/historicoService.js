const historicoModel = require('../models/historico');
const artistaModel = require('../models/artista');
const musicaModel = require('../models/musica');
const cifraModel = require('../models/cifra');
const cursoModel = require('../models/curso');
const usuarioModel = require('../models/usuario');

async function salvarHistorico(usuarioId, tipo, referenciaId) {
    try {
        if (tipo === "curso") {
            await historicoModel.destroy({
                where: {
                    usuarioId,
                    tipo: 'curso'
                }
            });
        }
        if (tipo === "artista") {
            await historicoModel.destroy({
                where: {
                    usuarioId,
                    tipo: 'artista'
                }
            });
        }

        await historicoModel.create({
            usuarioId,
            tipo,
            referenciaId
        });

    } catch (erro) {
        console.error('Erro ao salvar histórico:', erro);
    }
}


async function consultarHistorico(usuarioId, tipo) {
    try {
        const historico = await historicoModel.findAll({
            where: {
                usuarioId,
                tipo
            },
            order: [['createdAt', 'DESC']]
        });

        const resultado = [];

        for (const item of historico) {
            let dado = null;

            if (tipo === 'artista') {
                dado = await artistaModel.findOne({
                    where: {
                        id: item.referenciaId
                    }
                });
                if (dado) {
                    resultado.push({
                        id: dado.id,
                        nome: dado.nome,
                        slug: dado.slug
                    });
                }
            }

            else if (tipo === 'musica') {
                dado = await musicaModel.findOne({
                    where: {
                        id: item.referenciaId
                    }
                });
                if (dado) {
                    resultado.push({
                        id: dado.id,
                        nome: dado.nome,
                        slug: dado.slug
                    });
                }
            }

            else if (tipo === 'cifra') {
                dado = await cifraModel.findOne({
                    where: {
                        id: item.referenciaId
                    }
                });
                if (dado) {
                    resultado.push({
                        id: dado.id,
                        titulo: dado.titulo,
                        slug: dado.slug
                    });
                }
            }

            else if (tipo === 'curso') {
                dado = await cursoModel.findOne({
                    where: { id: item.referenciaId },
                    include: [{
                        model: usuarioModel,
                        as: 'Professor'
                    }]
                });
                if (dado) {
                    resultado.push(dado);
                }
            }
        }
        return resultado;
    } catch (erro) {
        console.error('Erro ao consultar histórico:', erro);
        return [];
    }
}

module.exports = {
    salvarHistorico,
    consultarHistorico
};