const movimentos = document.getElementById("moves-count");
const tempo = document.getElementById("time");
const botaoIniciar = document.getElementById("start");
const botaoParar = document.getElementById("stop");
const containerJogo = document.querySelector(".game-container");
const resultado = document.getElementById("result");
const controles = document.querySelector(".controls-container");
const barraProgresso = document.getElementById("barra-progresso");


let cartas;
let intervalo;
let primeiraCarta = false;
let segundaCarta = false;

const itens = [
  { nome: "Oogway", imagem: "assets/imagens-kung-full/Oogway.png" },
  { nome: "Goku", imagem: "assets/imagens-kung-full/TaiLung.png" },
  { nome: "Macaco", imagem: "assets/imagens-kung-full/macaco.png" },
  { nome: "Cell", imagem: "assets/dragon-ball/cell.png" },
  { nome: "Tigresa", imagem: "assets/imagens-kung-full/tigresa.png" },
  { nome: "Shifu", imagem: "assets/imagens-kung-full/shifu.png" },
  { nome: "Vegeta", imagem: "assets/dragon-ball/vegeta.png" },
  { nome: "Mestre Kame", imagem: "assets/dragon-ball/mestrekame.png" }
];

let segundos = 0, minutos = 0;
let contagemMovimentos = 0, contagemVitorias = 0;
let tempoMaximo = 60; // tempo total em segundos

const cronometro = () => {
  segundos++;
  if (segundos >= 60) {
    minutos++;
    segundos = 0;
  }
  let seg = segundos < 10 ? `0${segundos}` : segundos;
  let min = minutos < 10 ? `0${minutos}` : minutos;
  tempo.innerHTML = `<span>Tempo:</span> ${min}:${seg}`;
  atualizarBarraTempo();
};

const atualizarBarraTempo = () => {
  let tempoAtual = minutos * 60 + segundos;
  let progresso = Math.min((tempoAtual / tempoMaximo) * 100, 100);
  barraProgresso.style.width = `${progresso}%`;
};

const contarMovimentos = () => {
  contagemMovimentos++;
  movimentos.innerHTML = `<span>Movimentos:</span> ${contagemMovimentos}`;
};

const gerarAleatorio = (tamanho = 4) => {
  let tempArray = [...itens];
  let valoresCartas = [];
  tamanho = (tamanho * tamanho) / 2;
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * tempArray.length);
    valoresCartas.push(tempArray[indice]);
    tempArray.splice(indice, 1);
  }
  return valoresCartas;
};

const gerarMatriz = (valoresCartas, tamanho = 4) => {
  containerJogo.innerHTML = "";
  valoresCartas = [...valoresCartas, ...valoresCartas];
  valoresCartas.sort(() => Math.random() - 0.5);

  for (let i = 0; i < tamanho * tamanho; i++) {
    containerJogo.innerHTML += `
      <div class="card-container" data-card-value="${valoresCartas[i].nome}">
        <div class="card-before"><img id="capa" src="assets/dragon-ball/gohan-carta.jpg" alt=""></div>
        <div class="card-after">
        <img src="${valoresCartas[i].imagem}" class="image"/></div>
      </div>
    `;
  }

  containerJogo.style.gridTemplateColumns = `repeat(${tamanho}, auto)`;
  cartas = document.querySelectorAll(".card-container");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (!carta.classList.contains("matched") && !carta.classList.contains("flipped")) {
        carta.classList.add("flipped");
        if (!primeiraCarta) {
          primeiraCarta = carta;
          valorPrimeira = carta.getAttribute("data-card-value");
        } else {
          contarMovimentos();
          segundaCarta = carta;
          let valorSegunda = carta.getAttribute("data-card-value");
          if (valorPrimeira === valorSegunda) {
            primeiraCarta.classList.add("matched");
            segundaCarta.classList.add("matched");
            primeiraCarta = false;
            segundaCarta = false;
            contagemVitorias++;
            if (contagemVitorias === valoresCartas.length / 2) {
              setTimeout(() => {
                resultado.innerHTML = `<h2 class="subtitulo">Parabéns você Venceu 👏🥳 </h2><h4 class="subtitulo">Foram ${contagemMovimentos} Movimentos</h4>`;
                pararJogo();
              }, 500);
            }
          } else {
            let [temp1, temp2] = [primeiraCarta, segundaCarta];
            primeiraCarta = false;
            segundaCarta = false;
            setTimeout(() => {
              temp1.classList.remove("flipped");
              temp2.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

botaoIniciar.addEventListener("click", () => {
  contagemMovimentos = 0;
  segundos = 0;
  minutos = 0;
  controles.classList.add("hide");
  botaoParar.classList.remove("hide");
  botaoIniciar.classList.add("hide");
  intervalo = setInterval(cronometro, 1000);
  movimentos.innerHTML = `<span>Movimentos:</span> ${contagemMovimentos}`;
  inicializar();
});

botaoParar.addEventListener("click", pararJogo = () => {
  controles.classList.remove("hide");
  botaoParar.classList.add("hide");
  botaoIniciar.classList.remove("hide");
  clearInterval(intervalo);
});

const inicializar = () => {
  resultado.innerText = "";
  contagemVitorias = 0;
  primeiraCarta = false;
  segundaCarta = false;
  let valoresCartas = gerarAleatorio();
  gerarMatriz(valoresCartas);
  atualizarBarraTempo();
};

inicializar();

// temas claro e escuro
const botaoTema = document.getElementById("tema-toggle");
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-escuro");
  document.body.classList.toggle("tema-claro");
  document.querySelector(".wrapper").classList.toggle("tema-escuro");
});
