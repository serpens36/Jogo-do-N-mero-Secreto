let listaDeNumerosAleatorios = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = ' Escolha um número entre 1 e 10 '

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.2});
    // Abaixo tem o modelo de Voice Speak nativo do JS
    // if ('speechSynthesis' in window) {
    //     let utterance = new SpeechSynthesisUtterance(texto);
    //     utterance.lang = 'pt-BR'; 
    //     utterance.rate = 1.2; 
    //     window.speechSynthesis.speak(utterance); 
    // } else {
    //     console.log("Web Speech API não suportada neste navegador.");
    // }
}

function exibirMensagemInicial() {
exibirTextoNaTela('h1', 'Jogo do Número Secreto' );
exibirTextoNaTela('p', 'Escolha um número entre 1 e 100' );
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if ( chute == numeroSecreto ){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o Número Secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if ( chute < numeroSecreto ){
            exibirTextoNaTela('p', 'O Número Secreto é maior');
        } else { 
            exibirTextoNaTela('p', ' O Número Secreto é menor');
        }
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() *100 + 1);
    let quatidadeDeElementosNaLista = listaDeNumerosAleatorios.length;
    if ( quatidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosAleatorios = [];
    }
    if (listaDeNumerosAleatorios.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosAleatorios.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}