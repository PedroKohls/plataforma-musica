const database = require('../database/dbConecta');
const Usuario = require('./usuario');
const Grupo = require('./grupo');
const Sequelize = require('sequelize');

const GrupoUsuario = database.define('grupos_usuarios', {

   grupoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,

      references: {
         model: Grupo,
         key: 'id'
      }
   },

   usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,

      references: {
         model: Usuario,
         key: 'id'
      }
   }

}, {
   timestamps: false
});

module.exports = GrupoUsuario;