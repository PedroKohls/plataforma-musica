const database = require('../database/dbConecta');
const Musica = require('./musica');
const Usuario = require('./usuario');
const Sequelize = require('sequelize');

const Cifra = database.define('cifras', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    tom: { type: Sequelize.STRING, allowNull: false },
    tonalidade: { type: Sequelize.STRING, allowNull: false },
    cifra: { type: Sequelize.TEXT, allowNull: false },
    link: { type: Sequelize.STRING },
    comentario: { type: Sequelize.STRING, allowNull: false },
    acessos: { type: Sequelize.INTEGER },
    musicaId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Musica, key: 'id' } },
    usuarioId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Usuario, key: 'id' } }
});

module.exports = Cifra;