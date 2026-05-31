'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const notas = [
      'C', 'C#', 'D', 'D#', 'E', 'F',
      'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];

    const tipos = [
      '', 'm', 'º', '4',
      '7', '7M', 'm7',
      '9', '7(9)', '7M(9)', 'm9',
      '7(9-)', '7(9+)'
    ];

    const acordes = [];

    notas.forEach((nota, index) => {
      tipos.forEach(tipo => {
        acordes.push({
          nome: nota + tipo,
          createdAt: now,
          updatedAt: now
        });
      });
      acordes.push({
        nome: nota + "/" + notas[(index + 4) % 12],
        createdAt: now,
        updatedAt: now
      });
    });

    await queryInterface.bulkInsert('acordes', acordes);

    await queryInterface.bulkInsert('acordesviolaos', [

      // ===== C =====
      { acordeNome: 'C', formato: "x-3-2-0-1-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Cm', formato: "x-3-5-5-4-3", createdAt: now, updatedAt: now },
      { acordeNome: 'Cº', formato: "x-3-4-2-4-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C4', formato: "x-3-5-5-6-3", createdAt: now, updatedAt: now },
      { acordeNome: 'C7', formato: "x-3-2-3-1-0", createdAt: now, updatedAt: now },
      { acordeNome: 'C7M', formato: "x-3-2-0-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Cm7', formato: "x-3-5-3-4-3", createdAt: now, updatedAt: now },
      { acordeNome: 'C9', formato: "x-3-2-0-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'C7(9)', formato: "x-3-2-3-3-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C7M(9)', formato: "x-3-2-4-3-x", createdAt: now, updatedAt: now },
      { acordeNome: 'Cm9', formato: "x-3-5-3-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'C7(9-)', formato: "x-3-2-3-2-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C7(9+)', formato: "x-3-2-3-4-x", createdAt: now, updatedAt: now },

      // ===== C# =====
      { acordeNome: 'C#', formato: "x-4-3-1-2-1", createdAt: now, updatedAt: now },
      { acordeNome: 'C#m', formato: "x-4-6-6-5-4", createdAt: now, updatedAt: now },
      { acordeNome: 'C#º', formato: "x-4-5-3-5-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#4', formato: "x-4-6-6-7-4", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7', formato: "x-4-3-4-2-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7M', formato: "x-4-3-1-1-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#m7', formato: "x-4-6-4-5-4", createdAt: now, updatedAt: now },
      { acordeNome: 'C#9', formato: "x-4-3-4-4-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7(9)', formato: "x-4-3-4-4-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7M(9)', formato: "x-4-3-5-4-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#m9', formato: "x-4-6-4-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7(9-)', formato: "x-4-3-4-3-x", createdAt: now, updatedAt: now },
      { acordeNome: 'C#7(9+)', formato: "x-4-3-4-5-x", createdAt: now, updatedAt: now },

      // ===== D =====
      { acordeNome: 'D', formato: "x-x-0-2-3-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Dm', formato: "x-x-0-2-3-1", createdAt: now, updatedAt: now },
      { acordeNome: 'Dº', formato: "x-x-0-1-0-1", createdAt: now, updatedAt: now },
      { acordeNome: 'D4', formato: "x-x-0-2-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'D7', formato: "x-x-0-2-1-2", createdAt: now, updatedAt: now },
      { acordeNome: 'D7M', formato: "x-x-0-2-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Dm7', formato: "x-x-0-2-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'D9', formato: "x-x-0-2-3-0", createdAt: now, updatedAt: now },
      { acordeNome: 'D7(9)', formato: "x-x-0-2-2-0", createdAt: now, updatedAt: now },
      { acordeNome: 'D7M(9)', formato: "x-x-0-2-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'Dm9', formato: "x-5-3-5-5-x", createdAt: now, updatedAt: now },
      { acordeNome: 'D7(9-)', formato: "x-x-0-2-1-0", createdAt: now, updatedAt: now },
      { acordeNome: 'D7(9+)', formato: "x-x-0-2-3-3", createdAt: now, updatedAt: now },

      // ===== E =====
      { acordeNome: 'E', formato: "0-2-2-1-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Em', formato: "0-2-2-0-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Eº', formato: "0-1-2-0-2-0", createdAt: now, updatedAt: now },
      { acordeNome: 'E4', formato: "0-2-2-2-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'E7', formato: "0-2-0-1-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'E7M', formato: "0-2-1-1-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Em7', formato: "0-2-0-0-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'E9', formato: "0-2-0-1-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'E7(9)', formato: "0-2-0-1-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'E7M(9)', formato: "0-2-1-1-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Em9', formato: "0-2-0-0-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'E7(9-)', formato: "0-2-0-1-0-1", createdAt: now, updatedAt: now },
      { acordeNome: 'E7(9+)', formato: "0-2-0-1-0-3", createdAt: now, updatedAt: now },

      // ===== F =====
      { acordeNome: 'F', formato: "1-3-3-2-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'Fm', formato: "1-3-3-1-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'Fº', formato: "1-2-3-1-3-x", createdAt: now, updatedAt: now },
      { acordeNome: 'F4', formato: "1-3-3-3-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'F7', formato: "1-3-1-2-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'F7M', formato: "1-3-2-2-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'Fm7', formato: "1-3-1-1-1-1", createdAt: now, updatedAt: now },
      { acordeNome: 'F9', formato: "1-3-1-2-1-3", createdAt: now, updatedAt: now },
      { acordeNome: 'F7(9)', formato: "1-3-1-2-1-3", createdAt: now, updatedAt: now },
      { acordeNome: 'F7M(9)', formato: "1-3-2-2-1-3", createdAt: now, updatedAt: now },
      { acordeNome: 'Fm9', formato: "1-3-1-1-1-3", createdAt: now, updatedAt: now },
      { acordeNome: 'F7(9-)', formato: "1-3-1-2-1-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F7(9+)', formato: "1-3-1-2-1-4", createdAt: now, updatedAt: now },

      // ===== F# =====
      { acordeNome: 'F#', formato: "2-4-4-3-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#m', formato: "2-4-4-2-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#º', formato: "2-3-4-2-4-x", createdAt: now, updatedAt: now },
      { acordeNome: 'F#4', formato: "2-4-4-4-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7', formato: "2-4-2-3-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7M', formato: "2-4-3-3-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#m7', formato: "2-4-2-2-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'F#9', formato: "2-4-2-3-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7(9)', formato: "2-4-2-3-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7M(9)', formato: "2-4-3-3-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'F#m9', formato: "2-4-2-2-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7(9-)', formato: "2-4-2-3-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'F#7(9+)', formato: "2-4-2-3-2-5", createdAt: now, updatedAt: now },

      // ===== G =====
      { acordeNome: 'G', formato: "3-2-0-0-0-3", createdAt: now, updatedAt: now },
      { acordeNome: 'Gm', formato: "3-5-5-3-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'Gº', formato: "3-4-5-3-5-x", createdAt: now, updatedAt: now },
      { acordeNome: 'G4', formato: "3-5-5-5-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'G7', formato: "3-2-0-0-0-1", createdAt: now, updatedAt: now },
      { acordeNome: 'G7M', formato: "3-2-0-0-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Gm7', formato: "3-5-3-3-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'G9', formato: "3-2-0-2-0-1", createdAt: now, updatedAt: now },
      { acordeNome: 'G7(9)', formato: "3-2-0-2-0-1", createdAt: now, updatedAt: now },
      { acordeNome: 'G7M(9)', formato: "3-2-0-2-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Gm9', formato: "3-5-3-3-3-5", createdAt: now, updatedAt: now },
      { acordeNome: 'G7(9-)', formato: "3-2-0-2-0-0", createdAt: now, updatedAt: now },
      { acordeNome: 'G7(9+)', formato: "3-2-0-2-0-3", createdAt: now, updatedAt: now },

      // ===== G# =====
      { acordeNome: 'G#', formato: "4-6-6-5-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#m', formato: "4-6-6-4-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#º', formato: "4-5-6-4-6-x", createdAt: now, updatedAt: now },
      { acordeNome: 'G#4', formato: "4-6-6-6-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7', formato: "4-6-4-5-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7M', formato: "4-6-5-5-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#m7', formato: "4-6-4-4-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'G#9', formato: "4-6-4-5-4-6", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7(9)', formato: "4-6-4-5-4-6", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7M(9)', formato: "4-6-5-5-4-6", createdAt: now, updatedAt: now },
      { acordeNome: 'G#m9', formato: "4-6-4-4-4-6", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7(9-)', formato: "4-6-4-5-4-5", createdAt: now, updatedAt: now },
      { acordeNome: 'G#7(9+)', formato: "4-6-4-5-4-7", createdAt: now, updatedAt: now },

      // ===== A =====
      { acordeNome: 'A', formato: "x-0-2-2-2-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Am', formato: "x-0-2-2-1-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Aº', formato: "x-0-1-2-1-2", createdAt: now, updatedAt: now },
      { acordeNome: 'A4', formato: "x-0-2-2-3-0", createdAt: now, updatedAt: now },
      { acordeNome: 'A7', formato: "x-0-2-0-2-0", createdAt: now, updatedAt: now },
      { acordeNome: 'A7M', formato: "x-0-2-1-2-0", createdAt: now, updatedAt: now },
      { acordeNome: 'Am7', formato: "x-0-2-0-1-0", createdAt: now, updatedAt: now },
      { acordeNome: 'A9', formato: "x-0-2-4-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A7(9)', formato: "x-0-2-4-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A7M(9)', formato: "x-0-2-4-2-4", createdAt: now, updatedAt: now },
      { acordeNome: 'Am9', formato: "x-0-2-4-1-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A7(9-)', formato: "x-0-2-3-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A7(9+)', formato: "x-0-2-5-2-3", createdAt: now, updatedAt: now },

      // ===== A# =====
      { acordeNome: 'A#', formato: "x-1-3-3-3-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#m', formato: "x-1-3-3-2-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#º', formato: "x-1-2-0-2-x", createdAt: now, updatedAt: now },
      { acordeNome: 'A#4', formato: "x-1-3-3-4-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7', formato: "x-1-3-1-3-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7M', formato: "x-1-3-2-3-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#m7', formato: "x-1-3-1-2-1", createdAt: now, updatedAt: now },
      { acordeNome: 'A#9', formato: "x-1-3-1-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7(9)', formato: "x-1-3-1-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7M(9)', formato: "x-1-3-2-3-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A#m9', formato: "x-1-3-1-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7(9-)', formato: "x-1-3-1-2-3", createdAt: now, updatedAt: now },
      { acordeNome: 'A#7(9+)', formato: "x-1-3-1-4-3", createdAt: now, updatedAt: now },

      // ===== B =====
      { acordeNome: 'B', formato: "x-2-4-4-4-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Bm', formato: "x-2-4-4-3-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Bº', formato: "x-2-3-1-3-x", createdAt: now, updatedAt: now },
      { acordeNome: 'B4', formato: "x-2-4-4-5-2", createdAt: now, updatedAt: now },
      { acordeNome: 'B7', formato: "x-2-1-2-0-2", createdAt: now, updatedAt: now },
      { acordeNome: 'B7M', formato: "x-2-4-3-4-2", createdAt: now, updatedAt: now },
      { acordeNome: 'Bm7', formato: "x-2-4-2-3-2", createdAt: now, updatedAt: now },
      { acordeNome: 'B9', formato: "x-2-4-2-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'B7(9)', formato: "x-2-1-2-2-2", createdAt: now, updatedAt: now },
      { acordeNome: 'B7M(9)', formato: "x-2-4-3-4-4", createdAt: now, updatedAt: now },
      { acordeNome: 'Bm9', formato: "x-2-4-2-3-4", createdAt: now, updatedAt: now },
      { acordeNome: 'B7(9-)', formato: "x-2-1-2-1-2", createdAt: now, updatedAt: now },
      { acordeNome: 'B7(9+)', formato: "x-2-1-2-3-2", createdAt: now, updatedAt: now },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('acordesviolaos', null, {});
    await queryInterface.bulkDelete('acordes', null, {});
  }
};