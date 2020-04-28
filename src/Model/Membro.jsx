import Contato from "./Contato";
import Endereco from "./Endereco";
import DadosIgreja from "./DadosIgreja";

class Membro {
    constructor() {
        this.explicitType = "membro";
        this.id = 0;
        this.nome = "";
        this.rg = "";
        this.dataNascimento = "";
        this.idade = "";
        this.sexo = "";
        this.profissao = "";
        this.estadoCivil = "";
        this.chEsConjuge = "";
        this.conjuge = "";
        this.ativo = "";
        this.contato = new Contato();
        this.endereco = new Endereco();
        this.dadosIgreja = new DadosIgreja();
        this.chEsContato = "";
        this.chEsEndereco = "";
        this.chEsIgreja = ""
    }
}

export default Membro;