const Membro = {
    explicitType: "membro",
    id: 0,
    nome: "",
    rg: "",
    dataNascimento: "",
    idade: "",
    sexo: "",
    profissao: "",
    estadoCivil: "",
    chEsConjuge: "",
    conjuge: "",
    ativo: "",
    contato: {
        id: 0,
        email: "",
        telefone: "",
        celular: ""
    },
    endereco: {
        id: 0,
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        complemento: ""
    },
    dadosIgreja: {
        id: 0,
        isBatizado: "",
        dataBatismo: "",
        igrejaBatizado: "",
        ultimoPastor: "",
        ultimaIgreja: "",
        ministerio: {}
    },
    chEsContato: "",
    chEsEndereco: "",
    chEsIgreja: ""
}

export default Membro;