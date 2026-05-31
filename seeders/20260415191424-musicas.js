'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('musicas', [
      {
        id: 1,
        nome: 'musica:ao vivo',
        artistaId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        nome: 'teste$123',
        artistaId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        nome: 'musica-teste',
        artistaId: 1,
        createdAt: now,
        updatedAt: now
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('musicas', null, {});
  }
};
