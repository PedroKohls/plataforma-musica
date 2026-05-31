const database = require('../database/dbConecta');
const Curso = require('./curso'); 
const Sequelize = require('sequelize');

const Pagina = database.define('paginas', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }, 
   titulo: { type: Sequelize.STRING, allowNull: false }, 
   conteudo: { type: Sequelize.STRING, allowNull: false },
   ordem: { type: Sequelize.INTEGER, allowNull: false },
   cursoId: {type: Sequelize.INTEGER, allowNull: false, references: {model: Curso, key: 'id'}}
});


module.exports = Pagina;