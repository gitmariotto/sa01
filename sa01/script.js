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
  const valorHora = parseFloat(document.getElementById("valorHora").value) || 0;

  tarefas.forEach((t, index) => {
    totalHoras += t.horas;

    const valorTarefa = t.horas * valorHora * t.urgencia;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="left-task">
        <div>
          <strong>${t.nome}</strong><br>
          <small>
            ${t.horas}h • ${getUrgenciaTexto(t.urgencia)} • 
            R$ ${valorTarefa.toFixed(2)}
          </small>
        </div>
      </div>

      <button class="delete-btn" onclick="removerTarefa(${index})">✕</button>
    `;

    lista.appendChild(li);
  });

  document.getElementById("qtd").textContent = tarefas.length;
  document.getElementById("totalHoras").textContent = totalHoras + "h totais";
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  atualizarLista();
}

function calcularTotal() {
  const valorHora = parseFloat(document.getElementById("valorHora").value) || 0;
  const nomeProjeto = document.getElementById("nomeProjeto").value || "Sem nome";

  let total = 0;
  let totalHoras = 0;

  tarefas.forEach(t => {
    totalHoras += t.horas;
    total += t.horas * valorHora * t.urgencia;
  });

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("nomeProjetoResultado").textContent = "Projeto: " + nomeProjeto;
  document.getElementById("resumo").textContent =
    `${totalHoras}h • R$ ${valorHora}/h`;
}

function getUrgenciaTexto(valor) {
  if (valor === 1.2) return "Urgente";
  if (valor === 1.5) return "Muito urgente";
  return "Sem urgência";
}
