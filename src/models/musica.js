const database = require('../database/dbConecta');
const Artista = require('./artista'); 
const Sequelize = require('sequelize');

const Musica = database.define('musicas',{
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false,primaryKey: true},
    nome: { type: Sequelize.STRING, allowNull: false },
    artistaId: {type: Sequelize.INTEGER, allowNull: false,references: {model: Artista, key: 'id'}}
});

module.exports = Musica;