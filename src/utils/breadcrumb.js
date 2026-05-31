const { slugify } = require('./slugify');

function artistaBreadcrumb(artista) {

    return [
        {
            nome: 'Início',
            link: '/'
        },
        {
            nome: artista.nome,
            link: `/artistas/${slugify(artista.nome)}-${artista.id}`
        }
    ];
}

function musicaBreadcrumb(artista, musica) {
    return [
        {
            nome: 'Início',
            link: '/'
        },
        {
            nome: artista.nome,
            link: `/artistas/${slugify(artista.nome)}-${artista.id}`
        },
        {
            nome: musica.nome,
            link: `/musicas/${slugify(artista.nome)}-${artista.id}/${slugify(musica.nome)}-${musica.id}`
        }
    ];

}

function cifraBreadcrumb(cifra) {
    const musica = cifra.Musica;
    const artista = musica.Artista;

    return [
        {
            nome: 'Início',
            link: '/'
        },
        {
            nome: artista.nome,
            link: `/artistas/${slugify(artista.nome)}-${artista.id}`
        },
        {
            nome: musica.nome,
            link: `/musicas/${slugify(artista.nome)}-${artista.id}/${slugify(musica.nome)}-${musica.id}`
        },
        {
            nome: 'Cifra',
            link: null
        }
    ];

}

function cursoBreadcrumb(curso) {
    return [
        {
            nome: 'Início',
            link: '/'
        },
        {
            nome: 'Cursos',
            link: '/cursos'
        },
        {
            nome: curso.nome,
            link: null
        }
    ];

}

module.exports = {
    artistaBreadcrumb,
    musicaBreadcrumb,
    cifraBreadcrumb,
    cursoBreadcrumb
};