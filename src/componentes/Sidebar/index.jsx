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
            
            setUsuario(retorno.data)
        };

        fetchUsuario();
    }, []);



    const mostrarItem = (permissao, nomeItem, grupoPermissao) => {

        return permissao.menuPermissao === nomeItem && permissao.grupoMenuPermissao === grupoPermissao && permissao.visualizar;
    }
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
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#cadastro">
                        <i className="fa fa-table"></i> <span className="d-sm-inline">Cadastro</span>
                    </NavLink>
                    <div className="collapse" id="cadastro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            {usuario.permissoes.map((permissao) => {
                                return (
                                    <>
                                        {mostrarItem(permissao, "membro", "cadastro") ?
                                            <li key={permissao.id} className="nav-item mx-2">
                                                <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/membro" onClick={onClick}>
                                                    <span>Membro</span>
                                                </NavLink>
                                            </li> :
                                            mostrarItem(permissao, "visitante", "cadastro") ?
                                                <li key={permissao.id} className="nav-item mx-2">
                                                    <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/visitante" onClick={onClick}>
                                                        <span>Visitante</span>
                                                    </NavLink>
                                                </li> :
                                                mostrarItem(permissao, "ministerio", "cadastro") ?
                                                    <li key={permissao.id} className="nav-item mx-2">
                                                        <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/ministerio" onClick={onClick}>
                                                            <span>Ministerio</span>
                                                        </NavLink>
                                                    </li> :
                                                    mostrarItem(permissao, "evento", "cadastro") ?
                                                        <li key={permissao.id} className="nav-item mx-2">
                                                            <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/evento">
                                                                <span>Evento</span>
                                                            </NavLink>
                                                        </li> : null}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#financeiro">
                        <i className="fa fa-dollar"></i> <span className="d-sm-inline">Financeiro</span>
                    </NavLink>
                    <div className="collapse" id="financeiro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            {usuario.permissoes.map((permissao) => {
                                return (
                                    <>
                                        {mostrarItem(permissao, "dizimo", "financeiro") ?
                                            <li key={permissao.id} className="nav-item mx-2">
                                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/dizimo">
                                                    <span>Dizimo</span>
                                                </NavLink>
                                            </li> : mostrarItem(permissao, "oferta", "financeiro") ?
                                                <li key={permissao.id} className="nav-item mx-2">
                                                    <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/oferta">
                                                        <span>Oferta</span>
                                                    </NavLink>
                                                </li> : mostrarItem(permissao, "inscricoes", "financeiro") ?
                                                    <li className="nav-item mx-2">
                                                        <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/inscricoes">
                                                            <span>Inscrições</span>
                                                        </NavLink>
                                                    </li> : null}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </li>
                {/* <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#cursos">
                        <i className="fa fa-university"></i> <span className="d-sm-inline">Cursos</span>
                    </NavLink>
                    <div className="collapse" id="cursos" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/aluno">
                                    <span>Alunos</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/atividade">
                                    <span>Atividades</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/modulo">
                                    <span>Modulos</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/nota">
                                    <span>Notas</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/turma">
                                    <span>Turmas</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cursos/professor">
                                    <span>Professores</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li> */}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#configuracoes">
                        <i className="fa fa-cog"></i> <span className="d-sm-inline">Configurações</span>
                    </NavLink>
                    <div className="collapse" id="configuracoes" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            {usuario.permissoes.map((permissao) => {
                                return (
                                    <>
                                        {mostrarItem(permissao, "perfil", "configuracoes") ?
                                            <li className="nav-item mx-2">
                                                <NavLink className="nav-link" activeClassName="text-success" to="/perfil">
                                                    <span><i className="fa fa-user"></i> Perfil</span>
                                                </NavLink>
                                            </li> : mostrarItem(permissao, "usuarios", "configuracoes") ?
                                                <li className="nav-item mx-2">
                                                    <NavLink className="nav-link" activeClassName="text-success" to="/usuario">
                                                        <span><i className="fa fa-key"></i> Usuários</span>
                                                    </NavLink>
                                                </li> : mostrarItem(permissao, "logs", "configuracoes") ?
                                                    <li className="nav-item mx-2">
                                                        <NavLink className="nav-link" activeClassName="text-success" to="/logs">
                                                            <span><i className="fa fa-list-alt"></i> Logs</span>
                                                        </NavLink>
                                                    </li> : null}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}


export default Sidebar;