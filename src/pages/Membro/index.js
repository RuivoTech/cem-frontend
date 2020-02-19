import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import api from "../../services/api";
import Membro from "./Membro";
import NovoMembro from "./form";
import Menu from "../../componentes/Menu";

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
            data
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
        this.setState({
            carregando: false,
            error: data
        })
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

        console.log(this.state.MembroSelecionado);
    }

    handleLimpar = () => {
        this.setState({
            MembroSelecionado: Membro
        });
    }

    dataNascimento = (rowData, column) => {
        let dataNascimento = rowData.dataNascimento;
        const [ ano, mes, dia ] = dataNascimento.split("-");

        return dataNascimento.length > 0 ? ( dia + '/' + mes + '/' + ano ) : ( null );
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="membro" 
                    pesquisa={this.pesquisa} />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoMembro ministerios={this.state.ministerios} membro={this.state.MembroSelecionado} handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange} handleLimpar={this.handleLimpar} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.MembroSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="contato.email" header="E-mail" />
                            <Column field="contato.telefone" header="Telefone" />
                            <Column field="contato.celular" header="Celular" />
                            <Column field="dataNascimento" header="Data de Nasccimento" body={this.dataNascimento} />
                        </DataTable>
                        {this.state.carregando && 
                        <div className="text-center text-success">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default Membros;