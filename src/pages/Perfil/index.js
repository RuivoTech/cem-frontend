import React, { Component } from "react";

import { getSession } from "../../services/auth";
import Usuario from "./Usuario";
import api from "../../services/api";
import Menu from "../../componentes/Menu";

class Perfil extends Component {
    state = {
        data: [Usuario],
        error: ""
    }

    async componentDidMount() {
        const usuario = getSession();
        let data = await api.get("/usuario/localizar", usuario.id);

        this.setState({
            data
        });
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                data: {
                    ...this.state.data,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    render() {
        const usuario = this.state.data;
        const { toggleSidebar } = this.props;
        return (
            <>
            <div className="menu">
                <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="visitante" 
                pesquisa={this.pesquisa} />
            </div>
            <div className="container-fluid">
                <form className="tab-content text-left">
                    <input type="hidden" id="id" name="id" />
                    <div className="tab-pane active" id="tabOferta" role="tabpanel">
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label htmlFor="nome">Nome:</label>
                                <input className="form-control" type="text" name="nome" id="nome" value={usuario.nome} 
                                onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="email">E-mail:</label>
                                <input className="form-control" type="text" name="email" id="email" value={usuario.email} 
                                onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="botoes">
                        <hr className="bg-white" />
                        <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-success btn-lg btn-block" type="submit">Salvar</button> 
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary btn-lg btn-block" type="button" onClick={this.handleLimpar} >Limpar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default Perfil;