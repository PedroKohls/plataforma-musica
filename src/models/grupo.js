const database = require('../database/dbConecta');
const Usuario = require('./usuario');
const Sequelize = require('sequelize');

const Grupo = database.define('grupos', {

   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },

   nome: {
      type: Sequelize.STRING,
      allowNull: false
   },

   imagem: {
      type: Sequelize.STRING
   },

   acessos: {
      type: Sequelize.INTEGER
   },

   descricao: {
      type: Sequelize.STRING,
      allowNull: false
   },

   criadorId: {
      type: Sequelize.INTEGER,
      allowNull: false,

      references: {
         model: Usuario,
         key: 'id'
      }
   }

});

module.exports = Grupo;