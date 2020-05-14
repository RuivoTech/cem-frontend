import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoEvento from "./form";
import Evento from "../../../Model/Evento";
import Menu from "../../../componentes/Menu";
import Utils from '../../../componentes/Utils';

class Eventos extends Component {

    state = {
        carregando: false,
        data: [],
        EventoSelecionado: {},
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        const evento = new Evento();
        document.title = "Eventos - Cadastro de membros CEM";
        this.setState({
            carregando: true,
            data: [evento],
            EventoSelecionado: evento
        })
        await this.fetchEvento();        
    }

    fetchEvento = async () => {
        let data = await api.get("/evento/listar");
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
            EventoSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    eventoAtivo = (rowData, column) => {
        return rowData[column.field] === "1" ? "Sim" : "Não";
    }

    converteData = (rowData, column) => {
        const data = rowData[column.field];
        if(data.length > 0) {
            const [ ano, mes, dia ] = data.split("-");

            return data.length > 0 && ano !== "0000" ? ( dia + '/' + mes + '/' + ano ) : ( null );
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        let evento = new Evento();

        evento.id = this.state.EventoSelecionado.id;
        evento.ativo = this.state.EventoSelecionado.ativo;
        evento.dataInicio = this.state.EventoSelecionado.dataInicio;
        evento.dataFim = this.state.EventoSelecionado.dataFim;
        evento.descricao = this.state.EventoSelecionado.descricao;
        evento.valor = this.state.EventoSelecionado.valor;

        this.setState({
            carregando: true
        });
        let data = await api.post("/evento/salvar",  evento);

        NotificationManager.success("Evento salvo com sucesso!", "Sucesso");

        evento = new Evento();
        
        this.setState({
            carregando: false,
            EventoSelecionado: evento,
            error: data
        });

        this.fetchEvento();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                EventoSelecionado: {
                    ...this.state.EventoSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                EventoSelecionado: {
                    ...this.state.EventoSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleLimpar = () => {
        let evento = new Evento();

        evento.id = 0;
        evento.descricao = "";
        evento.dataInicio = "";
        evento.dataFim = "";
        evento.valor = "";

        this.setState({
            EventoSelecionado: evento
        });
    }

    remover = async (id) => {
        let data = await api.delete("/evento/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Evento removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o evento!", 'Erro');
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
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="evento" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovoEvento data={this.state.EventoSelecionado} handleChange={this.handleChange} handleLimpar={this.handleLimpar}
                            handleSubmit={this.handleSubmit} mostrarBotao="true" />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.EventoSelecionado} onSelectionChange={this.onClick} >
                                <Column field="id" header="ID" />
                                <Column field="descricao" header="Descrição" />
                                <Column field="ativo" header="Ativo" body={this.eventoAtivo} />
                                <Column field="dataInicio" header="Data Inicio" body={ (rowData) => Utils.converteData(rowData, "dataInicio")} />
                                <Column field="dataFim" header="Data fim" body={ (rowData) => Utils.converteData(rowData, "dataFim")} />
                                <Column field="valor" header="Valor" />
                                <Column field="id" header="Opções" body={this.opcoes} />
                            </DataTable>
                            {this.state.carregando && 
                            <div className="text-center text-success">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                        </Collapse>
                    </div>
                </div>
            </>
        )
    }
}

export default Eventos;