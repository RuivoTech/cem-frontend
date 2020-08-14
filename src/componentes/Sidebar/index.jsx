import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import jwt from "jsonwebtoken";

import Usuario from "../Usuario";
import api from "../../services/api";
import { getSession } from "../../services/auth";

const Sidebar = ({ onClick }) => {
    const [usuario, setUsuario] = useState({
        id: "",
        nome: "",
        email: "",
        permissoes: [{
            id: "",
            menuPermissao: "",
            grupoMenuPermissao: "",
            chEsUsuario: "",
            chEsMenuPermissao: "",
        }]
    });

    useEffect(() => {
        const fetchUsuario = async () => {
            const session = getSession();
            const token = jwt.decode(session.token);

            let retorno = await api.get("/usuarios/" + token.id);

            setUsuario(retorno.data);
        };

        fetchUsuario();
    }, []);

    return (
        <div className="sidebar">
            <ul className="nav flex-column flex-nowrap">
                <li className="nav-item">
                    <Usuario usuario={usuario} />
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="text-success" to="/dashboard" onClick={onClick}>
                        <i className="fa fa-tachometer"></i> <span className="d-sm-inline">Dashboard</span></NavLink>
                </li>
                {usuario.permissoes.map(permissao => {
                    return (
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="text-success"
                                to={`/${permissao.menuPermissao === "inscricoes" ? "inscricao" : permissao.menuPermissao}`}
                                onClick={onClick}
                            >
                                <span className="d-sm-inline">{permissao.descricao}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Sidebar;