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

import Perfil       from "./pages/Configuracao/Perfil";
import Menu         from "./pages/Configuracao/Menu";
import Permissao    from "./pages/Configuracao/Permissao";

import Membro       from "./pages/Cadastro/Membro";
import Visitante    from "./pages/Cadastro/Visitante";
import Ministerio   from "./pages/Cadastro/Ministerio";
import Evento       from "./pages/Cadastro/Evento";

import Dizimos      from "./pages/Financeiro/Dizimos";
import Ofertas      from "./pages/Financeiro/Ofertas";
import Inscricao    from "./pages/Financeiro/Inscricao";

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
                        <Route exact path="/" render={(props) => <Login {...props} autorizado={this.autorizado} />} />
                        <PrivateRoute exact path="/home" component={Home} toggleSidebar={this.toggleSidebar}/>
                        <PrivateRoute exact path="/cadastro/membro" component={Membro} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/visitante" component={Visitante} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/ministerio" component={Ministerio} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/cadastro/evento" component={Evento} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/inscricoes" component={Inscricao} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/dizimo" component={Dizimos} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/financeiro/oferta" component={Ofertas} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/perfil" component={Perfil} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/menu" component={Menu} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/permissao" component={Permissao} toggleSidebar={this.toggleSidebar} />
                        <Route exact path="/recuperar" component={Recuperar} />
                        <Route exact path="/inscricoes" component={Inscricoes} />
                        <Route component={NotFound} />
                    </Switch>
                </>
                <NotificationContainer />
            </BrowserRouter>
        )
    }
}

export default App;