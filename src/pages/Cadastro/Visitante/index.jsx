import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoVisitante from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Utils from '../../../componentes/Utils';
import Visitante from "./Visitante";

class Visitantes extends Component {

    state = {
        carregando: false,
        data: [Visitante],
        VisitanteSelecionado: Visitante,
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Visitantes - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchVisitante();        
    }

    fetchVisitante = async () => {
        let data = await api.get("/visitante/listar");
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

        console.log(e.value);
        this.setState({
            VisitanteSelecionado: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta,
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const visitante = this.state.VisitanteSelecionado;
        this.setState({
            carregando: true
        });
        let data = await api.post("/visitante/salvar",  visitante);


        NotificationManager.success("Visitante salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            VisitanteSelecionado: Visitante,
            error: data
        });

        this.fetchVisitante();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                VisitanteSelecionado: {
                    ...this.state.VisitanteSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                VisitanteSelecionado: {
                    ...this.state.VisitanteSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleBlur = async evento => {
        let data = await fetch("https://viacep.com.br/ws/" + evento.target.value + "/json/");
        data = await data.json();

        this.setState({
            VisitanteSelecionado: {
                ...this.state.VisitanteSelecionado,
                endereco: {
                    logradouro: data.logradouro,
                    cidade: data.localidade,
                    estado: data.uf
                }
            }
        })
    }

    handleLimpar = () => {
        this.setState({
            VisitanteSelecionado: Visitante
        });
    }

    getEndereco = (rowData, column) => {
        return rowData.logradouro ? rowData.logradouro + ", " + rowData.complemento : null;
    }

    remover = async (id) => {
        let data = await api.delete("/visitante/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Visitante removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o visitante!", 'Erro');
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
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="visitante" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovoVisitante data={this.state.VisitanteSelecionado} handleChange={this.handleChange} 
                            handleBlur={this.handleBlur} handleSubmit={this.handleSubmit} mostrarBotao="true" />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.VisitanteSelecionado} onSelectionChange={this.onClick} >
                                <Column field="nome" header="Nome" />
                                <Column field="email" header="E-mail" />
                                <Column field="telefone" header="Telefone" />
                                <Column field="celular" header="Celular" />
                                <Column field="dataVisita" header="Data visita" body={ (rowData) => Utils.converteData(rowData, "dataVisita") } />
                                <Column field="logradouro" header="Endereço" body={this.getEndereco} />
                                <Column field="religiao" header="Religião" />
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

export default Visitantes;