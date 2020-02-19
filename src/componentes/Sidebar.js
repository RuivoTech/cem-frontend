import React, { Component } from "react";
import { Link } from "react-router-dom";
import Usuario from "./Usuario";

class Sidebar extends Component {
    render(){
        const { onClick } = this.props;
        return (
            <ul className="nav flex-column flex-nowrap overflow-hidden">
                <li className="nav-item">
                    <Usuario />
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-truncate" to="/home" onClick={onClick}>
                        <i className="fa fa-home"></i> <span className="d-sm-inline">Home</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#cadastro">
                        <i className="fa fa-table"></i> <span className="d-sm-inline">Cadastro</span>
                    </Link>
                    <div className="collapse" id="cadastro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item">
                                <Link className="nav-link py-0" to="/membro" onClick={onClick}>
                                    <span>Membro</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/visitante" onClick={onClick}>
                                    <span>Visitante</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ministerio" onClick={onClick}>
                                    <span>Ministerio</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/evento">
                                    <span>Evento</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#financeiro">
                        <i className="fa fa-dollar"></i> <span className="d-sm-inline">Financeiro</span>
                    </Link>
                    <div className="collapse" id="financeiro" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item">
                                <Link className="nav-link py-0" to="/dizimo">
                                    <span>Dizimo</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/oferta">
                                    <span>Oferta</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/inscricoes">
                                    <span>Inscrições</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#relatorio">
                        <i className="fa fa-file-text-o"></i> <span className="d-sm-inline">Relatório</span>
                    </Link>
                    <div className="collapse" id="relatorio" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item">
                                <Link className="nav-link py-0" to="/dizimo">
                                    <span>Dizimo</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/oferta">
                                    <span>Oferta</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/inscricoes">
                                    <span>Inscrições</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed text-truncate" to="#" data-toggle="collapse" data-target="#configuracoes">
                        <i className="fa fa-cog"></i> <span className="d-sm-inline">Configurações</span>
                    </Link>
                    <div className="collapse" id="configuracoes" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item">
                                <Link className="nav-link py-0" to="/perfil">
                                    <span>Perfil</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/nivel">
                                    <span>Nivel</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/itemMenu">
                                    <span>Menu</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logs">
                                    <span>Logs</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        )
    }
}


export default Sidebar;