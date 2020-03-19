import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";
import Carregando from "../../componentes/Carregando";

class Login extends Component {

    state = {
        carregando: false,
        email: "",
        password: "",
        login: {},
        error: ""
    }

    setEmail = e => {
        this.setState({
            email: e.target.value
        });
    }

    setPassword = e => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = async e => {
        e.preventDefault();
        this.setState({
            carregando: true,
        })
        const { email, password } = this.state;
        if( !email || !password ) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                let data = await api.post("/usuario/login", {"email": email, "senha": password});
                login(data.hash);

                this.setState({
                    login: data,
                    carregando: false,
                })
                setTimeout(() => {
                    this.props.history.push("/home");
                    this.props.autorizado(e);
                }, 300);
                
            } catch (err) {
                this.setState({
                    carregando: false,
                    error:
                    "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-3 mx-auto">
                    <div className="card card-sigin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Entrar</h5>
                            {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
                            {this.state.carregando && <Carregando />}
                            <form className="form-sigin" onSubmit={this.handleLogin}>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email: ex. exemplo@exemplo.com" 
                                    onChange={this.setEmail} />
                                </div>
                                
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Senha: ex. Senha123"
                                    onChange={this.setPassword} />
                                </div>
                                
                                <div className="custom-control custom-checkbox mb-3">
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={this.state.carregando}>Entrar</button>
                                <hr className="my-4" />
                                <div className="custom-control mb-3">
                                    <Link to="/recuperar" className="esqueciSenha"><i className="fa fa-key"></i> Esqueci minha senha</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;