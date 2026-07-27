function procurarMusica(str) {
    if (str.length === 0) return;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            const select = document.getElementById("selec_musicas");
            select.innerHTML = "";
            resposta.Dados.forEach(function (musica) {
                const option = document.createElement("option");
                option.textContent = musica.nome;
                option.value = musica.id;
                select.appendChild(option);
            });
        }
    };
    xmlhttp.open("GET", `/buscar/musicas?nome=${str}`, true);
    xmlhttp.send(null);
}

const busca = document.querySelector('.busca');

if (busca) {
    busca.addEventListener('focus', () => {
        if (busca.value.trim().length === 0) {
            procurarArtistaInicio("");
        }
    });
    document.addEventListener('click', (event) => {
        const lista = document.getElementById("lista_artistas");
        if (!busca.contains(event.target) && !lista.contains(event.target)) {
            lista.innerHTML = "";
        }
    });
}

async function procurarArtistaInicio(str) {
    const lista = document.getElementById("lista_artistas");
    if (str.length === 0) {
        try {
            const respostaHistorico = await fetch('/historico/artista');
            const consulta = await respostaHistorico.json();
            lista.innerHTML = "";
            consulta.Dados.forEach(function (artista) {
                const a = document.createElement("a");
                a.href = `/artistas/${artista.nome}-${artista.id}`;
                const li = document.createElement("li");
                a.textContent = artista.nome;
                li.appendChild(a);
                lista.appendChild(li);
            });
        } catch (erro) {
            console.error(erro);
        }
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            lista.innerHTML = "";

            resposta.Dados.forEach(function (artista) {
                const a = document.createElement("a");
                a.href = `/artistas/${artista.slug}-${artista.id}`;
                const li = document.createElement("li");
                a.textContent = artista.nome;
                li.appendChild(a);
                lista.appendChild(li);
            });
        }
    };
    xmlhttp.open("GET", `/buscar/artistas?nome=${str}`, true);
    xmlhttp.send(null);
}

async function procurarGrupo(str) {
    const lista = document.getElementById("lista_grupos");
    if (str.length === 0) {
        try {
            const respostaHistorico = await fetch('/historico/grupo');
            const consulta = await respostaHistorico.json();
            lista.innerHTML = "";
            consulta.Dados.forEach(function (grupo) {
                const a = document.createElement("a");
                a.href = `/grupos/${grupo.nome}-${grupo.id}`;
                const li = document.createElement("li");
                a.textContent = grupo.nome;
                li.appendChild(a);
                lista.appendChild(li);
            });
        } catch (erro) {
            console.error(erro);
        }
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            lista.innerHTML = "";

            resposta.Dados.forEach(function (grupo) {
                const a = document.createElement("a");
                a.href = `/grupos/${grupo.slug}-${grupo.id}`;
                const li = document.createElement("li");
                a.textContent = grupo.nome + " (" + grupo.membros + " membros)";
                li.appendChild(a);
                lista.appendChild(li);
            });
        }
    };
    xmlhttp.open("GET", `/buscar/grupos?nome=${str}`, true);
    xmlhttp.send(null);
}

const formMensagem = document.getElementById("formMensagem");
if (formMensagem) {
    formMensagem.addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = e.target;
        const conteudo = form.conteudo.value;
        const grupoId = form.grupoId.value;

        if (!conteudo.trim()) return;

        const response = await fetch("/mensagens/enviar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                conteudo,
                grupoId
            })
        });

        const data = await response.json();

        if (data.sucesso) {
            adicionarMensagemNaTela(data.mensagem);
            form.conteudo.value = "";
        }
    });
}

function procurarArtista() {
    const input = document.getElementById("input-artista");
    const containerCheckboxArtista = document.getElementById("container-checkbox-artista");
    if (!input) return;
    const str = input.value.trim();
    const select = document.getElementById("selec_artistas");

    if (str.length === 0) {
        if (select) select.innerHTML = "";
        if (containerCheckboxArtista) containerCheckboxArtista.classList.add("d-none");
        return;
    }

    if (containerCheckboxArtista) {
        containerCheckboxArtista.classList.remove("d-none");
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            if (!select) return;
            select.innerHTML = "";

            resposta.Dados.forEach(function (artista) {
                const option = document.createElement("option");
                option.textContent = artista.nome;
                option.value = artista.id;
                select.appendChild(option);
            });

            const checkboxInput = containerCheckboxArtista.querySelector(".form-check-input");
            const checkboxLabel = containerCheckboxArtista.querySelector(".form-check-label");

            if (resposta.Dados.length === 0) {
                checkboxInput.checked = true;
                checkboxInput.style.pointerEvents = "none";
                checkboxInput.dispatchEvent(new Event('change'));
            } else {
                checkboxInput.checked = false;
                checkboxInput.style.pointerEvents = "auto";
                checkboxInput.dispatchEvent(new Event('change'));
            }

            if (checkboxLabel) {
                checkboxLabel.textContent = "Criar artista: " + resposta.nomeArtista;
            }
            if (checkboxInput) {
                checkboxInput.value = "novo|" + resposta.nomeArtista;
            }

            if (select.options.length > 0) {
                select.selectedIndex = 0;
            }
        }
    };

    xmlhttp.open("GET", `/buscar/artistas?nome=${encodeURIComponent(str)}`, true);
    xmlhttp.send(null);
}

document.addEventListener("DOMContentLoaded", function () {
    const inputArtista = document.getElementById("input-artista");
    const containerCheckboxArtista = document.getElementById("container-checkbox-artista");

    if (inputArtista && containerCheckboxArtista) {
        inputArtista.addEventListener('input', function () {
            if (inputArtista.value.trim() !== "") {
                containerCheckboxArtista.classList.remove("d-none");
            } else {
                containerCheckboxArtista.classList.add("d-none");
            }
        });
    }
});


function procurarMusicaPorArtista() {
    const input = document.getElementById("input-musica");
    const containerCheckboxMusica = document.getElementById("container-checkbox-musica");
    if (!input) return;
    const str = input.value.trim();
    const select = document.getElementById("selec_musicas");

    if (str.length === 0) {
        if (select) select.innerHTML = "";
        if (containerCheckboxMusica) containerCheckboxMusica.classList.add("d-none");
        return;
    }

    if (containerCheckboxMusica) {
        containerCheckboxMusica.classList.remove("d-none");
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            if (!select) return;
            select.innerHTML = "";

            resposta.Dados.forEach(function (musica) {
                const option = document.createElement("option");
                option.textContent = musica.nome;
                option.value = musica.id;
                select.appendChild(option);
            });

            const checkboxInput = containerCheckboxMusica.querySelector(".form-check-input");
            const checkboxLabel = containerCheckboxMusica.querySelector(".form-check-label");

            if (resposta.Dados.length === 0) {
                checkboxInput.checked = true;
                checkboxInput.style.pointerEvents = "none";
            } else {
                checkboxInput.checked = false;
                checkboxInput.style.pointerEvents = "auto";
            }

            if (checkboxLabel) {
                checkboxLabel.textContent = "Criar musica: " + resposta.nomeMusica;
            }
            if (checkboxInput) {
                checkboxInput.value = "novo|" + resposta.nomeMusica;
            }

            if (select.options.length > 0) {
                select.selectedIndex = 0;
            }
        }
    };

    xmlhttp.open("GET", `/buscar/musicas?nome=${encodeURIComponent(str)}`, true);
    xmlhttp.send(null);
}

document.addEventListener("DOMContentLoaded", function () {
    const inputmusic = document.getElementById("input-musica");
    const containerCheckboxMusica = document.getElementById("container-checkbox-musica");

    if (inputmusic && containerCheckboxMusica) {
        inputmusic.addEventListener('input', function () {
            if (inputmusic.value.trim() !== "") {
                containerCheckboxMusica.classList.remove("d-none");
            } else {
                containerCheckboxMusica.classList.add("d-none");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const inputArtista = document.getElementById("input-artista");
    const inputMusica = document.getElementById("input-musica");
    const selectArtistas = document.getElementById("selec_artistas");
    if (inputArtista) {
        inputArtista.addEventListener("input", procurarArtista);
    }
    if (inputMusica) {
        inputMusica.addEventListener("input", procurarMusicaPorArtista);
    }
    if (selectArtistas) {
        selectArtistas.addEventListener("change", procurarMusicaPorArtista);
    }
});
