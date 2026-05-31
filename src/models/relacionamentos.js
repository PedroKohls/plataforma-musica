const database = require('../database/dbConecta');
const Artista = require('./artista');
const Musica = require('./musica');
const Cifra = require('./cifra');
const Acorde = require('./acorde');
const AcordeViolao = require('./acordeViolao.js');
const Curso = require('./curso');
const Grupo = require('./grupo');
const GrupoUsuario = require('./grupo_usuario');
const Usuario = require('./usuario');
const Mensagem = require('./mensagem');

/* artista tem varias musicas, mas uma musica tem um e apenas um artista*/
Artista.hasMany(Musica, { foreignKey: 'artistaId', as: 'musicas' });
Musica.belongsTo(Artista, { foreignKey: 'artistaId', as: 'Artista' });

/* musica tem varias cifras, mas uma cifra tem uma e apenas uma musica*/
Musica.hasMany(Cifra, { foreignKey: 'musicaId', as: 'cifras' });
Cifra.belongsTo(Musica, { foreignKey: 'musicaId', as: 'Musica' });

Usuario.hasMany(Curso, { foreignKey: 'professorId', as: 'cursos' });
Curso.belongsTo(Usuario, { foreignKey: 'professorId', as: 'Professor' });

Acorde.hasMany(AcordeViolao, { foreignKey: 'acordeNome', sourceKey: 'nome' });
AcordeViolao.belongsTo(Acorde, { foreignKey: 'acordeNome', targetKey: 'nome' });

Usuario.hasMany(Grupo, { foreignKey: 'criadorId', as: 'gruposCriados' });
Grupo.belongsTo(Usuario, { foreignKey: 'criadorId', as: 'criador' });

Usuario.belongsToMany(Grupo, { through: GrupoUsuario, foreignKey: 'usuarioId', otherKey: 'grupoId', as: 'grupos' });
Grupo.belongsToMany(Usuario, { through: GrupoUsuario, foreignKey: 'grupoId', otherKey: 'usuarioId', as: 'usuarios' });

Usuario.hasMany(Mensagem, { foreignKey: 'usuarioId', as: 'mensagens' });
Mensagem.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Grupo.hasMany(Mensagem, { foreignKey: 'grupoId', as: 'mensagens' });
Mensagem.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });