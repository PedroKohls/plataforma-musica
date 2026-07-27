let contadorPaginas = 2;

function openTab(evt, tabId) {
  document
    .querySelectorAll(".pagina")
    .forEach((p) => p.classList.remove("show"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));

  const paginaAlvo = document.getElementById(tabId);

  if (paginaAlvo) {
    paginaAlvo.classList.add("show");
  }

  if (evt) {
    evt.currentTarget.classList.add("active");
  } else {
    const botoes = document.querySelectorAll(".tab-btn");

    if (botoes.length > 0) {
      botoes[botoes.length - 1].classList.add("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".editor-conteudo");

  if (!form) return;

  form.addEventListener("submit", () => {
    document.querySelectorAll(".pagina").forEach((pagina) => {
      const containerCampos = pagina.querySelector(".campos-container");
      let blocos = [];

      containerCampos.querySelectorAll(".mb-2").forEach((wrapper) => {
        const tipo = wrapper.querySelector("input[type='hidden']")?.value;
        const input = wrapper.querySelector("input[type='text'], textarea");

        if (!tipo) return;

        // texto simples
        if (tipo === "subtitulo" || tipo === "paragrafo") {
          const valor = input?.value?.trim();
          if (!valor) return;

          blocos.push({
            tipo: tipo,
            valor: valor,
          });
        }

        // arquivos (apenas referência, ainda não tratado)
        if (tipo === "imagem" || tipo === "arquivo") {
          const fileInput = wrapper.querySelector("input[type='file']");
          if (!fileInput || !fileInput.files.length) return;

          blocos.push({
            tipo: tipo,
            valor: fileInput.files[0].name,
          });
        }
      });

      const inputHidden = pagina.querySelector(".input-conteudo-html");

      if (inputHidden) {
        inputHidden.value = JSON.stringify(blocos);
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

        <input type="hidden" name="paginas[${num}][conteudo]" class="input-conteudo-html">

        <div class="campos-container" id="campos-pagina-${num}"></div>

        <div class="menu-adicionar-campo mt-3">
            <select id="tipo-campo-${num}" class="form-select d-inline-block w-auto me-2">
                <option value="subtitulo">Subtítulo</option>
                <option value="paragrafo">Parágrafo</option>
                <option value="imagem">Link de Imagem</option>
                <option value="arquivo">Arquivo</option>
            </select>

            <button type="button" class="btn btn-secondary btn-sm"
                onclick="adicionarCampo(${num})">
                + Adicionar Campo
            </button>
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

  wrapperDiv.classList.add(
    "mb-2",
    "p-2",
    "border",
    "rounded",
    "d-flex",
    "align-items-center",
    "gap-2",
  );

  let inputHtml = `
        <input type="hidden"
            name="paginas[${numeroPagina}][campos][][tipo]"
            value="${tipo}">
    `;

  if (tipo === "imagem") {
    inputHtml += `
            <input type="file"
                class="form-control"
                name="arquivos_paginas"
                accept="image/*">
        `;
  }

  if (tipo === "arquivo") {
    inputHtml += `
            <input type="file"
                class="form-control"
                name="arquivos_paginas"
                accept=".pdf">
        `;
  }

  if (tipo === "subtitulo") {
    inputHtml += `
            <input type="text"
                class="form-control flex-grow-1"
                placeholder="Subtítulo">
        `;
  }

  if (tipo === "paragrafo") {
    inputHtml += `
            <textarea
                class="form-control flex-grow-1"
                placeholder="Parágrafo"
                rows="2"></textarea>
        `;
  }

  wrapperDiv.innerHTML = `
        ${inputHtml}

        <button type="button"
            class="btn btn-danger btn-sm"
            onclick="this.parentElement.remove()">
            &times;
        </button>
    `;

  container.appendChild(wrapperDiv);
}
