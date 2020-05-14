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

const visitante = new Visitante();

class Visitantes extends Component {

    state = {
        carregando: false,
        data: [],
        VisitanteSelecionado: {},
        isOpen: true,
        tabelaEstaAberta: true,
        error: "",
        expandedRows: null
    }

    async componentDidMount(){
        document.title = "Visitantes - Cadastro de membros CEM";
        this.setState({
            carregando: true,
            data: [visitante],
            VisitanteSelecionado: visitante
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

        const visitanteSelecionado = this.state.VisitanteSelecionado;
        this.setState({
            carregando: true
        });
        let data = await api.post("/visitante/salvar",  visitanteSelecionado);


        NotificationManager.success("Visitante salvo com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            VisitanteSelecionado: visitante,
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
            VisitanteSelecionado: visitante
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

    rowExpansionTemplate(data) {        
        return  (
            <>
            <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
                    <a className="nav-link active lista" href={"#pessoal" + data.id} role="tab" data-toggle="tab">Dados Pessoais</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#contato" + data.id} role="tab" data-toggle="tab">Contato</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#endereco" + data.id} role="tab" data-toggle="tab">Endereço</a>
                </li>
            </ul>
            <div className="tab-content mt-2" style={{ minHeight: '23vh' }}>
                <div className="tab-pane fade show active lista" id={"pessoal" + data.id} role="tabpanel">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">Nome:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.nome}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Deseja uma visita?</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.visita ? "Sim" : "Não"}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Data de Visita:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{Utils.converteData(data, "dataVisita")}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Religião:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.religiao}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"contato" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">E-mail:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.email}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Telefone:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.telefone}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Celular:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.celular}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"endereco" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">CEP:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.cep}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Logradouro:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.logradouro + ", " + data.complemento}</div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
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
                            selection={this.state.VisitanteSelecionado} onSelectionChange={this.onClick} expandedRows={this.state.expandedRows} 
                            onRowToggle={(e) => this.setState({expandedRows:e.data})} rowExpansionTemplate={this.rowExpansionTemplate} dataKey="id">
                                <Column expander={true} />
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