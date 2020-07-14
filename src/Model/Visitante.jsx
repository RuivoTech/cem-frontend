import Contato from "./Contato";

const contato = new Contato();

class Visitante {
    constructor() {
        this.explicitType = "visitante";
        this.id = 0;
        this.contato = contato;
    }
}

export default Visitante;