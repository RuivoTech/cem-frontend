import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSession, logout } from "../services/auth";

class Usuario extends Component {

    state = {
        nome: "",
        email: "",
        nivel: ""
    }

    componentDidMount() {
        const data = getSession();

        this.setState({
            nome: this.separarString(data.nome, 2),
            email: data.email,
            nivel: data.tipoUsuario
        });
    }

    separarString = (string, quantidadeRetorno) => {
        let stringSplit = string.split(" ");
        let retorno = "";
        for ( let i = 0; i < quantidadeRetorno; i++) {
            retorno = retorno + " " + stringSplit[i];
        }

        return retorno;
    }

    render() {
        return (
            <div className="col">
                <div className="user-info card">
                    <span className="user-name">{this.state.nome}</span>
                    <span className="user-email">{this.state.email}</span>
                    <span className="user-role">{this.state.nivel}</span>
                    <Link className="user-logout" to="#" onClick={logout}>
                        <i className="fa fa-sign-out"></i> <span className="d-sm-inline">Sair</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Usuario;