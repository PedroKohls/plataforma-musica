'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cifras', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      tom: { type: Sequelize.STRING, allowNull: false },
      tonalidade: { type: Sequelize.STRING, allowNull: false },
      cifra: { type: Sequelize.TEXT, allowNull: false },
      link: { type: Sequelize.STRING },
      comentario: { type: Sequelize.STRING, allowNull: false },
      acessos: { type: Sequelize.INTEGER },
      musicaId: { type: Sequelize.INTEGER, allowNull: false, references: { model: "musicas", key: 'id' } },
      usuarioId: { type: Sequelize.INTEGER, allowNull: false, references: { model: "usuarios", key: 'id' } },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {

  }
};
