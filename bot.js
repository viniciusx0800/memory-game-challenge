var TempoDeExecucao = 0;
var CartasPendentes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var MemoriaDoBot = [];

function clickOnCardDiv(cardDiv){
	cardDiv.click(function(){ console.log("Card foi selecionado automaticamente"); });
}

function armazenarCartaNaMemoria(tipo,posicao){
    let carta = {
        posicao: posicao,
        tipo: tipo
    }

    MemoriaDoBot.push(carta);
}

function buscarNaMemoria(tipo,posicao){
    return Array.from(MemoriaDoBot).find(carta => carta.tipo === tipo && carta.posicao != posicao);
}

function numeroAleatorio(){
	return CartasPendentes[parseInt(Math.random() * CartasPendentes.length)];
}

function removerCartaPendente(cartaSorteada){
	CartasPendentes = CartasPendentes.filter(numeroCarta => numeroCarta !== cartaSorteada)
}

function exibirLabel(){
    var label = document.getElementById("bot-label");
    label.classList.remove("hide");
}

function startBot(){
    exibirLabel();

    for(let quantidadeDeClicks = 0; quantidadeDeClicks < 1000; quantidadeDeClicks++){
        setTimeout(() => {
            let allCards = document.querySelectorAll(".card-container");
            let cartaSorteada = numeroAleatorio();
            let cartaVirada = Array.from(allCards).find(card => (card.classList.contains("flipped")) && (!card.classList.contains("matched")));
            let posicaoCartaVirada = Array.from(allCards).findIndex(card => (card.classList.contains("flipped")) && (!card.classList.contains("matched")));


            if(cartaVirada){
                let tipoDaCartaVirada = cartaVirada.dataset.cardValue;
                let cartaMemorizada = buscarNaMemoria(tipoDaCartaVirada,posicaoCartaVirada);        
                if(cartaMemorizada){
                    cartaSorteada = cartaMemorizada.posicao;
                }
            }

            if(!allCards[cartaSorteada].classList.contains("matched") && !allCards[cartaSorteada].classList.contains("flipped")){
                clickOnCardDiv(allCards[cartaSorteada]);
                armazenarCartaNaMemoria(allCards[cartaSorteada].dataset.cardValue,cartaSorteada);
            }

            if(allCards[cartaSorteada].classList.contains("matched")){
                removerCartaPendente(cartaSorteada);		
            }
        }, 1000 + TempoDeExecucao)

        TempoDeExecucao += 1000;
    }
}