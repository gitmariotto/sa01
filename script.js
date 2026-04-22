let tarefas = [];

function adicionarTarefa() {
  const nomeInput = document.getElementById("nomeTarefa");
  const horasInput = document.getElementById("horasTarefa");

  const nome = nomeInput.value.trim();
  const horas = parseFloat(horasInput.value);
  const urgencia = parseFloat(document.getElementById("urgencia").value);

  if (!nome || isNaN(horas) || horas <= 0) return;

  tarefas.push({ nome, horas, urgencia });
  atualizarLista();

  nomeInput.value = "";
  horasInput.value = "";
}

function atualizarLista() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  let totalHoras = 0;

  tarefas.forEach((t, index) => {
    totalHoras += t.horas;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="left-task">
        <div>
          <strong>${t.nome}</strong><br>
          <small>${t.horas}h • ${getUrgenciaTexto(t.urgencia)}</small>
        </div>
      </div>

      <button class="delete-btn" onclick="removerTarefa(${index})">✕</button>
    `;

    lista.appendChild(li);
  });

  document.getElementById("qtd").textContent = tarefas.length;
  document.getElementById("totalHoras").textContent = totalHoras + "h totais";

  calcularTotal(); 
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  atualizarLista();
}


function calcularTotal() {
  const valorHora = parseFloat(document.getElementById("valorHora").value) || 0;

  let total = 0;

  tarefas.forEach(t => {
    total += t.horas * valorHora * t.urgencia;
  });

  document.getElementById("total").textContent = total.toFixed(2);
}

function getUrgenciaTexto(valor) {
  if (valor === 1.2) return "Urgente";
  if (valor === 1.5) return "Muito urgente";
  return "Sem urgência";
}
