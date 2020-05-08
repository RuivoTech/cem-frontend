import React, { Component } from 'react';
import 'primeicons/primeicons.css';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from  "react-notifications";

import Carregando from "../../../componentes/Carregando";
import api from "../../../services/api";
import Membro from "../../../Model/Membro";
import NovoMembro from "./form";
import Menu from "../../../componentes/Menu";
import Utils from '../../../componentes/Utils';
import MinisterioMembro from '../../../Model/MinisterioMembro';

const listaEstadoCivil = [
    {
        id: 0,
        descricao: "Não informado"
    },
    {
        id: 1,
        descricao: "Solteiro(a)"
    },{
        id: 2,
        descricao: "Casado(a)"
    },{
        id: 3,
        descricao: "Divorciado(a)"
    },{
        id: 4,
        descricao: "Viúvo(a)"
    },{
        id: 5,
        descricao: "Separado(a)"
    }
];

class Membros extends Component {

    state = {
        carregando: false,
        data: [{
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
                ultimaIgreja: ""
            },
            ministeriosMembro: [{
                id: "",
                chEsMembro: "",
                chEsMinisterio: "",
                checked: false
            }],
            chEsContato: "",
            chEsEndereco: "",
            chEsIgreja: ""
        }],
        ministerios: [{
            id: "",
            nome: "",
            descricao: ""
        }],
        todosMinisteriosSelecionados: false,
        MembroSelecionado: {
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
                ultimaIgreja: ""
            },
            ministeriosMembro: [{
                id: "",
                chEsMembro: "",
                chEsMinisterio: "",
                checked: false
            }],
            chEsContato: "",
            chEsEndereco: "",
            chEsIgreja: ""
        },
        sugestoes: [Membro.nome],
        isOpen: true,
        tabelaEstaAberta: true,
        error: "",
        expandedRows: null
    }

    async componentDidMount(){
        document.title = "Membros - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchMembro();        
    }

    fetchMinisterios = async () => {
        let data = await api.get("/ministerio/listar");
        this.setState({
            ministerios: data
        });
    }

    fetchMembro = async () => {
        let data = await api.get("/membro/listar");

        this.setState({
            carregando: false,
            data,
            sugestoes: data
        });

        this.fetchMinisterios();
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {

        const todosMinisterios = e.value.ministeriosMembro.length === this.state.ministerios.length ? true : false;
        console.log(todosMinisterios);
        this.setState({
            todosMinisteriosSelecionados: todosMinisterios,
            MembroSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const membro = new Membro();

        membro.id = this.state.MembroSelecionado.id;
        membro.nome = this.state.MembroSelecionado.nome;
        membro.rg = this.state.MembroSelecionado.rg;
        membro.dataNascimento = this.state.MembroSelecionado.dataNascimento;
        membro.sexo = this.state.MembroSelecionado.sexo;
        membro.profissao = this.state.MembroSelecionado.profissao;
        membro.estadoCivil = this.state.MembroSelecionado.estadoCivil;
        membro.chEsConjuge = this.state.MembroSelecionado.chEsConjuge;
        membro.conjuge = this.state.MembroSelecionado.conjuge;
        membro.ativo = 0;
        
        membro.contato.id = this.state.MembroSelecionado.contato.id;
        membro.contato.email = this.state.MembroSelecionado.contato.email;
        membro.contato.telefone = this.state.MembroSelecionado.contato.telefone;
        membro.contato.celular = this.state.MembroSelecionado.contato.celular;
        
        membro.endereco.id = this.state.MembroSelecionado.endereco.id;
        membro.endereco.cep = this.state.MembroSelecionado.endereco.cep;
        membro.endereco.cidade = this.state.MembroSelecionado.endereco.cidade;
        membro.endereco.estado = this.state.MembroSelecionado.endereco.estado;
        membro.endereco.logradouro = this.state.MembroSelecionado.endereco.logradouro;

        membro.dadosIgreja.id = this.state.MembroSelecionado.dadosIgreja.id;
        membro.dadosIgreja.isBatizado = this.state.MembroSelecionado.dadosIgreja.isBatizado;
        membro.dadosIgreja.dataBatismo = this.state.MembroSelecionado.dadosIgreja.dataBatismo;
        membro.dadosIgreja.igrejaBatizado = this.state.MembroSelecionado.dadosIgreja.igrejaBatizado;
        membro.dadosIgreja.ultimoPastor = this.state.MembroSelecionado.dadosIgreja.ultimoPastor;
        membro.dadosIgreja.ultimaIgreja = this.state.MembroSelecionado.dadosIgreja.ultimaIgreja;
        membro.ministeriosMembro = this.state.MembroSelecionado.ministeriosMembro;
        console.log(membro);
        this.setState({
            carregando: true
        });
        let data = await api.post("/membro/salvar",  membro);

        NotificationManager.success("Membro salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            todosMinisteriosSelecionados: false,
            MembroSelecionado: {
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
                    ultimaIgreja: ""
                },
                ministeriosMembro: [{
                    id: "",
                    chEsMembro: "",
                    chEsMinisterio: "",
                    checked: false
                }],
                chEsContato: "",
                chEsEndereco: "",
                chEsIgreja: ""
            },
            error: data
        });

        this.fetchMembro();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");
        
        if(subItem) {
            this.setState({
                MembroSelecionado: {
                    ...this.state.MembroSelecionado,
                    [item]: {
                        ...this.state.MembroSelecionado[item],
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                MembroSelecionado: {
                    ...this.state.MembroSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleChangeMinisterio = async event => {
        let ministerio = this.state.MembroSelecionado.ministeriosMembro.filter((ministerio) => {
            return (ministerio.chEsMinisterio === event.target.value)
        });
        let ministerios = this.state.MembroSelecionado.ministeriosMembro.filter((ministerio) => {
            return (ministerio.chEsMinisterio !== event.target.value)
        });
        
        let novoMinisterio = new MinisterioMembro();
        novoMinisterio.id = ministerio[0] ? ministerio[0].id : 0;
        novoMinisterio.chEsMembro = this.state.MembroSelecionado.id;
        novoMinisterio.chEsMinisterio = ministerio[0] ? ministerio[0].chEsMministerio : event.target.value;
        novoMinisterio.checked = ministerio[0] ? !ministerio[0].checked : true;
        
        await ministerios.push(novoMinisterio);

        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                ministeriosMembro: ministerios
            }
        });
    }

    handleLimpar = () => {
        this.setState({
            todosMinisteriosSelecionados: false,
            MembroSelecionado: {
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
                    ultimaIgreja: ""
                },
                ministeriosMembro: [{
                    id: "",
                    chEsMembro: "",
                    chEsMinisterio: "",
                    checked: false
                }],
                chEsContato: "",
                chEsEndereco: "",
                chEsIgreja: ""
            }
        });
    }

    handleBlur = async evento => {
        let data = await fetch("https://viacep.com.br/ws/" + evento.target.value + "/json/");
        data = await data.json();

        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                endereco: {
                    logradouro: data.logradouro,
                    cidade: data.localidade,
                    estado: data.uf
                }
            }
        })
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    remover = async (id) => {
        let data = await api.delete("/membro/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Membro removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o membro!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    selecionarSugestao = (membro) => {
        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                chEsConjuge: membro.id,
                conjuge: membro.nome,
                endereco: {
                    ...this.state.MembroSelecionado.endereco,
                    id: membro.endereco.id,
                    cep: membro.endereco.cep,
                    cidade: membro.endereco.cidade,
                    estado: membro.endereco.estado,
                    logradouro: membro.endereco.logradouro,
                    complemento: membro.endereco.complemento
                }
            }
        });
    }

    rowExpansionTemplate(data) {
        let estadoCivil = listaEstadoCivil.filter((item) => {
            return (
                item.id === Number(data.estadoCivil) ? item : null
            )})

        estadoCivil = estadoCivil[0]
        
        return  (
            <>
            <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
                    <a className="nav-link active lista" href={"#pessoal" + data.id} role="tab" data-toggle="tab">Dados Pessoais</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#contato" + data.id} role="tab" data-toggle="tab">Contato</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#endereco" + data.id} role="tab" data-toggle="tab">Endereço</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#igreja" + data.id} role="tab" data-toggle="tab">Dados Igreja</a>
                </li>
            </ul>
            <div className="tab-content mt-2" style={{ minHeight: '23vh' }}>
                <div className="tab-pane fade show active lista" id={"pessoal" + data.id} role="tabpanel">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">Nome:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.nome}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">RG:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.rg}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Data de Nascimento:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{Utils.converteData(data, "dataNascimento")}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Sexo:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.sexo === "1" ? "Homem" : "Mulher"}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Profissão:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.profissao}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Estado Civil:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>
                                {estadoCivil.descricao}
                            </div>
                        </div>
                        {Number(data.estadoCivil) === 2 ?
                            <div className="col-md-6">
                                <div className="h6">Conjuge:</div>
                                <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.conjuge}</div>
                            </div>
                        : null }
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"contato" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">E-mail:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.email}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Telefone:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.telefone}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Celular:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.celular}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"endereco" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">CEP:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.cep}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Logradouro:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.logradouro + ", " + data.endereco.complemento}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Cidade:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.cidade}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Estado:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.estado}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"igreja" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">Batizado?</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.isBatizado ? "Sim" : "Não"}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Data Batismo:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{Utils.converteData(data.dadosIgreja, "dataBatismo")}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Igreja Batizado:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.igrejaBatizado}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Ultimo Pastor:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.ultimoPastor}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Ultima Igreja:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.ultimaIgreja}</div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }

    isChecked = (item) => {
        let ministerio = this.state.MembroSelecionado.ministeriosMembro.filter((ministerio) => {
            return (ministerio.chEsMinisterio === item.id ? ministerio : null);
        });

        ministerio = ministerio.length > 0 ? ministerio[0] : null;

        return ministerio ? true : false;
    }

    selecionarTodosMinisterios = (event) => {
        let todosMinisterios = [];
        
        if(event.target.checked) {
            todosMinisterios = this.state.ministerios.map((ministerio) => {
                const novoMinisterio = new MinisterioMembro();
                novoMinisterio.id = 0;
                novoMinisterio.chEsMembro = this.state.MembroSelecionado.id;
                novoMinisterio.chEsMinisterio = ministerio.id;
                novoMinisterio.checked = true;
                return novoMinisterio;
            });
        }        
        
        this.setState({
            todosMinisteriosSelecionados: !this.state.todosMinisteriosSelecionados,
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                ministeriosMembro: todosMinisterios
            }
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="membro" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovoMembro ministerios={this.state.ministerios} membro={this.state.MembroSelecionado} handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange} handleLimpar={this.handleLimpar} handleBlur={this.handleBlur} sugestoes={this.state.sugestoes}
                            sugestaoSelecionada={this.selecionarSugestao} isChecked={this.isChecked} handleCheck={this.handleChangeMinisterio}
                            selecionarTodos={this.selecionarTodosMinisterios} todosMinisteriosSelecionados={this.state.todosMinisteriosSelecionados} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.MembroSelecionado} onSelectionChange={this.onClick} expandedRows={this.state.expandedRows} 
                            onRowToggle={(e) => this.setState({expandedRows:e.data})} rowExpansionTemplate={this.rowExpansionTemplate} dataKey="id">
                                <Column expander={true} />
                                <Column field="id" header="ID" />
                                <Column field="nome" header="Nome" />
                                <Column field="contato.email" header="E-mail" />
                                <Column field="contato.telefone" header="Telefone" />
                                <Column field="contato.celular" header="Celular" />
                                <Column field="dataNascimento" header="Data de Nascimento" body={ (rowData) => Utils.converteData(rowData, "dataNascimento")} />
                                <Column field="id" header="Opções" body={this.opcoes} />
                            </DataTable>
                            {this.state.carregando && <Carregando />}
                        </Collapse>
                    </div>
                </div>
            </>
        )
    }
}

export default Membros;