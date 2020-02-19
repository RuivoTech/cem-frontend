import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import api from "../../services/api";
import NovoMinisterio from "./form";
import Menu from "../../componentes/Menu";

class Ministerio extends Component {

    state = {
        carregando: false,
        data: [{
            id: "",
            nome: "",
            descricao: "",
        }],
        MinisterioSelecionado: {
            id: "",
            nome: "",
            descricao: "",
        },
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Ministerios - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchMinisterio();        
    }

    fetchMinisterio = async () => {
        let data = await api.get("/ministerio/listar");
        this.setState({
            carregando: false,
            data
        })
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            MinisterioSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                MinisterioSelecionado: {
                    ...this.state.MinisterioSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                MinisterioSelecionado: {
                    ...this.state.MinisterioSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="ministerio" 
                    pesquisa={this.pesquisa} />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoMinisterio data={this.state.MinisterioSelecionado} handleChange={this.handleChange} mostrarBotao="true" />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.MinisterioSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="descricao" header="Descrição" />
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

export default Ministerio;