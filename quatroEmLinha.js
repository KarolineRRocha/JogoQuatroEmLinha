const jogadorUm = $("#nomeJogadorUm");
const jogadorDois = $("#nomeJogadorDois");
let jogadorAtual = jogadorUm;

let gameOver = false;
let tabuleiro;
let colunaAtual;

let linhas = 6;
let colunas = 7;

let relogio = 0;
let modalvencedor = $("#displayVencedor");
$(modalvencedor).toggle("hidded");

let historicos = [{
    nomeJogadorUm: "",
    data: "",
    jogo: "",
    vencedor: "",
    nomeJogadorDois: "",
    tempo: "",
    id: 2
    }]

window.onload = function () {
    definirJogo();
}

function definirJogo() {
    tabuleiro = [];
    colunaAtual = [5, 5, 5, 5, 5, 5, 5];

    for (let l = 0; l < linhas; l++) {
        let linha = [];
        for (let c = 0; c < colunas; c++) {
            linha.push(' ');

            let posicoesTabuleiro = document.createElement("div");
            posicoesTabuleiro.id = l.toString() + "-" + c.toString();
            posicoesTabuleiro.classList.add("posicoesTabuleiro");
            posicoesTabuleiro.addEventListener("click", setPiece);
            document.getElementById("tabuleiro").append(posicoesTabuleiro);
        }
        tabuleiro.push(linha);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coordenadas = this.id.split("-"); //Exemplo: "0-0" → ["0", "0"]

    let l;
    let c = parseInt(coordenadas[1]);

    l = colunaAtual[c];
    if (l < 0) {
        return;
    }

    tabuleiro[l][c] = jogadorAtual;
    let posicoesTabuleiro = document.getElementById(l.toString() + "-" + c.toString());
    if (jogadorAtual === jogadorUm) {
        posicoesTabuleiro.classList.add("black-piece");
        jogadorAtual = jogadorDois;
    } else {
        posicoesTabuleiro.classList.add("red-piece");
        jogadorAtual = jogadorUm;
    }

    l -= 1; //Atualizando a altura da linha para a coluna
    colunaAtual[c] = l; //Atualizando o array

    verificarVencedor();
}

function verificarVencedor() {
    //Verificação Horizontal
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[l][c] !== " ") {
                if (tabuleiro[l][c] === tabuleiro[l][c + 1] && tabuleiro[l][c + 1] === tabuleiro[l][c + 2] && tabuleiro[l][c + 2] === tabuleiro[l][c + 3]) {
                    setVencedor(l, c);
                    return;
                }
            }
        }
    }

    //Verificação Vertical
    for (let c = 0; c < colunas; c++) {
        for (let l = 0; l < linhas - 3; l++) {
            if (tabuleiro[l][c] !== " ") {
                if (tabuleiro[l][c] === tabuleiro[l + 1][c] && tabuleiro[l + 1][c] === tabuleiro[l + 2][c] && tabuleiro[l + 2][c] === tabuleiro [l + 3][c]) {
                    setVencedor(l, c);
                    return;
                }
            }
        }
    }

    //Verificação Diagonal à esquerda
    for (let l = 0; l < linhas - 3; l++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[l][c] !== " ") {
                if (tabuleiro[l][c] === tabuleiro[l + 1][c + 1] && tabuleiro[l + 1][c + 1] === tabuleiro[l + 2][c + 2] && tabuleiro[l + 2][c + 2] === tabuleiro [l + 3][c + 3]) {
                    setVencedor(l, c);
                    return;
                }
            }
        }
    }

    //Verificação Diagonal à direita
    for (let l = 3; l < linhas; l++) {
        for (let c = 0; c < colunas - 3; c++) {
            if (tabuleiro[l][c] !== " ") {
                if (tabuleiro[l][c] === tabuleiro[l - 1][c + 1] && tabuleiro[l - 1][c + 1] === tabuleiro[l - 2][c + 2] && tabuleiro[l - 2][c + 2] === tabuleiro [l - 3][c + 3]) {
                    setVencedor(l, c);
                    return;
                }
            }
        }
    }
}

function setVencedor(l, c) {
    let vencedor = document.getElementById("vencedorJogo");
    if (tabuleiro[l][c] === jogadorUm) {
        vencedor.innerText = jogadorUm.text() + " venceu!"
    } else {
        vencedor.innerText = jogadorDois.text() + " venceu!"
    }
    gameOver = true;
    $("#displayVencedor").toggle("hidded");
    $("#vencedorJogo").text = (jogadorUm.text() || jogadorDois.text());

    clearInterval(relogio);

    storeJson = JSON.parse(localStorage.getItem("dados_de_jogo"));

    let newStore = storeJson.length > 0 ? [...storeJson] : [];

/*    let newStore = [];
    if(storeJson.length > 0) {
        newStore  = [...storeJson]
    }*/

    /*let data = ((data.getDate() ) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear())*/

    function dataAtualFormatada(){
        let data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

       historicos = [{
        nomeJogadorUm: jogadorUm.text(),
        data: dataAtualFormatada(),
        jogo: "4 em linha",
        vencedor: $("#vencedorJogo").text(),
        nomeJogadorDois: jogadorDois.text(),
        tempo: $("#count-up").text(),
        id: 2
    }];

    newStore.unshift(...historicos);

    console.log(historicos);
    localStorage.setItem("dados_de_jogo", JSON.stringify(newStore));
}

let min = 0;
let second = 0;
let zeroPlaceholder = 0;

function countUp() {
    second++;
    if (second === 60) {
        second = 0;
        min = min + 1;
    }
    if (second === 10) {
        zeroPlaceholder = '';
    } else if (second === 0) {
        zeroPlaceholder = 0;
    }
    document.getElementById("count-up").innerText = min.toLocaleString('pt-PT', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        + ':' + zeroPlaceholder + second;
}

(function () {
    setTimeout(function () {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }, 500);
})();

function fecharModel() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

$('#nomes').submit( function() {
    $(jogadorUm).text()
    fecharModel();
    let nomeUm = $("#nomeJogadorUm").text($("#jogadorUm").val());
    console.log(nomeUm.text());
    let nomeDois = $("#nomeJogadorDois").text($("#jogadorDois").val());
    console.log(nomeDois.text());
    relogio = setInterval(function () {
        countUp();
    }, 1000);
    return false;
});

function voltar() {
    window.history.back(-2);
}

function fecharModelVencedor() {
    window.location.href=window.location.pathname;
    const modal = document.getElementById("displayVencedor");
    modal.style.display = "none";
}
