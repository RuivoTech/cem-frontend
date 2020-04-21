import React, { Component } from "react";

import api from "../../services/api";
import { NotificationManager } from "react-notifications";

class Inscricoes extends Component {

    state = {
        eventos: [],
        Inscrição: {
            explicitType: "inscricao",
            id: 0,
            nome: "",
            email: "",
            celular: "",
            idEvento: "",
            evento: "",
            pago: ""
        }
    }

    async componentDidMount(){
        document.title = "Inscrições para eventos do CEM";
        await this.fetchEventos();        
    }

    fetchEventos = async () => {
        let data = await api.get("/evento/listar/ativo");
        this.setState({
            eventos: data
        });
    };

    onChange = e => {
        this.setState({
            Inscricao: {
                ...this.state.Inscricao,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({
            carregando: true
        });

        let inscricao = this.state.Inscrição;

        inscricao.push({pago: false});

        let data = await api.post("/inscricao/salvar",  this.state.Inscricao);

        NotificationManager.success("Inscrição salva com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            Inscrição: {},
            error: data
        });
    }

    render(){
        const opcoes = this.state.eventos.map((evento) => {
            return <option key={evento.id} value={evento.id}>{evento.descricao}</option>
        });
        const { error } = this.props;
        return (
            <>
            <div className="container align-items-center">
                <h1 className="h1 text-center my-5">Inscrições para eventos do CEM</h1>
                <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-5 mx-auto">
                        <div className="card my-5">
                            <div className="card-body">
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <form className="form-sigin" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="nome" onChange={this.onChange} 
                                        placeholder="Nome completo" required />
                                    </div>
                                    
                                    <div className="form-group">
                                        <select className="form-control evento" name="evento" onChange={this.onChange} required>
                                            <option value="">Escolha um evento</option>
                                            {opcoes}					
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control email" type="email" name="email" onChange={this.onChange} 
                                        placeholder="Email" required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="celular" onChange={this.onChange} 
                                        placeholder="Celular" required />
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                    </div>
                                    <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit" 
                                    disabled={this.state.carregando}>Inscrever-se</button>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Inscricoes;