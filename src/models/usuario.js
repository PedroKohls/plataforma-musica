const database = require('../database/dbConecta');
const Sequelize = require('sequelize');

const Usuario = database.define('usuarios', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
   nome: { type: Sequelize.STRING, allowNull: false },
   email: { type: Sequelize.STRING, allowNull: false },
   senha: { type: Sequelize.STRING, allowNull: false },
   tipo: { type: Sequelize.STRING, allowNull: false },
   imagem: {type: Sequelize.STRING},
});

module.exports = Usuario;