const { Console } = require('console');
const { read } = require('fs');
const { userInfo } = require('os');
const { resolve } = require('path');
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ilha = [
    ['Praia','Taberna', 'Floresta','Floresta de Cogumelos', 'Riacho', 'Montanha', 'Vulcão', 'Caverna', 'Tesouro'],
    ['Praia', 'Riacho','Taberna', 'Montanha', 'Caverna', 'Vulcão','Floresta de Cogumelos', 'Floresta', 'Tesouro'],
    ['Praia', 'Tesouro', 'Caverna','Taberna', 'Floresta','Floresta de Cogumelos', 'Montanha', 'Riacho', 'Vulcão'],
    ['Praia','Floresta de Cogumelos', 'Montanha', 'Vulcão', 'Floresta','Taberna', 'Caverna', 'Riacho', 'Tesouro']
];

class NPC {
    constructor(nome, papel, habilidade, poder, suprimentos) {
        this.nome = nome;
        this.papel = papel;
        this.habilidade = habilidade;
        this.poder = poder;
        this.suprimentos = suprimentos;
    };
    saudacao() {
        console.log(`\nOlá, sou ${this.nome}, o ${this.papel}. Minha habilidade especial é ${this.habilidade}. Meu poder é de ${this.poder}.`);
    };
};

//Número randomico
function numberRandom () {
    return Math.floor(Math.random() * 100) + 1;
};

//Função para esperar
function esperar(temp){
    return new Promise((reso) => {
        setTimeout(reso, temp)
    })
};

// Função para perguntar
function perguntar(pergunta){
    return new Promise((resolve) => {
        rl.question(pergunta + ' ', (resposta) => {
            resolve(resposta)
        })
    })
}

//Função para abrir o inventario
function inventario() {

}

let rd = numberRandom();

const npc1 = new NPC('Jimmy', 'Reptiliano Escalador', 'Escalar qualquer superficie', numberRandom());

const npc2 = new NPC('Dor', 'Minotauro Taberneiro','Conhecer todos os caminhos', numberRandom() );

const npc3 = new NPC('Gorrooth', 'Anão Ferreiro', 'Forjar qualquer ferramenta', numberRandom());

const npc4 = new NPC('Rilo', 'Elfo Arqueiro','Flechas magicas' , numberRandom());

const npc5 = new NPC('Esco', 'Bárbaro Guerreiro', 'Força Bruta', numberRandom());

const npc6 = new NPC('Morfis', 'Feiticeiro', 'Magias antigas', numberRandom());

const npc7 = new NPC('Brad', 'Guia', 'ajudar com suas duvidas', numberRandom());

/*const npc7 = new NPC('', '', '', numberRandom());*/

let user;

async function userName(){
    const userNick = await perguntar(`\nQual o seu nome? `);
    user = userNick
    await esperar(900);
    console.log(`\nSeja bem-vindo a Ilha ${user}!`);
    
    const continued = await perguntar(`${user}, você deseja iniciar o jogo? [s/n]`);
    if ( continued == 's' || continued == 'S'){
        startGame();
    } else {
        toCloseGame();
    }
}

let stateDuvid = false;

async function startGame() {
    await esperar(900)
    console.log('\n----------Lendas da Ilha Perdida: Renascendo Heróis----------')
    await esperar(500)
    npc7.saudacao();
    await esperar(1000);

    const duvidQuestion = await perguntar(`Brad- Você tem alguma dúvida? [s/n]`);
    if ( duvidQuestion.toLowerCase() == 's' ){            
        stateDuvid = true;
        duvida();
    } else {
        await esperar(1000);
        console.log(`Brad- Ok, vamos continuar.`)
        stateDuvid = false;
        rl.close()
    }
    }

function toCloseGame(){
    console.log(`Encerrando o jogo. Obrigado por jogar ${user}!`)
    exit()
}

async function duvida(){
    while (stateDuvid) {    
        await esperar(200);
        let duvidMenu = await perguntar(`[1]- Regras\n[2]- Objetivo\n[3]- Ajuda\n[4]- Comandos\n[5]- Créditos\n[6]- Encerrar o jogo\n[0]- Sair`);

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
                await credito()
                break;
            case '6':
                toCloseGame();
                break;
            case '0':
                stateDuvid = false;
                break;
            default:
                console.log('Comando não achado.')
        }
    }
    await startGame();

}

async function regras(){
    await esperar(1000);
    console.log('\n1- Não escreva nada além do esperado\n2- Os valores randomicos não podem ser pré-definidos\n3- Não saia  do personagem\n')
    await esperar(3000)
}

async function obj(){
    await esperar(1000);
    console.log(`\nOs objetivos são:\n1- Superar todos os objetivos\n2- Encontrar o Tesouso escondido\n`)
}

async function help(){
    await esperar(1000);
    console.log('\nAlgum bug ou problema no jogo? Mande uma mensagem para o dc: @vopno\n')
}

async function credito(){
    await esperar(1000);
    console.log('\nDeveloper by @vopno\n')
}

async function cmd(){
    await esperar(1000);
    console.log('\nEm desenvolvimento...\n')
}

userName()