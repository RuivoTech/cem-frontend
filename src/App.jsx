import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import PrivateRoute from "./PrivateRoute";
import { estaAutenticado } from "./services/auth";
import Sidebar from "./componentes/Sidebar";
import { Collapse } from "reactstrap";

import Login        from "./View/Login";
import Home         from "./View/Home";
import NotFound     from "./View/NotFound";
import Recuperar    from "./View/Recuperar";
import Inscricoes   from "./View/Inscricoes";

import ConfiguracaoPerfil    from "./View/Configuracao/Perfil";
import ConfiguracaoUsuario from "./View/Configuracao/Usuarios";

import CadastroMembro       from "./View/Cadastro/Membro";
import CadastroVisitante    from "./View/Cadastro/Visitante";
import CadastroMinisterio   from "./View/Cadastro/Ministerio";
import CadastroEvento       from "./View/Cadastro/Evento";

import FinanceiroDizimos    from "./View/Financeiro/Dizimo";
import FinanceiroOfertas    from "./View/Financeiro/Oferta";
import FinanceiroInscricao  from "./View/Financeiro/Inscricao";

import CursosAlunos         from "./View/Cursos/Aluno";
import CursosAtividades     from "./View/Cursos/Atividade";

import RelatorioMembro      from "./View/Relatorios/Membro";
import RelatorioDizimo      from "./View/Relatorios/Dizimo";
import RelatorioOferta      from "./View/Relatorios/Oferta";
//Classe Inicial do projeto
class App extends Component {

    state = {
        estaAutenticado: false,
        toggleSidebar: true,
        error: ""
    }

    componentDidMount() {
        document.title = "Cadastro de membros CEM";
        this.autorizado();
    }
    
    toggleSidebar = () => {
        this.setState({
            toggleSidebar: !this.state.toggleSidebar
        });
    }

    autorizado = e => {
        if(estaAutenticado()) {
            this.setState({
                estaAutenticado: true
            });
        }else{
            this.setState({
                estaAutenticado: false
            });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    {estaAutenticado() ? (
                        <>
                            <Collapse className="sidebar scrollbar scrollbar-dusty-grass thin" isOpen={this.state.toggleSidebar}>
                                <Sidebar usuario={this.state.login} />
                            </Collapse>
                        </>
                    ) : ( null )}
                    <Switch>
                        <PrivateRoute exact path="/home" component={Home} toggleSidebar={this.toggleSidebar}/>
                        <PrivateRoute exact path="/cadastro/membro" component={CadastroMembro} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/visitante" component={CadastroVisitante} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/ministerio" component={CadastroMinisterio} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/evento" component={CadastroEvento} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/inscricoes" component={FinanceiroInscricao} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/dizimo" component={FinanceiroDizimos} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/oferta" component={FinanceiroOfertas} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/relatorio/membro" component={RelatorioMembro} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/relatorio/dizimo" component={RelatorioDizimo} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/relatorio/oferta" component={RelatorioOferta} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cursos/aluno" component={CursosAlunos} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cursos/atividade" component={CursosAtividades} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/perfil" component={ConfiguracaoPerfil} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/usuario" component={ConfiguracaoUsuario} toggleSidebar={this.toggleSidebar} />
                        <Route exact path="/recuperar" component={Recuperar} />
                        <Route exact path="/inscricoes" component={Inscricoes} />
                        <Route exact path="/"
                        render={(props) => <Login {...props} autorizado={this.autorizado} />} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </>
                <NotificationContainer />
            </BrowserRouter>
        )
    }
}

export default App;