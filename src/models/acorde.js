const database = require('../database/dbConecta');
const Sequelize = require('sequelize');

const Acorde = database.define('acordes', {
   id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }, 
   nome: { type: Sequelize.STRING, allowNull: false, unique: true }, 
});


module.exports = Acorde;