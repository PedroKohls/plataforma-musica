const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto_node', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
