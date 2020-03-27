import React, { Component } from "react";

import Autocomplete from "../../../componentes/Autocomplete";
import api from "../../../services/api";
import Menu from "../../../componentes/Menu";

class Dizimos extends Component {

    state = {
        data: "",
        MembroSelecionado: {
            id: "",
            nome: ""
        },
        selecionarMembro: false
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

    handleChange = e => {
        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                [e.target.name]: e.target.value
            }
        });
    }

    membroSelecionado = event => {
        let membroSelecionado = this.state.data.filter(membro => {
            return membro.id === event.currentTarget.id ? membro : null;
        });
        membroSelecionado = membroSelecionado[0];
        
        this.setState({
            MembroSelecionado: {
                ...this.state.MembroSelecionado,
                id: membroSelecionado.id,
                nome: membroSelecionado.nome
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
                <div className="container-fluid">
                    <form className="tab-content text-left" action="https://api.ruivotech.com.br/relatorio/dizimo.php" method="GET" target="_balnk">
                        <div className="tab-pane active">
                            <div className="row">
                                <div className="col-auto col-md-4">
                                    <div className="custom-control custom-checkbox">
                                        <input className="custom-control-input" id="porMembro" name="porMembro" type="checkbox"
                                        onChange={this.mostrarCampo} />
                                        <label className="custom-control-label" htmlFor="porMembro">Filtrar por membro?</label>
                                    </div>
                                </div>
                                <div className="col-md-6"></div>
                                { this.state.selecionarMembro ? 
                                <>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="nome">Nome:</label>
                                        <Autocomplete className="form-control col-md-12" onClick={this.membroSelecionado} field="nome" 
                                            suggestions={this.state.data} value={this.state.MembroSelecionado.nome} name="nome" autoComplete="off"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="idMembro">ID:</label>
                                        <input className="form-control" name="idMembro" id="idMembro" type="text" value={this.state.MembroSelecionado.id} 
                                        readOnly onChange={this.handleChange} />
                                    </div> 
                                </> 
                                : null }
                                <div className="col-md-12"></div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="dataInicio">Data inicio:</label>
                                    <input className="form-control" name="dataInicio" id="dataInicio" type="date" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="dataFim">Data fim:</label>
                                    <input className="form-control" name="dataFim" id="dataFim" type="date" />
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
            </>
        )
    }
}

export default Dizimos;