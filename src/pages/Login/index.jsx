import React, { Component } from "react";

import CEM from "../../images/cem.jpg";
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
            <div className="container-fluid mx-auto my-auto login" style={{ height: "100vh" }}>
                <div className="row" style={{ height: "100vh" }}>
                    <div className="col-8 text-center bg-white text-dark">
                        <img src={CEM} alt="Centro Evangélico de Maringá" style={{ maxHeight: "80vh" }} />
                        <p className="h5">
                            Uma igreja que visa abençoar famílias levando-as a reconhecer e aceitar a Jesus como Seu Salvador, 
                            e a cada dia trazer a presença de Deus entre nós.
                        </p>
                        <p className="h4 text-left">
                            <span className="h3 font-weight-bold text-primary">Pastores: </span>
                            <span className="h4 text-success">Pr Edson Sérgio Santos e Pra Febe Corrêa</span>
                        </p>
                    </div>
                    <div className="col-4 bg-login">
                        <div className="row h-100">
                            <div className="col-12 my-2">
                                {this.state.error && <div className="alert alert-danger shadow-lg" role="alert">{this.state.error}</div>}
                            </div>
                            <div className="col-12 align-self-end">
                                <h5 className="card-title text-left h1 text-success">Login</h5>
                                <form className="form-sigin" onSubmit={this.handleLogin}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email: ex. exemplo@exemplo.com" 
                                        onChange={this.setEmail} autoFocus />
                                    </div>
                                    
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Senha: ex. Senha123"
                                        onChange={this.setPassword} />
                                    </div>
                                    
                                    <div className="custom-control custom-checkbox mb-3">
                                        {this.state.carregando && <Carregando />}
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={this.state.carregando}>Entrar</button>
                                    <hr className="my-4" />
                                    <div className="custom-control mb-3">
                                        {/*<Link to="/recuperar" className="text-success"><i className="fa fa-key"></i> Esqueci minha senha</Link>*/}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;