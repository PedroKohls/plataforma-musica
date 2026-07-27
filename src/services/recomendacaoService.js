const usuarioModel = require('../models/usuario');
const GeneroUsuario = require('../models/generoUsuario');

async function registrarGenero(usuarioId, genero, valor) {

    if (!usuarioId || !genero) return;

    let registro = await GeneroUsuario.findOne({
        where: {
            usuarioId,
            genero
        }
    });

    if (registro) {
        await registro.increment('valor', { by: valor });
    } else {

        await GeneroUsuario.create({
            usuarioId,
            genero,
            valor: valor
        });
    }
}

module.exports = {
    registrarGenero
};