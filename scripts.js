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