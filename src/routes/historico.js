const express = require('express');
const router = express.Router();
const { consultarHistorico } = require('../services/historicoService');

router.get('/:tipo', async (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.json({
                Dados: []
            });
        }
        const historico = await consultarHistorico(
            req.session.usuario.id,
            req.params.tipo
        );

        res.json({
            Dados: historico
        });

    } catch (erro) {

        console.error(erro);
        res.status(500).json({
            erro: 'Erro interno'
        });

    }

});

module.exports = router;