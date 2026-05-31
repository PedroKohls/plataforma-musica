const database = require('../database/dbConecta');
const Usuario = require('./usuario');
const Sequelize = require('sequelize');

const Historico = database.define('historicos', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
   usuarioId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Usuario, key: 'id' } },
   tipo: { type: Sequelize.STRING, allowNull: false },
   referenciaId: { type: Sequelize.INTEGER, allowNull: false },
   acessadoEm: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }

});

module.exports = Historico;