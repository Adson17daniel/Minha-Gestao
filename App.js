// DOM
const btnMenu = document.getElementById("btn-menu");
const sidebar = document.getElementById("sidebar");
const secaoGastos = document.getElementById("gestao-gastos");
const secaoLanc = document.getElementById("lancamentos");
const telaInicial = document.getElementById("tela-inicial");

const form = document.getElementById("form-gastos");
const listaReceitas = document.getElementById("lista-receitas");
const listaDespesas = document.getElementById("lista-despesas");
const saldoInicial = document.getElementById("saldo-inicial");
const saldoAtual = document.getElementById("saldo-atual");

const filtroConta = document.getElementById("filtro-conta");
const filtroMes = document.getElementById("filtro-mes");

let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

// Navegação
btnMenu.onclick = () => sidebar.classList.toggle("-translate-x-full");
document.querySelectorAll("[data-secao]").forEach(link => {
  link.onclick = () => {
    telaInicial.classList.add("hidden");
    secaoGastos.classList.add("hidden");
    secaoLanc.classList.add("hidden");

    const alvo = link.getAttribute("data-secao");
    document.getElementById(alvo).classList.remove("hidden");
    sidebar.classList.add("-translate-x-full");
    if (alvo === "lancamentos") renderizarLancamentos();
  };
});

// Saldo
function atualizarSaldo() {
  let saldo = 0;
  lancamentos.forEach(l => {
    saldo += l.tipo === "receita" ? Number(l.valor) : -Number(l.valor);
  });
  saldoAtual.textContent = saldoInicial.textContent = saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Formulário
form.onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById("edit-id").value || Date.now().toString();
  const valor = +document.getElementById("valor").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;
  const tipo = document.querySelector("input[name='tipo']:checked")?.value;
  const conta = document.querySelector("input[name='conta']:checked")?.value;

  if (!valor || !descricao || !data || !tipo || !conta) {
    alert("Preencha todos os campos!");
    return;
  }

  const novo = { id, valor, descricao, data, tipo, conta };

  // Edita ou adiciona
  const idx = lancamentos.findIndex(l => l.id === id);
  if (idx >= 0) lancamentos[idx] = novo;
  else lancamentos.push(novo);

  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  form.reset();
  document.getElementById("edit-id").value = "";
  telaInicial.classList.add("hidden");
  secaoGastos.classList.add("hidden");
  secaoLanc.classList.remove("hidden");
  renderizarLancamentos();
};

// Renderizar
function renderizarLancamentos() {
  listaReceitas.innerHTML = "";
  listaDespesas.innerHTML = "";

  const contaFiltro = filtroConta.value;
  const mesFiltro = filtroMes.value;

  const filtrados = lancamentos.filter(l => {
    const data = new Date(l.data);
    const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
    const okConta = contaFiltro === "todos" || l.conta === contaFiltro;
    const okMes = !mesFiltro || mes === mesFiltro;
    return okConta && okMes;
  });

  filtrados.forEach(l => {
    const div = document.createElement("div");
    div.className = `p-3 rounded shadow text-sm flex justify-between items-center ${l.tipo === "receita" ? "bg-green-100" : "bg-red-100"}`;
    div.innerHTML = `
      <div>
        <strong>${l.descricao}</strong><br>
        <small>${new Date(l.data).toLocaleDateString()}</small><br>
        <span>${l.conta} - R$ ${l.valor.toFixed(2)}</span>
      </div>
      <div class="flex gap-2">
        <button onclick="editarLancamento('${l.id}')" class="text-blue-600 font-bold">✏️</button>
        <button onclick="excluirLancamento('${l.id}')" class="text-red-600 font-bold">🗑️</button>
      </div>
    `;
    if (l.tipo === "receita") listaReceitas.appendChild(div);
    else listaDespesas.appendChild(div);
  });

  atualizarSaldo();
}

window.editarLancamento = function (id) {
  const l = lancamentos.find(x => x.id === id);
  document.getElementById("edit-id").value = l.id;
  document.getElementById("valor").value = l.valor;
  document.getElementById("descricao").value = l.descricao;
  document.getElementById("data").value = l.data;
  document.querySelector(`input[name='tipo'][value='${l.tipo}']`).checked = true;
  document.querySelector(`input[name='conta'][value='${l.conta}']`).checked = true;

  telaInicial.classList.add("hidden");
  secaoLanc.classList.add("hidden");
  secaoGastos.classList.remove("hidden");
};

window.excluirLancamento = function (id) {
  if (confirm("Deseja excluir este lançamento?")) {
    lancamentos = lancamentos.filter(l => l.id !== id);
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
    renderizarLancamentos();
  }
};

// Filtros
filtroConta.onchange = renderizarLancamentos;
filtroMes.onchange = renderizarLancamentos;

// Inicializa
renderizarLancamentos();
