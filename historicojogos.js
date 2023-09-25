storeJson = JSON.parse(localStorage.getItem("dados_de_jogo"));
let newStore = storeJson.length > 0 ? [...storeJson] : [];
console.log(newStore);

function generateHistoryLineFour() {
    $("#historicoNome").text(newStore[0].vencedor.slice(0,-8));
    console.log(newStore[0].vencedor);

    $("#historicoTempo").text(newStore[0].tempo);
    console.log(newStore[0].tempo);

    $("#historicoData").text(newStore[0].data);
    console.log(newStore[0].data);

    let historicos_quatro_Linha = newStore.filter((historico)=>{
        return historico.id === 2;
    })

    console.log(historicos_quatro_Linha)
};

generateHistoryLineFour();
