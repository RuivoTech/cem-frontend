import React, { Component } from "react";

import Autocomplete from "../../../componentes/Autocomplete";
import api, { URL } from "../../../services/api";
import Menu from "../../../componentes/Menu";
import { NotificationManager } from "react-notifications";

class Dizimos extends Component {

    state = {
        data: "",
        MembroSelecionado: {
            id: "",
            nome: ""
        },
        urlValue: {}
    }

    async componentDidMount(){
        document.title = "Relatório de Dizimos - Cadastro de membros CEM";
        await this.fetchMembro();        
    }

    fetchMembro = async () => {
        let data = await api.get("/membro/listar");
        this.setState({
            data
        })
    };

    mostrarCampo = () => {
        this.setState({
            selecionarMembro: !this.state.selecionarMembro
        })
    }

    handleChange = event => {
        let valor = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        
        this.setState({
            urlValue: {
                ...this.state.urlValue,
                [event.target.name]: valor
            }
        });

        if(event.target.type === "checkbox" && !event.target.checked){
            this.setState({
                urlValue: {
                    ...this.state.urlValue,
                    [event.target.name]: valor,
                    nome: "",
                    id: ""
                }
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        let params = this.state.urlValue;

        if(this.state.urlValue.porMembro && !this.state.urlValue.id){
            NotificationManager.warning("Por favor, Escolha um membro!", "Alerta");
            return;
        }

        if(this.state.urlValue.dataInicio && !this.state.urlValue.dataFim) {
            NotificationManager.warning("Por favor, Preencha Data Até!", "Alerta");
            return;
        }

        if(this.state.urlValue.dataFim && !this.state.urlValue.dataInicio) {
            NotificationManager.warning("Por favor, Preencha Data De!", "Alerta");
            return;
        }
        
        let urlValue = Object.keys(params).map(key => {
            return params[key] !== "" ? key + '=' + params[key] + "&" : null
        } ).join();

        window.open(URL + "/relatorio/dizimo.php?" + urlValue, "_blank");
    }

    membroSelecionado = event => {
        let membroSelecionado = this.state.data.filter(membro => {
            return membro.id === event.currentTarget.id ? membro : null;
        });
        membroSelecionado = membroSelecionado[0];
        
        this.setState({
            urlValue: {
                ...this.state.urlValue,
                nome: membroSelecionado.nome,
                id: membroSelecionado.id
            }
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleSidebar={toggleSidebar} componente="dizimo" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <form className="tab-content text-left" onSubmit={this.handleSubmit}>
                            <div className="tab-pane active">
                                <div className="row">
                                    <div className="col-auto col-md-4">
                                        <div className="custom-control custom-checkbox">
                                            <input className="custom-control-input" id="porMembro" name="porMembro" type="checkbox"
                                            onChange={this.handleChange} />
                                            <label className="custom-control-label" htmlFor="porMembro">Filtrar por membro?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6"></div>
                                    { this.state.urlValue.porMembro ? 
                                    <>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nome">Nome:</label>
                                            <Autocomplete className="form-control col-md-12" onClick={this.membroSelecionado} field="nome" 
                                                suggestions={this.state.data} value={this.state.urlValue.nome} name="nome" autoComplete="off"
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="idMembro">ID:</label>
                                            <input className="form-control" name="idMembro" id="idMembro" type="text" readOnly
                                            value={this.state.urlValue.id} onChange={this.handleChange} />
                                        </div> 
                                    </> 
                                    : null }
                                    <div className="col-md-12"></div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dataInicio">Data inicio:</label>
                                        <input className="form-control" name="dataInicio" id="dataInicio" type="date" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dataFim">Data fim:</label>
                                        <input className="form-control" name="dataFim" id="dataFim" type="date" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="botoes">
                                <hr className="bg-white" />
                                <div className="row">
                                    <div className="col-md-2">
                                        <button className="btn btn-success btn-lg btn-block" type="submit">Gerar Relatório</button> 
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Dizimos;