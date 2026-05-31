'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('cifras', [
      {
        tom: 'G',
        tonalidade: 'maior',
        cifra: `$G$ $Em$ $C$ $Am$ $D$`,
        comentario: 'Música',
        musicaId: 1,
        usuarioId: 1,
        acessos: 10,
        createdAt: now,
        updatedAt: now
      },
      {
        tom: 'D',
        tonalidade: 'maior',
        cifra: `$D$ $Bm$ $G$ $Em$ $A$`,
        comentario: 'Música',
        musicaId: 2,
        usuarioId: 1,
        acessos: 20,
        createdAt: now,
        updatedAt: now
      },
      {
        tom: 'G',
        tonalidade: 'maior',
        cifra: `$A$ $F#m$ $D$ $Bm$ $E$`,
        comentario: 'Música',
        musicaId: 3,
        usuarioId: 1,
        acessos: 30,
        createdAt: now,
        updatedAt: now
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cifras', null, {});
  }
};
