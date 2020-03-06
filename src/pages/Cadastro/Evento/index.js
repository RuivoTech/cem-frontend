import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoEvento from "./form";
import Menu from "../../../componentes/Menu";

class Evento extends Component {

    state = {
        carregando: false,
        data: [{
            id: "",
            ativo: "",
            dataInicio: "",
            dataFim: "",
            descricao: "",
            valor: ""
        }],
        EventoSelecionado: {
            id: "",
            ativo: "",
            dataInicio: "",
            dataFim: "",
            descricao: "",
            valor: ""
        },
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Eventos - Cadastro de membros CEM";
        this.setState({
            carregando: true
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

            return data.length > 0 ? ( dia + '/' + mes + '/' + ano ) : ( null );
        }
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
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovoEvento data={this.state.EventoSelecionado} handleChange={this.handleChange} mostrarBotao="true" />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.EventoSelecionado} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="descricao" header="Descrição" />
                            <Column field="ativo" header="Ativo" body={this.eventoAtivo} />
                            <Column field="dataInicio" header="Data Inicio" body={this.converteData} />
                            <Column field="dataFim" header="Data fim" body={this.converteData} />
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
            </>
        )
    }
}

export default Evento;