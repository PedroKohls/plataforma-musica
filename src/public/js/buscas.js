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
                a.textContent = grupo.nome;
                li.appendChild(a);
                lista.appendChild(li);
            });
        }
    };
    xmlhttp.open("GET", `/buscar/grupos?nome=${str}`, true);
    xmlhttp.send(null);
}


document.getElementById("formMensagem").addEventListener("submit", async function (e) {
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

function procurarArtista() {
    const input = document.getElementById("input-artista");
    if (!input) return;
    const str = input.value.trim();
    const select = document.getElementById("selec_artistas");
    if (str.length === 0) {
        if (select) select.innerHTML = "";
        return;
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
            const option = document.createElement("option");
            option.textContent = "Criar artista " + resposta.nomeArtista;
            option.value = "novo|" + resposta.nomeArtista;
            select.appendChild(option);

            if (select.options.length > 0) {
                select.selectedIndex = 0;
            }
        }

    };

    xmlhttp.open("GET", `/buscar/artistas?nome=${encodeURIComponent(str)}`, true);
    xmlhttp.send(null);
}

function procurarMusicaPorArtista() {
    const input = document.getElementById("input-musica");
    if (!input) return;

    const str = input.value.trim();
    if (str.length === 0) return;

    const artistaSelect = document.getElementById("selec_artistas");
    const artistaId = artistaSelect ? artistaSelect.value : "";
    if (!artistaId) return;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const resposta = JSON.parse(xmlhttp.responseText);
            const select = document.getElementById("selec_musicas");
            if (!select) return;
            select.innerHTML = ""
                ;
            resposta.Dados.forEach(function (musica) {
                const option = document.createElement("option");
                option.textContent = musica.nome;
                option.value = musica.id;
                select.appendChild(option);
            });

            const option = document.createElement("option");
            option.textContent = "Criar musica " + resposta.nomeMusica;
            option.value = "novo|" + resposta.nomeMusica;
            select.appendChild(option);

            if (select.options.length > 0) {
                select.selectedIndex = 0;
            }
        }
    };

    xmlhttp.open("GET", `/buscar/musicas?nome=${encodeURIComponent(str)}&artistaId=${encodeURIComponent(artistaId)}`, true);
    xmlhttp.send(null);
}

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

let contadorPaginas = 2;

function openTab(evt, tabId) {
    document.querySelectorAll(".pagina").forEach(p => p.classList.remove("show"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    const paginaAlvo = document.getElementById(tabId);
    if (paginaAlvo) paginaAlvo.classList.add("show");
    if (evt) {
        evt.currentTarget.classList.add("active");
    } else {
        const botoes = document.querySelectorAll(".tab-btn");
        if (botoes.length > 0) {
            botoes[botoes.length - 1].classList.add("active");
        }
    }
}

// Adicione este bloco para rodar quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".editor-conteudo");

    form.addEventListener("submit", (e) => {
        // Varre todas as páginas criadas no editor
        document.querySelectorAll(".pagina").forEach(pagina => {
            const paginaId = pagina.id; // Ex: "pagina-1"
            const containerCampos = pagina.querySelector(".campos-container");
            let htmlGerado = "";

            // Varre cada campo inserido dentro desta página específica
            containerCampos.querySelectorAll(".mb-2").forEach(wrapper => {
                const input = wrapper.querySelector("input[type='text'], textarea");

                if (input) {
                    const valor = input.value.trim();
                    if (!valor) return; // Pula campos vazios

                    // Identifica o tipo com base no placeholder ou classe para gerar a tag HTML
                    if (input.placeholder === "Subtítulo") {
                        htmlGerado += `<h3 class="curso-subtitulo">${valor}</h3>\n`;
                    } else if (input.placeholder === "Parágrafo") {
                        htmlGerado += `<p class="curso-paragrafo">${valor}</p>\n`;
                    }
                }

                // Nota: Upload de arquivos físicos (imagens/PDFs) direto para String HTML 
                // não funciona nativamente via hidden. Eles precisam ir como arquivos normais.
            });

            // Injeta o HTML gerado no input hidden correspondente desta página
            const inputHidden = pagina.querySelector(".input-conteudo-html");
            if (inputHidden) {
                inputHidden.value = htmlGerado;
            }
        });
    });
});

function criarPagina() {
    const num = contadorPaginas;
    const sidebar = document.querySelector(".sidebar");
    const btnAdicionar = document.getElementById("adicionar");
    const containerPaginas = document.querySelector(".paginas");
    const aba = document.createElement("button");

    aba.type = "button";
    aba.classList.add("tab-btn");
    aba.textContent = `Página ${num}`;
    aba.onclick = (e) => openTab(e, `pagina-${num}`);

    sidebar.insertBefore(aba, btnAdicionar);
    const novaPagina = document.createElement("div");

    novaPagina.classList.add("pagina");
    novaPagina.id = `pagina-${num}`;
    novaPagina.innerHTML = `
        <input type="text" name="paginas[${num}][titulo]" placeholder="Título Principal da Página">
        
        <!-- O INPUT HIDDEN FICA AQUI DENTRO, UM POR PÁGINA -->
        <input type="hidden" name="paginas[${num}][conteudo]" class="input-conteudo-html">
        
        <div class="campos-container" id="campos-pagina-${num}"></div>

        <div class="menu-adicionar-campo mt-3">
            <select id="tipo-campo-${num}" class="form-select d-inline-block w-auto me-2">
                <option value="subtitulo">Subtítulo</option>
                <option value="paragrafo">Parágrafo</option>
            </select>
            <button type="button" class="btn btn-secondary btn-sm" onclick="adicionarCampo(${num})">+ Adicionar Campo</button>
        </div>
    `;

    containerPaginas.appendChild(novaPagina);
    openTab(null, `pagina-${num}`);
    contadorPaginas++;
}

function adicionarCampo(numeroPagina) {
    const tipo = document.getElementById(`tipo-campo-${numeroPagina}`).value;
    const container = document.getElementById(`campos-pagina-${numeroPagina}`);

    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("mb-2", "p-2", "border", "rounded", "d-flex", "align-items-center", "gap-2");

    // Input hidden que diz ao backend qual é o tipo deste elemento específico na ordem atual
    let inputHtml = `<input type="hidden" name="paginas[${numeroPagina}][campos][][tipo]" value="${tipo}">`;

    if (tipo === "imagem") {
        inputHtml += `
            <div class="flex-grow-1">
                <label class="form-label small mb-1">Enviar Imagem:</label>
                <input type="file" class="form-control" name="arquivos_paginas" accept="image/*">
            </div>
        `;
    } else if (tipo === "arquivo") {
        inputHtml += `
            <div class="flex-grow-1">
                <label class="form-label small mb-1">Enviar PDF:</label>
                <input type="file" class="form-control" name="arquivos_paginas" accept=".pdf">
            </div>
        `;
    } else if (tipo === "subtitulo") {
        inputHtml += `<input type="text" class="form-control flex-grow-1" name="paginas[${numeroPagina}][campos][][valor]" placeholder="Subtítulo">`;
    } else if (tipo === "paragrafo") {
        inputHtml += `<textarea class="form-control flex-grow-1" name="paginas[${numeroPagina}][campos][][valor]" placeholder="Parágrafo" rows="2"></textarea>`;
    }

    wrapperDiv.innerHTML = `
        ${inputHtml}
        <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()" 
        title="Deletar campo" style="margin-top: ${tipo === 'imagem' || tipo === 'arquivo' ? '22px' : '0px'};">
            &times;
        </button>
    `;

    container.appendChild(wrapperDiv);
}

