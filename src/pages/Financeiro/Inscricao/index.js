import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovaInscricao from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Inscricao from "./Inscricao";

class Inscricoes extends Component {

    state = {
        carregando: false,
        data: [Inscricao],
        eventos: [{
            id: 0,
            ativo: "",
            dataIicio: "",
            dataFim: "",
            descricao: "",
            valor: ""
        }],
        InscricaoSelecionada: Inscricao,
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Inscrições - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchEvento();        
    }

    fetchEvento = async () => {
        let data = await api.get("/evento/listar");
        this.setState({
            eventos: data
        });

        await this.fetchInscricao();
    }

    fetchInscricao = async () => {
        let data = await api.get("/inscricao/listar");
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
            InscricaoSelecionada: e.value,
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
                InscricaoSelecionada: {
                    ...this.state.InscricaoSelecionada,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/inscricao/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Inscrição removida com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o inscrição!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    pago = (rowData, column) => {
        return rowData.pago === "1" ? "Sim" : "Não";
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="inscrição" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovaInscricao data={this.state.InscricaoSelecionada} handleChange={this.handleChange} 
                        eventos={this.state.eventos} mostrarBotao="true" />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.InscricaoSelecionada} onSelectionChange={this.onClick} >
                            <Column field="id" header="ID" />
                            <Column field="nome" header="Nome" />
                            <Column field="email" header="E-mail" />
                            <Column field="celular" header="Celular" />
                            <Column field="evento" header="Evento" />
                            <Column field="pago" header="Pago" body={this.pago} />
                            <Column field="id" header="Opções" body={this.opcoes} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default Inscricoes;