class descriptItem {
    constructor(nomeAlimento, recuperação, pesoInventario){
        this.nomeAlimento = nomeAlimento;
        this.recuperacao = recuperação;
        this.pesoInventario = pesoInventario;
    };
    descpFood () {
        return `${this.nomeAlimento}\nRecuperação de vida: ${this.recuperacao}\nPeso no inventario: ${this.pesoInventario}`;
    };
};

module.exports = descriptItem;