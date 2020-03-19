import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoMinisterio from "./form";
import Ministerio from "./Ministerio";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';

class Ministerios extends Component {

    state = {
        carregando: false,
        data: [Ministerio],
        MinisterioSelecionado: Ministerio,
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

    handleSubmit = async e => {
        e.preventDefault();

        const ministerio = this.state.MinisterioSelecionado;
        this.setState({
            carregando: true
        });
        let data = await api.post("/ministerio/salvar",  ministerio);


        NotificationManager.success("Ministerio salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            MinisterioSelecionado: Ministerio,
            error: data
        });
        this.fetchMinisterio();
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

    handleLimpar = () => {
        this.setState({
            MinisterioSelecionado: Ministerio
        });
    }

    remover = async (id) => {
        let data = await api.delete("/ministerio/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Ministerio removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o ministerio!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="ministerio" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoMinisterio data={this.state.MinisterioSelecionado} handleChange={this.handleChange} mostrarBotao="true"
                        handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.MinisterioSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="descricao" header="Descrição" />
                            <Column field="id" header="Opções" body={this.opcoes} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default Ministerios;