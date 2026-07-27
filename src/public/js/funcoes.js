let idGrupoAtual = null;

function participarGrupo(grupoId) {
  idGrupoAtual = grupoId;
  const box = document.getElementById("modalConfirmacao");
  box.style.display = "block";
}

function fecharModal() {
  const box = document.getElementById("modalConfirmacao");
  box.style.display = "none";
  idGrupoAtual = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnAvatar = document.getElementById("userAvatar");
  const menuDropdown = document.getElementById("userMenu");

  if (btnAvatar && menuDropdown) {
    btnAvatar.addEventListener("click", () => {
      if (menuDropdown.style.display === "block") {
        menuDropdown.style.display = "none";
      } else {
        menuDropdown.style.display = "block";
      }
    });

    document.addEventListener("click", (evento) => {
      if (
        !btnAvatar.contains(evento.target) &&
        !menuDropdown.contains(evento.target)
      ) {
        menuDropdown.style.display = "none";
      }
    });
  }

  const btnSim = document.getElementById("btnConfirmarSim");

  if (btnSim) {
    btnSim.addEventListener("click", async () => {
      if (!idGrupoAtual) return;

      try {
        const resposta = await fetch(`/grupos/inscrever/${idGrupoAtual}`);

        if (resposta.ok) {
          alert("Inscrição realizada com sucesso!");
          fecharModal();
          window.location.reload(); 
        } else {
          alert("Erro ao se inscrever no grupo.");
        }
      } catch (erro) {
        console.error("Erro na requisição:", erro);
      }
    });
  }
});
