const database = require('../database/dbConecta');
const Usuario = require('./usuario'); 
const Sequelize = require('sequelize');

const Curso = database.define('cursos', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }, 
   nome: { type: Sequelize.STRING, allowNull: false }, 
   descricao: { type: Sequelize.STRING, allowNull: false },
   professorId: {type: Sequelize.INTEGER, allowNull: false, references: {model: Usuario, key: 'id'}}
});


module.exports = Curso;