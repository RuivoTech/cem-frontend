import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

class Usuario extends Component {

    separarString = (string, quantidadeRetorno) => {
        let stringSplit = string.split(" ");
        let retorno = "";
        for ( let i = 0; i < quantidadeRetorno; i++) {
            retorno = retorno + " " + stringSplit[i];
        }

        return retorno;
    }

    render() {
        const { usuario } = this.props;
        return (
            <div className="col">
                <div className="user-info card">
                    <span className="user-name">{this.separarString(usuario.nomeUsuario, 2)}</span>
                    <span className="user-email">{usuario.email}</span>
                    <Link className="user-logout" to="#" onClick={logout}>
                        <i className="fa fa-sign-out"></i> <span className="d-sm-inline">Sair</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Usuario;