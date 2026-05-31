const database = require('../database/dbConecta');
const Acorde = require('./acorde'); 
const Sequelize = require('sequelize');

const AcordeViolao = database.define('acordesviolaos', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
   acordeNome: { type: Sequelize.STRING, allowNull: false, references: {model: Acorde, key: 'nome'}},
   formato: { type: Sequelize.STRING, allowNull: false },
});

module.exports = AcordeViolao;