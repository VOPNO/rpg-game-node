const { Console } = require('console');
const { read } = require('fs');
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ilha = [
    ['Praia','Taberna', 'Floresta', 'Riacho', 'Montanha', 'Vulcão', 'Caverna', 'Tesouro'],
    ['Praia', 'Riacho','Taberna', 'Montanha', 'Caverna', 'Vulcão', 'Floresta', 'Tesouro'],
    ['Praia', 'Tesouro', 'Caverna','Taberna', 'Floresta', 'Montanha', 'Riacho', 'Vulcão'],
    ['Praia', 'Montanha', 'Vulcão', 'Floresta','Taberna', 'Caverna', 'Riacho', 'Tesouro']
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
        console.log(`Olá, sou ${this.nome}, o ${this.papel}. Minha habilidade especial é ${this.habilidade}. Meu poder é de ${this.poder}.`);
    };
};

function numberRandom () {
    return Math.floor(Math.random() * 100) + 1;
};

function msgAtraso( msg, temp){
    setTimeout(function(){
        console.log(msg);
    }, temp);
};

function duvida() {
    const menQuestion = readline.createInterface(process.stdin, process.stdout);
                menQuestion.question('Você tem alguma dúvida? [s/n] ', (respDuvida) => {
                    if( respDuvida === 's' || respDuvida === 'S'){
                        menQuestion.close();
                        const duvid = readline.createInterface(process.stdin, process.stdout);
                        duvid.question(`[1]- Regras\n[2]- Objetivo\n[3]- Mapa\n[4]- Comandos`, (duvidResp) => {
                            if(duvidResp == 1){
                                console.log('As regras são:\n1- Não digite nada além do esperado\n2- Não saia do objetivo de jogo\n3- Todos os valores são aleatorios\n4- Não se deve sair do papel durante o jogo');
                                duvid.close();
                            }else if(duvidResp == 2){
                                console.log('Os objetivos são:\n1- Superar os objetivos\n2- Seguir a sua jornada\n3- Encontrar o tesouro');
                                duvid.close();
                            }else if(duvidResp == 3){
                                console.log(`A ordem dos lugares em seu jogo é ${map}.`);
                                duvid.close();
                            }else if(duvidResp == 4){
                                console.log(`B- Mostra as informações sobre o inventario.`);
                                duvid.close();
                            }else {
                                console.log(`O comando ${respDuvida.toUpperCase()} não foi achado. Tente novamente`);
                                duvida();
                                duvid.close();
                            }
                        })

                    }
                    menQuestion.close()
                }) 
}
let rd = numberRandom();

const npc1 = new NPC('Jimmy', 'Reptiliano Escalador', 'Escalar qualquer superficie', numberRandom());

const npc2 = new NPC('Dor', 'Taberneiro','Conhecer todos os caminhos', numberRandom() );

const npc3 = new NPC('Gorrooth', 'Anão Ferreiro', 'Forjar qualquer ferramenta', numberRandom());

const npc4 = new NPC('Rilo', 'Elfo Arqueiro','Flechas magicas' , numberRandom());

const npc5 = new NPC('Esco', 'Bárbaro Guerreiro', 'Força Bruta', numberRandom());

const npc6 = new NPC('Morfis', 'Feiticeiro', 'Magias antigas', numberRandom());

const npc7 = new NPC('Brad', 'Guia', 'ajudar com suas duvidas', numberRandom());

/*const npc7 = new NPC('', '', '', numberRandom());*/

let user;
const userInput = readline.createInterface(process.stdin, process.stdout);
userInput.question('Qual seu nome?', (nomeUser) => {
    user = nomeUser;
    console.log(`Seja bem-vindo ao jogo ${nomeUser}.`)
    userInput.close();
});

let map; 
let respGO;

userInput.on('close', () => {
    const go = readline.createInterface(process.stdin, process.stdout);
    go.question('Deseja começar o jogo? [s/n] ', async (gogo) => {
        if (gogo === 's') {

            if (rd >= 0 && rd <= 25) {
                map = ilha[0];
            } else if (rd > 25 && rd <= 50) {
                map = ilha[1];
            } else if (rd >= 51 && rd <= 75) {
                map = ilha[2];
            } else if (rd > 76 && rd <= 100) {
                map = ilha[3];
            };

            console.log('Começando o jogo...\n');
            console.log(`\nA ordem dos lugares do seu mapa é ${map}.`);

            // Introdução 1ºNPC
            npc7.saudacao();
            respGO = true;
            go.close();
        } else {
            console.log('Finalizando o Jogo.');
            exit();
        };

        //Introdução a dúvida do player
        if(respGO === true){
            duvida();
        }
    });
});
