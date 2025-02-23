function changeTab(tabName) {
    var tabs = document.querySelectorAll('.tab-content');
    
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
}
// Obtém os dados do usuário do armazenamento local
const user = localStorage.getItem("user");

// Decodifica os dados do usuário
const parsedUser = JSON.parse(user);

// Exibe os dados do usuário
document.querySelector("#nome").textContent = parsedUser.nome;
document.querySelector("#carteira").textContent = parsedUser.carteira;
// Obtém os dados do gráfico do banco de dados
const dadosGrafico = fetch("api/grafico");

// Decodifica os dados do gráfico
const parsedDadosGrafico = await dadosGrafico.json();

// Renderiza o gráfico
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: parsedDadosGrafico.meses,
    datasets: [{
      label: "Variação do Patrimônio",
      data: parsedDadosGrafico.variacaoSalario,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    scales: { y: { beginAtZero: true } }
  }
});
function toggleForm(formId) {
  var form = document.getElementById('adicionar-' + formId);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
var button = document.querySelector(".b1");
var select = document.querySelector(".b2");
button.onclick = function () {
  select.style.display = "block";
}
var overlay = document.getElementById("overlay");
var modal = document.getElementById("modal");
var open = document.querySelector(".b1");
var close = document.getElementById("close");
var ok = document.getElementById("ok");

open.onclick = function () {
  overlay.style.display = "block";
}

close.onclick = function () {
  overlay.style.display = "none";
}

ok.onclick = function () {
  overlay.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == overlay) {
      overlay.style.display = "none";
  }
}
var alterar = document.querySelector("#alt");
var excluir = document.querySelector("#exc");

alterar.addEventListener("click", function () {
  // Escreva aqui o código que você quer que seja executado quando o botão de alterar for clicado
  alert("Você clicou no botão de alterar");
});

excluir.addEventListener("click", function () {
  // Escreva aqui o código que você quer que seja executado quando o botão de excluir for clicado
  alert("Você clicou no botão de excluir");
});
// Seleciona todos os elementos com a classe b1
var botoes = document.getElementsByClassName("b1");
// Percorre cada elemento
for (var i = 0; i < botoes.length; i++) {
  // Adiciona um listener de evento de clique
  botoes[i].addEventListener("click", function () {
      // Escreva aqui o código que você quer que seja executado quando o botão for clicado
      alert("Você clicou no botão " + this.innerHTML);
  });
}
if (document.querySelector('body').offsetHeight > window.innerHeight)
document.querySelector('footer').classList.add('footer-relative');
