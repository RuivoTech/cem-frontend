import React, { useMemo, useEffect } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context";
import { onSignIn, onSignOut } from "./services/auth";

import Login from "./View/Login";
import Home from "./View/Home";
import NotFound from "./View/NotFound";
import Recuperar from "./View/Recuperar";
import Inscricoes from "./View/Inscricoes";

import ConfiguracaoPerfil from "./View/Configuracao/Perfil";
import ConfiguracaoUsuario from "./View/Configuracao/Usuarios";

import CadastroMembro from "./View/Cadastro/Membro";
import CadastroVisitante from "./View/Cadastro/Visitante";
import CadastroMinisterio from "./View/Cadastro/Ministerio";
import CadastroEvento from "./View/Cadastro/Evento";

import FinanceiroDizimos from "./View/Financeiro/Dizimo";
import FinanceiroOfertas from "./View/Financeiro/Oferta";
import FinanceiroInscricao from "./View/Financeiro/Inscricao";

import CursosAlunos from "./View/Cursos/Aluno";
import CursosAtividades from "./View/Cursos/Atividade";

import RelatorioMembro from "./View/Relatorios/Membro";
import RelatorioDizimo from "./View/Relatorios/Dizimo";
import RelatorioOferta from "./View/Relatorios/Oferta";

const App = () => {
    const authContext = useMemo(() => {
        return {
            signIn: (login) => {
                onSignIn(login);
            },
            signOut: () => {
                onSignOut();
            }
        }
    }, []);

    useEffect(() => {
        document.title = "Cadastro de membros CEM";
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <HashRouter>
                <>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Home} name="Dashboard" />
                        <PrivateRoute exact path="/cadastro/membro" component={CadastroMembro} name="Membros" />
                        <PrivateRoute exact path="/cadastro/visitante" component={CadastroVisitante} name="Visitantes" />
                        <PrivateRoute exact path="/cadastro/ministerio" component={CadastroMinisterio} name="Ministérios" />
                        <PrivateRoute exact path="/cadastro/evento" component={CadastroEvento} name="Eventos" />
                        <PrivateRoute exact path="/financeiro/inscricoes" component={FinanceiroInscricao} name="Inscrições" />
                        <PrivateRoute exact path="/financeiro/dizimo" component={FinanceiroDizimos} name="Dizimos" />
                        <PrivateRoute exact path="/financeiro/oferta" component={FinanceiroOfertas} name="Ofertas" />
                        <PrivateRoute exact path="/cursos/aluno" component={CursosAlunos} name="Alunos" />
                        <PrivateRoute exact path="/cursos/atividade" component={CursosAtividades} name="Atividades" />
                        <PrivateRoute exact path="/perfil" component={ConfiguracaoPerfil} name="Perfil" />
                        <PrivateRoute exact path="/usuario" component={ConfiguracaoUsuario} name="Usuários" />
                        <Route exact path="/recuperar" component={Recuperar} />
                        <Route exact path="/inscricoes" component={Inscricoes} />
                        <Route exact path="/"
                            render={(props) => <Login {...props} />} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </>
                <NotificationContainer />
            </HashRouter>
        </AuthContext.Provider>
    )
}

export default App;