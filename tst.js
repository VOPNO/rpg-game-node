const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function perguntar(pergunta){
    return new Promise((resolve) => {
        rl.question(pergunta + ' ', (resposta) => {
            resolve(resposta);
        })
    })
}


async function teste(){
    
    let testeBoolean = true;

    while (testeBoolean){
        
        async function switchTeste (){
            const pergunta = await perguntar('Switch teste: \n1/2')
            switch(pergunta) {
                case '1':
                    console.log('Teste 1')
                    testeBoolean = false
                    break;
                case '2':
                    console.log('Teste 2')
                    testeBoolean = false
                    break;
                default:
                    console.log('404')
    }}}
    console.log('Estamos fora')
}

teste();