/*Importações*/ 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const { slugify } = require('./src/utils/slugify');

/* Helpers globais */
app.locals.slugify = slugify;

/*Database*/
require('./src/database/dbCria');
const sequelize = require('./src/database/dbConecta');


/*models*/
require('./src/models/artista');
require('./src/models/cifra');
require('./src/models/musica');
require('./src/models/usuario');
require('./src/models/curso');
require('./src/models/relacionamentos');
require('./src/models/historico');
require('./src/models/grupo');
require('./src/models/grupo_usuario');
require('./src/models/mensagem');
//sequelize.sync();

/*sessão*/
app.use(session({
  secret: 'cifra-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// Middleware para verificar autenticação
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.message = req.session.message || null;
  next();
});

// Middleware para rotas protegidas
function requireAuth(req, res, next) {
  if (req.session.usuario) {
    return next();
  } else {
    res.redirect('/login');
  }
}

/*carregar tabelas
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Banco sincronizado");
  } catch (error) {
    console.log(error);
  }
})();
*/

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
const inicioRoutes = require('./src/routes/inicio');
app.use('/', inicioRoutes);

const loginRoutes = require('./src/routes/login');
app.use('/login', loginRoutes);

const logoutRoutes = require('./src/routes/logout');
app.use('/logout', logoutRoutes);

const formUsuarioRoutes = require('./src/routes/formUsuario');
app.use('/formUsuario', formUsuarioRoutes);

const buscarArtistasRouter = require('./src/routes/buscarArtistas');
app.use('/buscar/artistas', buscarArtistasRouter);

const buscarGruposRouter = require('./src/routes/buscarGrupos');
app.use('/buscar/grupos', buscarGruposRouter);

const artistasRouter = require('./src/routes/artistas');
app.use('/artistas', artistasRouter);
app.use('/artista', artistasRouter);

const buscarMusicasRouter = require('./src/routes/buscarMusicas');
app.use('/buscar/musicas', buscarMusicasRouter);

const musicasRouter = require('./src/routes/musicas');
app.use('/musicas', musicasRouter);

const criarCifraRoutes = require('./src/routes/criarCifra');
app.use('/cifras/criar', criarCifraRoutes);

const enviarMensagemRoutes = require('./src/routes/enviarMensagem');
app.use('/mensagens/enviar', enviarMensagemRoutes);

const cifrasRouter = require('./src/routes/cifras');
app.use('/cifras', cifrasRouter);

const comunidadeRouter = require('./src/routes/comunidade');
app.use('/comunidade', comunidadeRouter);

const cursosRouter = require('./src/routes/curso');
app.use('/cursos', cursosRouter);

const enviarCursoRouter = require('./src/routes/enviarCurso');
app.use('/enviarCurso', enviarCursoRouter);

const buscarAcordesRouter = require('./src/routes/buscarAcordes');
app.use('/buscar/acordes', buscarAcordesRouter);

const selecionarMusicaRoutes = require('./src/routes/selecionarMusica');
app.use('/selecionar/musica', selecionarMusicaRoutes);

const historicoRoutes = require('./src/routes/historico');
app.use('/historico', historicoRoutes);

const gruposRouter = require('./src/routes/grupos');
app.use('/grupos', gruposRouter);


// Exemplo de rotas para demonstrar sessões
app.get('/set-session', (req, res) => {
    // Criando uma variável de sessão
    req.session.exemplo = 'Olá, esta é uma variável de sessão!';
    req.session.numero = 42;
    res.send('Variável de sessão criada! Vá para /get-session para ver.');
});

app.get('/get-session', (req, res) => {
    // Acessando variáveis de sessão
    const exemplo = req.session.exemplo || 'Nenhuma variável definida';
    const numero = req.session.numero || 'Nenhum número';
    res.send(`Exemplo: ${exemplo}<br>Número: ${numero}`);
});

app.get('/delete-session', (req, res) => {
    // Removendo uma variável específica
    delete req.session.exemplo;
    res.send('Variável "exemplo" removida da sessão.');
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});