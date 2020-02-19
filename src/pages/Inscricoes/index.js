import React, { Component } from "react";

import api from "../../services/api";

class Inscricoes extends Component {

    state = {
        eventos: []
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
            [e.target.name]: e.target.value
        });
    }

    render(){
        const opcoes = this.state.eventos.map((evento) => {
            return <option key={evento.id} value={evento.id}>{evento.descricao}</option>
        });
        const { error } = this.props;
        return (
            <>
            <h1 className="h1 text-center">Inscrições para eventos do CEM</h1>
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-3 mx-auto">
                    <div className="card card-sigin my-5">
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
                                    <input className="form-control email" type="email" name="email" onChange={this.onChange} placeholder="Email" required />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="celular" onChange={this.onChange} placeholder="Celular" required />
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                </div>
                                <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Inscrever-se</button>
                                <hr className="my-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Inscricoes;