const database = require('../database/dbConecta');
const Sequelize = require('sequelize');

const Artista = database.define('artistas', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
   nome: { type: Sequelize.STRING, allowNull: false },
   imagem: {type: Sequelize.STRING},
   acessos: {type: Sequelize.INTEGER},
   verificado: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = Artista;