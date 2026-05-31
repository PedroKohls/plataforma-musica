'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('artistas', [
      {
        id: 1,
        nome: 'Teste',
        imagem: null,
        verificado: 0,
        createdAt: now,
        updatedAt: now
      },
    ]);
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('artistas', null, {});
  }
};
