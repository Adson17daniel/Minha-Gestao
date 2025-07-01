<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Minha Gestão</title>
  <script defer src="./app.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(135deg, #E10600, #000000);
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  </style>
</head>
<body class="text-gray-900 p-4">

  <!-- Botão menu -->
  <button id="btn-menu" class="fixed top-4 left-4 z-50 bg-red-700 text-white p-3 rounded shadow">
    ☰ Menu
  </button>

  <!-- Sidebar -->
  <div id="sidebar" class="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-red-800 to-black text-white p-6 transform -translate-x-full transition duration-300 z-40">
    <h2 class="text-2xl font-bold mb-6">Menu</h2>
    <nav class="space-y-4">
      <a href="#" data-secao="gestao-gastos" class="hover:text-red-300 block">Gestão de Gastos</a>
      <a href="#" data-secao="lancamentos" class="hover:text-red-300 block">Lançamentos</a>
    </nav>
  </div>

  <!-- Tela inicial -->
  <div id="tela-inicial" class="text-white text-center mt-24">
    <h1 class="text-4xl font-extrabold">Saldo Atual:</h1>
    <div id="saldo-inicial" class="text-6xl font-bold mt-4">R$ 0,00</div>
    <p class="mt-4 opacity-80">Use o menu para navegar</p>
  </div>

  <!-- Gestão de Gastos -->
  <section id="gestao-gastos" class="hidden bg-white rounded p-6 max-w-xl mx-auto mt-12 shadow">
    <h2 class="text-2xl font-bold mb-4">Novo Lançamento</h2>
    <form id="form-gastos" class="space-y-4">
      <input type="hidden" id="edit-id" />

      <input type="number" id="valor" placeholder="Valor" class="w-full border p-3 rounded" required />
      <input type="text" id="descricao" placeholder="Descrição" class="w-full border p-3 rounded" required />
      <input type="date" id="data" class="w-full border p-3 rounded" required />

      <div class="flex gap-4">
        <label><input type="radio" name="tipo" value="receita" required /> Receita</label>
        <label><input type="radio" name="tipo" value="despesa" /> Despesa</label>
      </div>

      <div class="flex gap-4">
        <label><input type="radio" name="conta" value="conta" required /> Conta</label>
        <label><input type="radio" name="conta" value="nubank" /> Nubank</label>
        <label><input type="radio" name="conta" value="hipercard" /> Hipercard</label>
      </div>

      <button type="submit" class="w-full bg-red-700 text-white p-3 rounded font-bold hover:bg-red-800">Salvar</button>
    </form>
  </section>

  <!-- Lançamentos -->
  <section id="lancamentos" class="hidden bg-white rounded p-6 max-w-6xl mx-auto mt-12 shadow">
    <h2 class="text-2xl font-bold mb-4">Lançamentos</h2>

    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <select id="filtro-conta" class="border p-2 rounded">
        <option value="todos">Todas as contas</option>
        <option value="conta">Conta</option>
        <option value="nubank">Nubank</option>
        <option value="hipercard">Hipercard</option>
      </select>

      <input type="month" id="filtro-mes" class="border p-2 rounded" />
    </div>

    <div class="text-xl font-bold mb-4">Saldo: <span id="saldo-atual">R$ 0,00</span></div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold mb-2">Receitas</h3>
        <div id="lista-receitas" class="space-y-2"></div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Despesas</h3>
        <div id="lista-despesas" class="space-y-2"></div>
      </div>
    </div>
  </section>

</body>
</html>
