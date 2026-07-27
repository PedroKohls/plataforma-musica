const database = require('../database/dbConecta');
const Usuario = require('./usuario');
const Sequelize = require('sequelize');

const GeneroUsuario = database.define('generos_usuarios', {
    usuarioId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, references: { model: Usuario, key: 'id' } },
    genero: { type: Sequelize.STRING, allowNull: false },
    valor: { type: Sequelize.INTEGER, allowNull: false }
});

module.exports = GeneroUsuario;