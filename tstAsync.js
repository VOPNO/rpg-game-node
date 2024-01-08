const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let name;
let year;

function esperar(temp){
    return new Promise((reso) => {
        setTimeout(reso, temp)
    })
};

function perguntar(pergunta){
    return new Promise((resolve) => {
        rl.question(pergunta + ' ', (resposta) => {
            resolve(resposta)
        })
    })
}

async function nm() {
    name = await perguntar('Qual seu nome?');
    console.log(`Seja bem vindo ${name}`)
    test();

    await esperar('Espere um segundo, estou testando.', 1000)
    year = await perguntar('Qual a sua idade?')
    console.log(`Parabens, você tem ${year}`)
    name = await perguntar('Qual seu nome?1 ');
    name = await perguntar('Qual seu nome?2 ');
    name = await perguntar('Qual seu nome?3 ');
    name = await perguntar('Qual seu nome?4 ');
    name = await perguntar('Qual seu nome?5 ');
    rl.close();
}

nm()

function test() {
    console.log(name);
    console.log(year)
}