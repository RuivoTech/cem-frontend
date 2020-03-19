import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { estaAutenticado } from "./services/auth";
import Sidebar from "./componentes/Sidebar";
import { Collapse } from "reactstrap";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Membro from "./pages/Membro";
import Visitante from "./pages/Visitante";
import Ministerio from "./pages/Ministerio";
import Evento from "./pages/Evento";
import NotFound from "./pages/NotFound";
import Recuperar from "./pages/Recuperar";
import Inscricoes from "./pages/Inscricoes";

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
                            <Collapse className="sidebar" isOpen={this.state.toggleSidebar}><Sidebar usuario={this.state.login} /></Collapse>
                        </>
                    ) : ( null )}
                    <Switch>
                        <PrivateRoute exact path="/home" component={Home} toggleSidebar={this.toggleSidebar}/>
                        <PrivateRoute exact path="/membro" component={Membro} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/visitante" component={Visitante} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/ministerio" component={Ministerio} toggleSidebar={this.toggleSidebar} />
                        <PrivateRoute exact path="/evento" component={Evento} toggleSidebar={this.toggleSidebar} />
                        <Route exact path="/recuperar" component={Recuperar} />
                        <Route exact path="/inscricoes" component={Inscricoes} />
                        <Route exact path="/"
                        render={(props) => <Login {...props} autorizado={this.autorizado} />} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </>
            </BrowserRouter>
        )
    }
}

export default App;