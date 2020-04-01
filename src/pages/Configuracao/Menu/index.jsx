import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoItemMenu from "./form";
import Menu from "./Menu";
import MenuSuperior from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';

class ItemMenu extends Component {

    state = {
        carregando: false,
        data: [Menu],
        MenuSelecionado: Menu,
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Menu - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchMenu();        
    }

    fetchMenu = async () => {
        let data = await api.get("/menu/listar");
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
            MenuSelecionado: e.value,
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

        const menu = this.state.MenuSelecionado;
        this.setState({
            carregando: true
        });
        let data = await api.post("/menu/salvar",  menu);


        NotificationManager.success("Menu salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            MenuSelecionado: Menu,
            error: data
        });
        this.fetchMenu();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                MenuSelecionado: {
                    ...this.state.MenuSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                MenuSelecionado: {
                    ...this.state.MenuSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleLimpar = () => {
        this.setState({
            MenuSelecionado: Menu
        });
    }

    remover = async (id) => {
        let data = await api.delete("/menu/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Menu removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o menu!", 'Erro');
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
                    <MenuSuperior toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="menu" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoItemMenu data={this.state.MenuSelecionado} handleChange={this.handleChange} mostrarBotao="true"
                        handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.MenuSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="subItem" header="Sub Item" />
                            <Column field="id" header="Opções" body={this.opcoes} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default ItemMenu;