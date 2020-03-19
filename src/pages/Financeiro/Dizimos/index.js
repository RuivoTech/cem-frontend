import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoDizimo from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Dizimo from "./Dizimo";
import Utils from '../../../componentes/Utils';

class Dizimos extends Component {

    state = {
        carregando: false,
        data: [Dizimo],
        DizimoSelecionado: Dizimo,
        sugestoes: [],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Dizimos - Cadastro de membros CEM";
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

        await this.fetchDizimo();
    };

    fetchDizimo = async () => {
        let data = await api.get("/dizimo/listar");

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
            DizimoSelecionado: e.value,
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
                DizimoSelecionado: {
                    ...this.state.DizimoSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                DizimoSelecionado: {
                    ...this.state.DizimoSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/dizimo/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Dizimo removida com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o dizimo!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    selecionarSugestao = event => {
        let membroSelecionado = this.state.sugestoes.filter(membro => {
            return membro.id === event.currentTarget.id ? membro : null;
        });

        membroSelecionado = membroSelecionado[0];
        
        this.setState({
            DizimoSelecionado: {
                ...this.state.DizimoSelecionado,
                idMembro: membroSelecionado.id,
                nome: membroSelecionado.nome
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
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoDizimo data={this.state.DizimoSelecionado} handleChange={this.handleChange} sugestoes={this.state.sugestoes}
                        handleLimpar={this.handleLimpar} sugestaoSelecionada={this.selecionarSugestao} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.DizimoSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="dataDizimo" header="Data" body={ (rowData) => Utils.converteData(rowData, "dataDizimo") } />
                            <Column field="valorDizimo" header="Valor" />
                            <Column field="id" header="Opções" body={this.opcoes} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default Dizimos;