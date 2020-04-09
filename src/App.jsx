import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import PrivateRoute from "./PrivateRoute";
import { estaAutenticado } from "./services/auth";
import Sidebar from "./componentes/Sidebar";
import { Collapse } from "reactstrap";

import Login        from "./pages/Login";
import Home         from "./pages/Home";
import NotFound     from "./pages/NotFound";
import Recuperar    from "./pages/Recuperar";
import Inscricoes   from "./pages/Inscricoes";

import ConfiguracaoPerfil    from "./pages/Configuracao/Perfil";
import ConfiguracaoPermissao from "./pages/Configuracao/Permissao";

import CadastroMembro       from "./pages/Cadastro/Membro";
import CadastroVisitante    from "./pages/Cadastro/Visitante";
import CadastroMinisterio   from "./pages/Cadastro/Ministerio";
import CadastroEvento       from "./pages/Cadastro/Evento";

import FinanceiroDizimos    from "./pages/Financeiro/Dizimo";
import FinanceiroOfertas    from "./pages/Financeiro/Oferta";
import FinanceiroInscricao  from "./pages/Financeiro/Inscricao";

import CursosAlunos         from "./pages/Cursos/Aluno";
import CursosAtividades     from "./pages/Cursos/Atividade";

import RelatorioMembro      from "./pages/Relatorios/Membro";
import RelatorioDizimo      from "./pages/Relatorios/Dizimo";
import RelatorioOferta      from "./pages/Relatorios/Oferta";

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
                estaAutenticado: !this.state.estaAutenticado
            });
        }
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    {this.state.estaAutenticado ? (
                        <>
                            <Collapse className="sidebar scrollbar scrollbar-dusty-grass thin" isOpen={this.state.toggleSidebar}><Sidebar usuario={this.state.login} /></Collapse>
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
                        <PrivateRoute exact path="/permissao" component={ConfiguracaoPermissao} toggleSidebar={this.toggleSidebar} />
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