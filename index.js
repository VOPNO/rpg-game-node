const { Console } = require('console');
const { read } = require('fs');
const { userInfo } = require('os');
const { resolve } = require('path');
const { exit } = require('process');
const readline = require('readline');
const NPC = require('./modules/exports/npc.js');
const descriptItem = require('./modules/exports/descricaoItem.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ilhas = [
    ['Praia','Taberna', 'Floresta','Floresta de Cogumelos', 'Riacho', 'Montanha', 'Vulcão', 'Caverna', 'Tesouro'],
    ['Praia', 'Riacho','Taberna', 'Montanha', 'Caverna', 'Vulcão','Floresta de Cogumelos', 'Floresta', 'Tesouro'],
    ['Praia', 'Tesouro', 'Caverna','Taberna', 'Floresta','Floresta de Cogumelos', 'Montanha', 'Riacho', 'Vulcão'],
    ['Praia','Floresta de Cogumelos', 'Montanha', 'Vulcão', 'Floresta','Taberna', 'Caverna', 'Riacho', 'Tesouro']
];

let user;
//Número randomico
function numberRandom () {
    return Math.floor(Math.random() * 100) + 1;
};

//Função para esperar
function esperar(temp){
    return new Promise((reso) => {
        setTimeout(reso, temp);
    })
};

// Função para perguntar
function perguntar(pergunta){
    return new Promise((resolve) => {
        rl.question(pergunta + ' ', (resposta) => {
            resolve(resposta);
        })
    })
}

let player = {
    nome: user,
    saude: 100,
    armadura: 10,
    tipo: '',
    level: 0
};

//Função para abrir o inve;ntario
async function inventario() {

};

let rd = numberRandom();
let mapEscolhido;

//Criação de entidades / NPCs / Objetos
const npc1 = new NPC('Jimmy', 'Reptiliano Escalador', 'Escalar qualquer superficie', numberRandom());
const npc2 = new NPC('Dor', 'Minotauro Taberneiro','Conhecer todos os caminhos', numberRandom());
const npc3 = new NPC('Gorrooth', 'Anão Ferreiro', 'Forjar qualquer ferramenta', numberRandom());
const npc4 = new NPC('Rilo', 'Elfo Arqueiro','Flechas magicas' , numberRandom());
const npc5 = new NPC('Esco', 'Bárbaro Guerreiro', 'Força Bruta', numberRandom());
const npc6 = new NPC('Morfis', 'Feiticeiro', 'Magias antigas', numberRandom());
const npc7 = new NPC('Brad', 'Guia', 'ajudar com suas duvidas', numberRandom());
/*const npc7 = new NPC('', '', '', numberRandom());*/

//Comidas
const food = new descriptItem('Maça', 5, 1);
const food2 = new descriptItem('Banana', 5, 1);
const food3 = new descriptItem('Sopa de coelho', 15, 2);
const food4 = new descriptItem('Fatia bolo', 15, 2);
const food5 = new descriptItem('Bolo', 20, 5);
const food6 = new descriptItem('Porco Assado', 30, 10)
/*const food7 = new descriptItem('', 0, 0) */

//Poções
const pocao1 = new descriptItem('Cura Simples', 30, 10);
const pocao2 = new descriptItem('Cura Avançada', 60, 25);
const pocao3 = new descriptItem('Cura master', 95, 40);
const pocao4 = new descriptItem('');

async function userName(){
    const userNick = await perguntar(`\nQual o seu nome? `);
    user = userNick
    await esperar(1000);
    console.log(`\nSeja bem-vindo a Ilha ${user}!`);
    
    const continued = await perguntar(`${user}, você deseja iniciar o jogo? [s/n]`);
    if ( continued.toLowerCase() == 's'){
        startGame();
    } else {
        toCloseGame();
    }
}

let stateDuvid = false;

async function startGame() {
    await esperar(1000);
    console.log('\n----------Lendas da Ilha Perdida: Renascendo Heróis----------');
    await esperar(1000);

    const duvidQuestion = await perguntar(`Antes de começarmos, você tem alguma dúvida? [s/n]`);
    if ( duvidQuestion.toLowerCase() == 's' ){            
        stateDuvid = true;
        duvida();
    } else {
        await esperar(1000);
        console.log(`Ok, vamos continuar.`);
        stateDuvid = false;

        //Escolhendo o mapa;
        await escolherMap();
        await esperar(1000);
        console.log(`\nA ordem dos biomas do seu mapa é: ${mapEscolhido}.`);
        await esperar(1000);
        primeiraParte();
    };
};

function toCloseGame(){
    console.log(`Encerrando o jogo. Obrigado por jogar ${user}!`);
    exit();
};

async function duvida(){
    while (stateDuvid) {    
        await esperar(200);
        let duvidMenu = await perguntar(`[1]- Regras\n[2]- Objetivo\n[3]- Ajuda\n[4]- Comandos\n[5]- Créditos\n[6]- Encerrar o jogo\n[7]- Mapa\n[0]- Sair\n:`);

        switch (duvidMenu){
            case '1':
                await regras();
                break;
            case '2':
                await obj();
                break;
            case '3':
                await help();
                break;
            case '4':
                await cmd();
                break;
            case '5':
                await credito();
                break;
            case '6':
                toCloseGame();
                break;
            case '7':
                console.log(`A ordem dos biomas do seu mapa é: ${mapEscolhido}.`);
                break;
            case '0':
                stateDuvid = false;
                break;
            default:
                console.log('Comando não achado.');
        };
    };
    await startGame();
};

async function regras(){
    await esperar(1000);
    console.log('\n1- Não escreva nada além do esperado\n2- Os valores randomicos não podem ser pré-definidos\n3- Não saia  do personagem\n');
    await esperar(3000);
};

async function obj(){
    await esperar(1000);
    console.log(`\nOs objetivos são:\n1- Superar todos os objetivos\n2- Encontrar o Tesouso escondido\n`);
};

async function help(){
    await esperar(1000);
    console.log('\nAlgum bug ou problema no jogo? Mande uma mensagem para o dc: @vopno\n');
};

async function credito(){
    await esperar(1000);
    console.log('\nDeveloper by @vopno\n');
};

async function cmd(){
    await esperar(1000);
    console.log('\nEm desenvolvimento...\n');
};

async function escolherMap(){
    await esperar(1000);
    if ( rd <= 25){
        mapEscolhido = ilhas[0];
    }else if(rd <= 50) {
        mapEscolhido = ilhas[1];
    } else if(rd <= 75) {
        mapEscolhido = ilhas[2];
    } else {
        mapEscolhido = ilhas[3];
    };
};

function falaDoPlayer(fala){
    console.log('\n' + user + ' - ' + fala)
}

function falaNPC(npc, fala){
    console.log(npc.nome + ' - ' + fala + '\n');
};

function falaNpcDesconhecido(fala){
    console.log(`??? - ` + fala);
};

function falaDoJogo (fala) {
    console.log('Jogo - ' + fala);
};

async function primeiraParte(){
    await esperar(1000);
    console.log(`\nJogo- Você nasceu na cidade de Porto das Marés. A sua frente você vê um homem, ele tem estatura meio baixa, cabelos castanhos uma grande mochila e olhos bondosos. Você decide ir até ele e comprimenta-lo.\n`);
    await esperar(2000);
    falaDoPlayer('O... Oi, estou meio perdido, não sei como vim parar aqui. Poderia me ajudar? Onde estamos?\n');
    await esperar(1000);
    falaNpcDesconhecido('Olá, estamos na cidade de Porto das Marés. Você é novo por aqui?\n');
    await esperar(1000);
    falaDoPlayer('Si...sim, eu não lembro ao certo como vim parar aqui. Estou bem atordoado.\n');
    await esperar(1000);
    falaNpcDesconhecido('Bom você está em Porto das Marés, pode fazer oque quiser. Mas ja avisando, essa Ilha é realmente cheia de misterios ');
    
    await esperar(1000);
    await pergunta1();
    await pergunta2();

    async function pergunta1() {
        let nPergunta1 = true;
        const decisaoMisterio = await perguntar(`Jogo- Você tem duas opções\n1- Perguntar como se arruma um barco para voltar para a casa\n2- Perguntar sobre os misterios da Ilha`);
        while (nPergunta1){
            if( decisaoMisterio == '2'){
                falaDoPlayer('Mis...Misterios? Quais misterios essa ilha tem?');
                await esperar(2000);
                falaNpcDesconhecido('Dizem que existe um Tesouro no final do mapa. Um tesouro capaz de conceder desejos, capaz de fazer qualquer desejo que você quiser.');
                await esperar(2000);
                falaDoPlayer('Uau! Aonde eu posso arrumar esse mapa desse tal tesouro?');
                await esperar(2000);
                falaNpcDesconhecido(`Bom, o lugar é proximo daqui. Na parte baixa do caís, proximo a ${mapEscolhido[1]}. Dizem que lá não é muito seguro, então tome cuidado.`);
                await esperar(2000);
                falaNPC(npc7, `A propósito me chamo Brad. É um prazer conhece-lo!`);
                await esperar(2000);
                falaDoPlayer(`E eu me chamo ${user}. É igualmente um prazer.`);
                await esperar(2000);
                falaNPC(npc7, `Bom ${user}, se você quiser, eu estou indo para lá também. Se quiser podemos ir juntos`);
                await esperar(2000);
                falaDoPlayer('É uma otima ideia.')
                await esperar(1000);
                falaDoJogo(`Você partem em direção a parte baixa do caís.`)
                await esperar(2000); 
                nPergunta1 = false;

            } else if( decisaoMisterio == '1') {
                falaDoPlayer('Tô querendo só voltar para minha casa mesmo, sabe aonde eu arrumo algo tipo de barco volta ao continente?');
                await esperar(2000);
                falaNpcDesconhecido('Claro, o cais é perto daqui. É só seguir reto aqui proximo a linha do trem que chegara la em breve.');
                await esperar(2000);
                pergunta = false;
            }else {
                console.log('Comando não achado.');
                pergunta1();
                break;
            };
        };
    };

    async function pergunta2 () {
        let c;
        falaNPC(npc7, 'Olha, a jornada não vai ser facil por onde quer que você vá. Você não me parece muito forte. Tem alguma habilidade especial? [s/n]');
        const duvidaClasses = await perguntar('\n:');
        let nPergunta2 = true;
        while (nPergunta2){
            if(duvidaClasses == 's'){
                falaDoPlayer('Claro, a minha terra de origem é conhecida pelos seus grandes guerreiros.');
                await esperar(2000)
                falaNPC(npc7, 'Uau! E que tipo de guerreiro você é?')
                const tipoGuerreiro = await perguntar('[1]- Guerreiro\n[2]- Espadachim\n[3]- Arqueiro\n[4]- Mago\n:')
                switch(tipoGuerreiro){
                    case '1':
                        player.tipo = 'Guerreiro';
                        break;
                    case '2':
                        player.tipo = 'Espadachim';
                        break
                    case '3':
                        player.tipo = 'Arqueiro';
                        break;
                    case '4':
                        player.tipo = 'Mago';
                        break;
                    default:
                        console.log('[404]Comando não achado.')      
                }
            }else if(duvidaClasses == 'n'){
                player.tipo = null
                falaDoPlayer('Não, infelizmente não tenho nenhuma habilidade especial.');
                await esperar(2000);
                falaNPC(npc7, 'Nossa, então vai ser bem complicado.');
                await esperar(2000);
                falaDoPlayer('É, mas não tem problema. Vou dar um jeito.')
            }
        }

    }
};

userName();