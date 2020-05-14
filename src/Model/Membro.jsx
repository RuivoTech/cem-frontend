import Contato from "./Contato";
import Endereco from "./Endereco";
import DadosIgreja from "./DadosIgreja";
import MinisterioMembro from "./MinisterioMembro";

const contato = new Contato();
const endereco = new Endereco();
const dadosIgreja = new DadosIgreja();
const ministeriosMembro = new MinisterioMembro();

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
        this.contato = contato;
        this.endereco = endereco;
        this.dadosIgreja = dadosIgreja;
        this.ministeriosMembro = [ministeriosMembro];
        this.chEsContato = "";
        this.chEsEndereco = "";
        this.chEsIgreja = ""
    }
}

export default Membro;