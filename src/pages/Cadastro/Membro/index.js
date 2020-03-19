import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from  "react-notifications";

import Carregando from "../../../componentes/Carregando";
import api from "../../../services/api";
import Membro from "./Membro";
import NovoMembro from "./form";
import Menu from "../../../componentes/Menu";
import Utils from '../../../componentes/Utils';

class Membros extends Component {

    state = {
        carregando: false,
        data: [Membro],
        ministerios: [{
            id: "",
            nome: "",
            descricao: ""
        }],
        MembroSelecionado: Membro,
        sugestoes: [Membro.nome],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Membros - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchMinisterios();        
    }

    fetchMinisterios = async () => {
        let data = await api.get("/ministerio/listar");
        this.setState({
            ministerios: data
        });

        await this.fetchMembro();
    }

    fetchMembro = async () => {
        let data = await api.get("/membro/listar");

        this.setState({
            carregando: false,
            data,
            sugestoes: data
        });
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            MembroSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const membro = this.state.MembroSelecionado;
        this.setState({
            carregando: true
        });
        let data = await api.post("/membro/salvar",  membro);

        NotificationManager.success("Membro salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            MembroSelecionado: Membro,
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

    handleLimpar = () => {
        this.setState({
            MembroSelecionado: Membro
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

    selecionarSugestao = event => {
        let conjugeSelecionado = this.state.data.filter(conjuge => {
            return conjuge.id === event.currentTarget.id ? conjuge : null;
        });
        conjugeSelecionado = conjugeSelecionado[0];
        
        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                chEsConjuge: conjugeSelecionado.id,
                conjuge: conjugeSelecionado.nome
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
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoMembro ministerios={this.state.ministerios} membro={this.state.MembroSelecionado} handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange} handleLimpar={this.handleLimpar} handleBlur={this.handleBlur} sugestoes={this.state.sugestoes}
                        sugestaoSelecionada={this.selecionarSugestao} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.MembroSelecionado} onSelectionChange={this.onClick} >
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
            </>
        )
    }
}

export default Membros;