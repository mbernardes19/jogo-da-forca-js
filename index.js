// Define palavra do jogo
const PALAVRA = "ALMONDEGA";

// Define suas chances
let chances = 5;

// Pega os elementos <input>, <button> e <div id="chances"> e os insere nas variáveis input, botao e chancesContainer
const input = document.querySelector('input');
const botao = document.querySelector('button');
const chancesContainer =  document.getElementById('chances');

/*
    Evento de inserção de texto
    Todo texto inserido é convertido para maiúsculo
*/
input.oninput = (e) => input.value = paraMaiusculo(input.value);


/*
    Evento de click no botão
    Quando o evento de click acontece no botão, é feito o seguinte:

    1 - Checa-se se o input não está vazio
    
    2 - Se não estiver, guarda a letra numa variável letraInserida
    
    3 - Utiliza-se a função letraExisteEmPalavra(letra, palavra) para checar se a letra existe em algum lugar na palavra

        3.1 - Se a letra existir, utiliza-se a função encontrarLetrasEmPalavra(palavra, letra) para procurar por toda a palavra por ocorrências da letra
        e retornar uma array de objetos que contenha a letra e o índice dela na palavra original
        Ex: {texto: 'A', indice: 2}
        
            3.1.1 - E finalmente, aproveitando o retorno da encontrarLetrasEmPalavra(), utilizamos a função mostrarLetrasNaTela(letras) para exibir
            cada letra no <p> cujo id seja correspondente ao índice da letra na palavra original. Fazemos isso pegando o <p> e inserindo
            a letra na propriedade textContent dele.
            Ex: {texto: 'A', indice: 2} -> 'A' é inserido no textContent do <p id="l2">
                {texto: 'B', indice: 5} -> 'B' é inserido no textContent do <p id="l5">
                {texto: 'M', indice: 0} -> 'M' é inserido no textContent do <p id="l0">
            
            3.1.2 - Após isso utiliza-se a função checarQuantasLetrasPreenchidas() para retornar quantas já foram

            3.1.3 - E depois, a função checarSeJogadorGanhou(letrasPreenchidas, palavra) analisa se a quantidade de letras preenchidas é igual
            à quantidade de letras na palavra original.

            3.1.4 - Se for verdade, executa a mostrarVitoria() que renderiza na tela o texto de vitória

        3.2 - Se a letra não existir, diminui-se o em 1 o valor da variável chances

            3.2.1 - Utiliza-se a função atualizaChances(chancesContainer) para atualizar a tela com o novo valor de chances

            3.2.2 - A função checarSeJogadorPerdeu(chances) verifica se a quantidade de chances disponíveis é igual a zero

            3.2.3 - Se for igual a zero, executa-se a função mostrarDerrota() que carrega na tela a mensagem de derrota

*/
botao.onclick = (e) => {    
    if (!isInputVazio()) {
        const letraInserida = input.value;

        if (letraExisteEmPalavra(letraInserida, PALAVRA)) {
            const letrasEncontradas = encontrarLetrasEmPalavra(PALAVRA, letraInserida);
            mostrarLetrasNaTela(letrasEncontradas);
            
            const letrasPreenchidas = checarQuantasLetrasPreenchidas();

            checarSeJogadorGanhou(letrasPreenchidas, PALAVRA) ? mostrarVitoria() : null;
        }
        else {
            chances--;
            atualizaChances(chancesContainer);
            checarSeJogadorPerdeu(chances) ? mostrarDerrota() : null;
        }
        limparInput(input);
    }
    
}


// Funções utilizadas

function paraMaiusculo (texto) {
    return texto.toUpperCase();
}

function letraExisteEmPalavra(letra, palavra) {
    return palavra.includes(letra);
}

function isInputVazio() {
    return input.value.length === 0 ? true : false;
}

function encontrarLetrasEmPalavra(palavra, letraInserida) {
    const letrasEncontradas = 
    PALAVRA
    .split('')
    .map((letra, i) => letra === letraInserida ? {texto: letra , indice: i} : null);

    return letrasEncontradas;
}

function mostrarLetrasNaTela(letras) {
    letras.map(letra => {
        if (letra) {
            const letraTela = document.getElementById('l'+letra.indice);
            letraTela.textContent = letra.texto;
        }
    });         
}

function checarSeJogadorGanhou(letrasPreenchidas, palavra) {
    return letrasPreenchidas.length === palavra.length;
}

function mostrarVitoria() {
        input.style.display = 'none';
        botao.style.display = 'none';
        chancesContainer.style.fontSize = '24px';
        chancesContainer.style.width = '200px';
        chancesContainer.style.margin = '0 auto';
        chancesContainer.textContent = 'Você ganhou!'
}

function checarSeJogadorPerdeu(chances) {
    return chances === 0;
}

function mostrarDerrota() {
    input.style.display = 'none';
    botao.style.display = 'none';
    chancesContainer.style.fontSize = '24px';
    chancesContainer.style.width = '200px';
    chancesContainer.style.margin = '0 auto';
    chancesContainer.textContent = 'Você perdeu!'
}

function limparInput(input) {
    input.value = '';
}

function atualizaChances(chancesContainer) {
    chancesContainer.textContent = 'Chances: ' + chances;
}

function checarQuantasLetrasPreenchidas() {
    const letrasContainer = Array.from(document.querySelectorAll('#palavra p'));
    const letrasPreenchidas = letrasContainer.filter(letra => {
        return letra.textContent;
    })

    return letrasPreenchidas;
}