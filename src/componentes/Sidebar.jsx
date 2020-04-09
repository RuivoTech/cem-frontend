import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Usuario from "./Usuario";

class Sidebar extends Component {
    render(){
        const { onClick } = this.props;
        return (
            <ul className="nav flex-column flex-nowrap">
                <li className="nav-item">
                    <Usuario />
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="text-success" to="/home" onClick={onClick}>
                        <i className="fa fa-home"></i> <span className="d-sm-inline">Home</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#cadastro">
                        <i className="fa fa-table"></i> <span className="d-sm-inline">Cadastro</span>
                    </NavLink>
                    <div className="collapse" id="cadastro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/membro" onClick={onClick}>
                                    <span>Membro</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/visitante" onClick={onClick}>
                                    <span>Visitante</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/ministerio" onClick={onClick}>
                                    <span>Ministerio</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/evento">
                                    <span>Evento</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#financeiro">
                        <i className="fa fa-dollar"></i> <span className="d-sm-inline">Financeiro</span>
                    </NavLink>
                    <div className="collapse" id="financeiro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/dizimo">
                                    <span>Dizimo</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/oferta">
                                    <span>Oferta</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/inscricoes">
                                    <span>Inscrições</span>
                                </NavLink>
                            </li>
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
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#relatorio">
                        <i className="fa fa-file-text-o"></i> <span className="d-sm-inline">Relatório</span>
                    </NavLink>
                    <div className="collapse" id="relatorio" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/membro">
                                    <span>Membro</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/dizimo">
                                    <span>Dizimo</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/oferta">
                                    <span>Oferta</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/inscricoes">
                                    <span>Inscrições</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#configuracoes">
                        <i className="fa fa-cog"></i> <span className="d-sm-inline">Configurações</span>
                    </NavLink>
                    <div className="collapse" id="configuracoes" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/perfil">
                                    <span><i className="fa fa-user"></i> Perfil</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/permissao">
                                    <span><i className="fa fa-key"></i> Permissão</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/logs">
                                    <span><i className="fa fa-long-arrow-right"></i> Logs</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        )
    }
}


export default Sidebar;