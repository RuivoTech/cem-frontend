import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoAluno from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Aluno from "./Aluno";

class Alunos extends Component {

    state = {
        carregando: false,
        data: [{
            id: 0,
            nome: "",
            email: "",
            rg: "",
            telefone: "",
            endereco: ""
        }],
        AlunoSelecionado: {
            id: 0,
            nome: "",
            email: "",
            rg: "",
            telefone: "",
            endereco: ""
        },
        sugestoes: [],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Alunos - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchMembro();        
    }

    fetchMembro = async () => {
        let data = await api.get("/membro/listar");

        this.setState({
            sugestoes: data
        });

        await this.fetchAlunos();
    };

    fetchAlunos = async () => {
        let data = await api.get("/aluno/listar");

        this.setState({
            carregando: false,
            data
        });
    }

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            AlunoSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let aluno = new Aluno();

        aluno.id = this.state.AlunoSelecionado.id;
        aluno.nome = this.state.AlunoSelecionado.nome;
        aluno.email = this.state.AlunoSelecionado.email;
        aluno.rg = this.state.AlunoSelecionado.rg;
        aluno.telefone = this.state.AlunoSelecionado.telefone;
        aluno.endereco = this.state.AlunoSelecionado.endereco;

        this.setState({
            carregando: true
        });
        let data = await api.post("/aluno/salvar",  aluno);

        NotificationManager.success("Aluno salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            AlunoSelecionado: {
                id: 0,
                nome: "",
                email: "",
                rg: "",
                telefone: "",
                endereco: ""
            },
            error: data
        });

        this.fetchAlunos();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                AlunoSelecionado: {
                    ...this.state.AlunoSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                AlunoSelecionado: {
                    ...this.state.AlunoSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/aluno/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Aluno removida com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o aluno!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    selecionarSugestao = event => {
        let alunoSelecionado = this.state.sugestoes.filter(aluno => {
            return aluno.id === event.currentTarget.id ? aluno : null;
        });

        alunoSelecionado = alunoSelecionado[0];
        
        this.setState({
            AlunoSelecionado: {
                ...this.state.AlunoSelecionado,
                nome: alunoSelecionado.nome,
                email: alunoSelecionado.contato.email,
                telefone: alunoSelecionado.contato.celular,
                rg: alunoSelecionado.rg,
                endereco: alunoSelecionado.endereco.logradouro + ", " + alunoSelecionado.endereco.complemento
            }
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="Dizimo" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row text-center">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovoAluno data={this.state.AlunoSelecionado} handleChange={this.handleChange} sugestoes={this.state.sugestoes}
                            handleLimpar={this.handleLimpar} sugestaoSelecionada={this.selecionarSugestao} handleSubmit={this.handleSubmit} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.AlunoSelecionado} onSelectionChange={this.onClick} >
                                <Column field="id" header="ID" />
                                <Column field="nome" header="Nome" />
                                <Column field="email" header="E-mail" />
                                <Column field="rg" header="RG" />
                                <Column field="telefone" header="Telefone" />
                                <Column field="endereco" header="Endereço" /> 
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

export default Alunos;