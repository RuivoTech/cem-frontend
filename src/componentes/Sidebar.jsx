import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Usuario from "./Usuario";
import api from "../services/api";
import { getSession } from "../services/auth";

class Sidebar extends Component {

    state = {
        usuario: {
            id: "",
            nomeUsuario: "",
            email: "",
            permissoes: [{
                id: "",
                menuPermissao: "",
                grupoMenuPermissao: "",
                chEsUsuario: "",
                chEsMenuPermissao: "",
            }]
        }
    }

    async componentDidMount() {
        await this.fetchUsuario();
    }

    fetchUsuario = async () => {
        const session = getSession();
        let retorno = await api.get("/usuario/localizar", session.id);
        
        this.setState({
            usuario: retorno
        })
    }

    mostrarItem = (permissao, nomeItem, grupoPermissao) => {
        
        return permissao.menuPermissao === nomeItem && permissao.grupoMenuPermissao === grupoPermissao && permissao.permissao;
    }

    render(){
        const { onClick } = this.props;
        const { permissoes } = this.state.usuario;
        return (
            <ul className="nav flex-column flex-nowrap">
                <li className="nav-item">
                    <Usuario usuario={this.state.usuario} />
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
                    {permissoes.map((permissao) => {
                        return (
                            <>
                                {this.mostrarItem(permissao, "membro", "cadastro") ?
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/membro" onClick={onClick}>
                                        <span>Membro</span>
                                    </NavLink>
                                </li> :
                                this.mostrarItem(permissao, "visitante", "cadastro") ?
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/visitante" onClick={onClick}>
                                        <span>Visitante</span>
                                    </NavLink>
                                </li> : 
                                this.mostrarItem(permissao, "ministerio", "cadastro") ?
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/ministerio" onClick={onClick}>
                                        <span>Ministerio</span>
                                    </NavLink>
                                </li>: 
                                this.mostrarItem(permissao, "evento", "cadastro") ?
                                <li className="nav-item mx-2">
                                    <NavLink className="nav-link" activeClassName="text-success" to="/cadastro/evento">
                                        <span>Evento</span>
                                    </NavLink>
                                </li>: null}
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
                        {permissoes.map((permissao) => {
                        return (
                            <>
                                {this.mostrarItem(permissao, "dizimo", "financeiro") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/dizimo">
                                    <span>Dizimo</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "oferta", "financeiro") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/oferta">
                                    <span>Oferta</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "inscricoes", "financeiro") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/financeiro/inscricoes">
                                    <span>Inscrições</span>
                                </NavLink>
                            </li>: null}
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
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#relatorio">
                        <i className="fa fa-file-text-o"></i> <span className="d-sm-inline">Relatório</span>
                    </NavLink>
                    <div className="collapse" id="relatorio" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                        {permissoes.map((permissao) => {
                        return (
                            <>
                                {this.mostrarItem(permissao, "membro", "relatorio") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/membro">
                                    <span>Membro</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "dizimo", "relatorio") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/dizimo">
                                    <span>Dizimo</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "oferta", "relatorio") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/oferta">
                                    <span>Oferta</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "inscricoes", "relatorio") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/relatorio/inscricoes">
                                    <span>Inscrições</span>
                                </NavLink>
                            </li>: null}
                            </>
                        )
                    })}
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#configuracoes">
                        <i className="fa fa-cog"></i> <span className="d-sm-inline">Configurações</span>
                    </NavLink>
                    <div className="collapse" id="configuracoes" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                        {permissoes.map((permissao) => {
                        return (
                            <>
                                {this.mostrarItem(permissao, "perfil", "configuracoes") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/perfil">
                                    <span><i className="fa fa-user"></i> Perfil</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "usuarios", "configuracoes") ?
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" activeClassName="text-success" to="/usuario">
                                    <span><i className="fa fa-key"></i> Usuários</span>
                                </NavLink>
                            </li> : this.mostrarItem(permissao, "logs", "configuracoes") ?
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
        )
    }
}


export default Sidebar;