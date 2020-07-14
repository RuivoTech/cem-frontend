import React, { useState, useContext } from "react";
import packageJson from '../../../package.json';
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context";
import CEM from "../../images/cem.jpg";
import api from "../../services/api";
import Carregando from "../../componentes/Carregando";

const Login = () => {
    const history = useHistory();
    const { signIn } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async e => {
        e.preventDefault();

        setCarregando(true);

        if (!email || !senha) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
            try {
                let response = await api.post("/login", { email, senha });
                if (response.data.error) {
                    setCarregando(false);
                    setError(response.data.error);
                } else {
                    signIn(response.data);

                    setTimeout(() => {
                        setCarregando(false);
                        history.push("/dashboard");
                    }, 1000);
                }

            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="container-fluid mx-auto my-auto login" style={{ height: "100vh" }}>
            <div className="row" style={{ height: "100vh" }}>
                <div className="col-8 text-center bg-white text-dark">
                    <img src={CEM} alt="Centro Evangélico de Maringá" style={{ maxHeight: "80vh" }} />
                    <p className="h3">
                        Uma igreja que visa abençoar famílias levando-as a reconhecer e aceitar a Jesus como Seu Salvador,
                        e a cada dia trazer a presença de Deus entre nós.
                        </p>
                    <p className="h2 text-left">
                        <span className="h2 font-weight-bold text-primary">Pastores: </span>
                        <span className="h3 text-success">Pr Edson Sérgio Santos e Pra Febe Corrêa</span>
                    </p>
                </div>
                <div className="col-4 bg-login">
                    <div className="row h-100">
                        <div className="col-12 my-2">
                            {error && <div className="alert alert-danger shadow-lg" role="alert">{error}</div>}
                        </div>
                        <div className="col-12 align-self-end">
                            <h5 className="card-title text-left h1 text-success">Login</h5>
                            <form className="form-sigin" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email: ex. exemplo@exemplo.com"
                                        onChange={(event) => setEmail(event.target.value)} autoFocus />
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Senha: ex. Senha123"
                                        onChange={(event) => setSenha(event.target.value)} />
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    {carregando && <Carregando />}
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={carregando}>Entrar</button>
                                <hr className="my-4" />
                                <div className="custom-control mb-3">
                                    {/*<Link to="/recuperar" className="text-success"><i className="fa fa-key"></i> Esqueci minha senha</Link>*/}
                                </div>
                            </form>
                            <div className="h6 text-right">
                                {packageJson.version}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;