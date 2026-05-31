const database = require('../database/dbConecta');
const Grupo = require('./grupo');
const Usuario = require('./usuario');
const Sequelize = require('sequelize');

const Mensagem = database.define('mensagens', {

   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },

   conteudo: {
      type: Sequelize.STRING,
      allowNull: false
   },

   grupoId: {
      type: Sequelize.INTEGER,
      allowNull: false,

      references: {
         model: Grupo,
         key: 'id'
      }
   },

   usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false,

      references: {
         model: Usuario,
         key: 'id'
      }
   }

});

module.exports = Mensagem;