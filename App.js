const lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

function mostrarSecao(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.getElementById("tela-inicial").classList.add("hidden");
}

document.getElementById("btn-menu").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
});

document.querySelectorAll("[data-secao]").forEach(link => {
  link.addEventListener("click", e => {
    const secao = e.target.getAttribute("data-secao");
    mostrarSecao(secao);
    if (secao === "lancamentos") {
      renderizarLancamentos();
    }
  });
});

document.getElementById("btn-pagina-inicial-gastos").onclick = () => mostrarSecao("tela-inicial");
document.getElementById("btn-pagina-inicial-lanc").onclick = () => mostrarSecao("tela-inicial");
document.getElementById("btn-pagina-inicial-cargas").onclick = () => mostrarSecao("tela-inicial");
document.getElementById("btn-pagina-inicial-horas").onclick = () => mostrarSecao("tela-inicial");

document.getElementById("form-gastos").addEventListener("submit", e => {
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.querySelector("input[name='tipo']:checked").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;
  const conta = document.querySelector("input[name='conta']:checked").value;

  lancamentos.push({ valor, tipo, descricao, data, conta });
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  alert("Lançamento salvo!");
  e.target.reset();
});

const filtroMes = document.getElementById("filtro-mes");
const filtroConta = document.getElementById("filtro-conta");

function renderizarLancamentos() {
  const receitasEl = document.getElementById("lista-receitas");
  const despesasEl = document.getElementById("lista-despesas");
  receitasEl.innerHTML = "";
  despesasEl.innerHTML = "";

  let saldo = 0;

  const mesSelecionado = filtroMes.value; // exemplo: 2025-07
  const contaSelecionada = filtroConta.value;

  lancamentos.forEach(l => {
    const data = new Date(l.data);
    const dataMes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
    const condicaoMes = !mesSelecionado || dataMes === mesSelecionado;
    const condicaoConta = contaSelecionada === "todos" || l.conta === contaSelecionada;

    if (condicaoMes && condicaoConta) {
      const div = document.createElement("div");
      div.className = "p-4 bg-gray-100 rounded shadow";
      div.innerHTML = `
        <strong>${l.descricao}</strong><br>
        Valor: R$ ${l.valor.toFixed(2)}<br>
        Data: ${l.data}<br>
        Conta: ${l.conta}
      `;
      if (l.tipo === "receita") {
        receitasEl.appendChild(div);
        saldo += l.valor;
      } else {
        despesasEl.appendChild(div);
        saldo -= l.valor;
      }
    }
  });

  document.getElementById("saldo-atual").textContent = saldo.toFixed(2);
  document.getElementById("saldo-inicial").textContent = saldo.toFixed(2);
}

filtroMes.addEventListener("input", renderizarLancamentos);
filtroConta.addEventListener("change", renderizarLancamentos);
