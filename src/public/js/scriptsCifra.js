const notas = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
let listaAtual = [];
let indiceAtual = 0;
let nomeAcordeAtual = "";

let box;

window.onload = function () {
    var Cifra = document.getElementsByClassName("cifra")[0];
    var textoOriginal = Cifra.innerHTML;
    var regex = /\$([^$]+)\$/g;

    var novoTexto = textoOriginal.replace(regex, function (match, acorde) {
        return '<b class="acorde">' + acorde + '</b>';
    });

    Cifra.innerHTML = novoTexto;

    box = document.getElementById("acordeBox");
    let acordes = document.getElementsByClassName("acorde");

    for (let el of acordes) {
        el.addEventListener("mouseover", async function (e) {
            clearTimeout(timerSair);
            let acordeNome = el.innerText;
            box.style.display = "block";
            box.innerHTML = "";
            moverBox(e);

            try {
                const response = await fetch(`/buscar/acordes?nome=${encodeURIComponent(acordeNome)}`);
                const data = await response.json();
                if (data.listasDeNotas && data.listasDeNotas.length > 0) {
                    listaAtual = data.listasDeNotas;
                    indiceAtual = 0;
                    nomeAcordeAtual = acordeNome;
                    atualizarExibicaoBox()
                } else {
                    box.innerHTML = "Acorde não cadastrado.";
                }
            } catch (err) {
                box.innerHTML = "Erro ao carregar acorde.";
            }
        });
        let timerSair;

        el.addEventListener("mouseout", function () {
            timerSair = setTimeout(() => {
                box.style.display = "none";
            }, 200);
        });

        box.addEventListener("mouseover", function () {
            clearTimeout(timerSair);
        });
        box.addEventListener("mouseleave", function () {
            box.style.display = "none";
        });
    }
};

function desenharTabelaHTML(notasAcorde) {
    if (typeof notasAcorde === "string") {
        notasAcorde = notasAcorde.split("-");
    }

    notasAcorde = notasAcorde.map(n => String(n).trim());

    while (notasAcorde.length < 6) {
        notasAcorde.push("x");
    }

    notasAcorde = notasAcorde.slice(0, 6);

    const casasPressionadas = [];

    for (let i = 0; i < notasAcorde.length; i++) {
        let n = Number(notasAcorde[i]);
        if (!isNaN(n) && n > 0) {
            casasPressionadas.push(n);
        }
    }

    let limite = 1;

    if (casasPressionadas.length > 0) {
        let menor = Math.min(...casasPressionadas);

        if (menor >= 3) {
            limite = menor;
        }
    }

    let html = `<table id="braco">`;

    html += `<tr class="status-cordas"><td></td>`;
    for (let i = 0; i < 6; i++) {
        let nota = notasAcorde[i];
        let simbolo = "";

        if (nota === "x") simbolo = "×";
        else if (nota === "0") simbolo = "○";

        html += `<td class="status-celula">${simbolo}</td>`;
    }
    html += `</tr>`;

    for (let traste = limite; traste < limite + 5; traste++) {
        html += `<tr class="traste">`;

        if (traste === limite && limite !== 1) {
            html += `<td class="numero-casa">${limite}ª</td>`;
        } else {
            html += `<td class="numero-casa"></td>`;
        }

        for (let i = 0; i < 6; i++) {
            let marcador = "";

            if (Number(notasAcorde[i]) === traste) {
                marcador = '<span class="marcador"></span>';
            }

            html += `<td class="casa-viola">${marcador}</td>`;
        }

        html += `</tr>`;
    }

    html += `</table>`;

    return html;
}

function atualizarExibicaoBox() {
    let html = `<strong>Acorde: ${nomeAcordeAtual} (${indiceAtual + 1}/${listaAtual.length})</strong><br>`;

    html += desenharTabelaHTML(listaAtual[indiceAtual]);

    if (listaAtual.length > 1) {
        html += '<div class="controles">';
        html += '<button onclick="voltarAcorde(event)"> < </button>';
        html += '<button onclick="avancarAcorde(event)"> > </button>';
        html += '</div>';
    }

    box.innerHTML = html;
}
window.avancarAcorde = function (e) {
    e.stopPropagation();
    indiceAtual = (indiceAtual + 1) % listaAtual.length;
    atualizarExibicaoBox();
};

window.voltarAcorde = function (e) {
    e.stopPropagation();
    indiceAtual = (indiceAtual - 1 + listaAtual.length) % listaAtual.length;
    atualizarExibicaoBox();
};

function moverBox(e) {
    box.style.top = (e.clientY + 15) + "px";
    box.style.left = (e.clientX + 15) + "px";
}

function extrairBase(tom) {
    const match = tom.match(/^([A-G]#?)/);
    return match ? match[1] : null;
}

function alterarTom() {
    let acordesDom = document.getElementsByClassName("acorde");

    var tomOriginal = document.getElementById("tomOriginal").value;
    var tomFinal = document.getElementById("selectTom").value;

    let baseOriginal = extrairBase(tomOriginal);
    let baseFinal = extrairBase(tomFinal);

    let indexOriginal = notas.indexOf(baseOriginal);
    let indexFinal = notas.indexOf(baseFinal);

    let diferenca = indexFinal - indexOriginal;

    for (var i = 0; i < acordesDom.length; i++) {
        let acordeAtual = acordesDom[i].innerText;
        let novoAcorde = transporBase(acordeAtual, diferenca);
        if (novoAcorde) {
            acordesDom[i].innerText = novoAcorde;
        }
    }
    document.getElementById("tomOriginal").value = tomFinal;
}


function separarAcorde(acorde) {
    const match = acorde.match(/^([A-G]#?)(.*)$/);

    if (!match) return null;

    return {
        base: match[1],
        resto: match[2]
    };
}

function transpor(acorde, diferenca) {
    let partes = separarAcorde(acorde);
    if (!partes) return null;

    let base = partes.base;
    let resto = partes.resto;

    let indexAcorde = notas.indexOf(base);
    let novoIndex = (indexAcorde + diferenca + 12) % 12;
    let novaBase = notas[novoIndex];

    return novaBase + resto;
}

function transporBase(acorde, diferenca) {
    if (acorde.includes("/")) {
        let partes = acorde.split("/");
        let principal = transpor(partes[0], diferenca);
        let baixo = transpor(partes[1], diferenca);

        return principal + "/" + baixo;
    }

    return transpor(acorde, diferenca);
}