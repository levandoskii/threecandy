// Salvar dados do login e ir para a home
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const sobrenome = document.getElementById("sobrenome").value;
      const turma = document.getElementById("turma").value;
      const tipoEntrega = document.getElementById("tipoEntrega").value;

      localStorage.setItem("nomeCompleto", `${nome} ${sobrenome}`);
      localStorage.setItem("turma", turma);
      localStorage.setItem("tipoEntrega", tipoEntrega);

      window.location.href = "home.html";
    });
  }

  // Catálogo: adicionar itens
  const produtos = document.querySelectorAll(".produto");
  const carrinho = [];

  produtos.forEach(prod => {
    let quantidadeEl = prod.querySelector(".quantidade");
    let quantidade = 0;

    prod.querySelector(".mais").addEventListener("click", () => {
      quantidade++;
      quantidadeEl.textContent = quantidade;
    });

    prod.querySelector(".menos").addEventListener("click", () => {
      if (quantidade > 0) {
        quantidade--;
        quantidadeEl.textContent = quantidade;
      }
    });

    prod.querySelector(".adicionar").addEventListener("click", () => {
      const nome = prod.getAttribute("data-produto");
      if (quantidade > 0) {
        carrinho.push({ nome, quantidade });
        renderCarrinho();
        quantidade = 0;
        quantidadeEl.textContent = 0;
      }
    });
  });

  function renderCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const totalEl = document.getElementById("total");
    if (!lista || !totalEl) return;

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.quantidade} unid.`;
      lista.appendChild(li);

      total += item.quantidade * 2; // Ex: R$2,00 por unidade (ajuste se quiser)
    });

    totalEl.textContent = total.toFixed(2);
  }

  const finalizar = document.getElementById("finalizarPedido");
  if (finalizar) {
    finalizar.addEventListener("click", () => {
      const nome = localStorage.getItem("nomeCompleto") || "";
      const turma = localStorage.getItem("turma") || "";
      const entrega = localStorage.getItem("tipoEntrega") || "";

      let msg = `Olá! Quero fazer um pedido:\n\n`;

      carrinho.forEach(item => {
        msg += `• ${item.nome}: ${item.quantidade} unid\n`;
      });

      const total = carrinho.reduce((acc, cur) => acc + cur.quantidade * 2, 0);
      msg += `\nTotal: R$ ${total.toFixed(2)}`;
      msg += `\nNome: ${nome}\nTurma: ${turma}\nTipo de entrega: ${entrega}`;

      const url = `https://wa.me/5541996597922?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    });
  }
});
