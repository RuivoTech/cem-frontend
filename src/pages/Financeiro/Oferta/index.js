import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovaOferta from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Oferta from "./Oferta";
import Utils from '../../../componentes/Utils';

class Ofertas extends Component {

    state = {
        carregando: false,
        data: [Oferta],
        OfertaSelecionada: Oferta,
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Ofertas - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchOferta();        
    }

    fetchOferta = async () => {
        let data = await api.get("/oferta/listar");
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
            OfertaSelecionada: e.value,
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

        const oferta = this.state.OfertaSelecionada;
        this.setState({
            carregando: true
        });
        let data = await api.post("/oferta/salvar",  oferta);

        NotificationManager.success("Oferta salva com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            OfertaSelecionada: Oferta,
            error: data
        });

        this.fetchOferta();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                OfertaSelecionada: {
                    ...this.state.OfertaSelecionada,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                OfertaSelecionada: {
                    ...this.state.OfertaSelecionada,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/oferta/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Oferta removida com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o oferta!", 'Erro');
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
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="Oferta" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row text-center">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovaOferta data={this.state.OfertaSelecionada} handleChange={this.handleChange} 
                            mostrarBotao="true" />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.OfertaSelecionada} onSelectionChange={this.onClick} >
                                <Column field="id" header="ID" />
                                <Column field="dataOferta" header="Data" body={ (rowData) => Utils.converteData(rowData, "dataOferta")} />
                                <Column field="valorOferta" header="Valor" />
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

export default Ofertas;