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

module.exports = NPC