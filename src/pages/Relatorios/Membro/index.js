import React, { Component } from "react";

import api from "../../../services/api";
import Menu from "../../../componentes/Menu";

class Membros extends Component {
    state = {
        Ministerios: [],
        aniversarianteMarcado: false
    }

    async componentDidMount(){
        document.title = "Relatório de Membros - Cadastro de membros CEM";      
        await this.fetchMinisterios();
    }

    fetchMinisterios = async () => {
        let data = await api.get("/ministerio/listar");
        this.setState({
            Ministerios: data
        });
    }

    handleChange = () => {
        this.setState({
            aniversarianteMarcado: !this.state.aniversarianteMarcado
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleSidebar={toggleSidebar} componente="dizimo" />
                </div>
                <div className="container-fluid">
                    <form className="tab-content text-left" action="http://192.168.0.7/relatorio/membro.php" method="GET" target="_balnk">
                        <div className="tab-pane active">
                            <div className="row">
                                <div className="col-md-3 h3">Data de Nascimento:</div>
                                <div className="custom-control custom-checkbox col-md-9 h5">
                                    <input className="custom-control-input" name="aniversariantes" id="aniversariantes" 
                                    type="checkbox" onChange={this.handleChange} />
                                    <label className="custom-control-label" htmlFor="aniversariantes">Aniversariantes do Mês</label>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="dataInicio">De:</label>
                                    <input className="form-control" name="dataInicio" id="dataInicio" type="date"
                                    readOnly={this.state.aniversarianteMarcado} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="dataFim">Até:</label>
                                    <input className="form-control" name="dataFim" id="dataFim"
                                    type="date" disabled={this.state.aniversarianteMarcado} />
                                </div>
                                
                                <div className="col-md-6"></div>
                                <div className="col-md-12 h3">Ministério:</div>
                                <div className="form-group col-md-3">
                                    <select name="ministerio" className="form-control">
                                        <option value="">Escolha...</option>
                                        {this.state.Ministerios.map((ministerio) => {
                                            return <option key={ministerio.id} value={ministerio.id}>{ministerio.nome}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-12 h3">Sexo:</div>
                                <div className="form-group col-md-2">
                                    <select className="form-control" name="sexo">
                                        <option value="">Escolha...</option>
                                        <option value="0">Homem</option>
                                        <option value="1">Mulher</option>
                                    </select>
                                </div>
                                <div className="col-md-12 h3">Estado Civil:</div>
                                <div className="form-group col-md-2">
                                    <select name="estadoCivil" className="form-control">
                                        <option value="">Escolha...</option>
                                        <option value="1">Solteiro(a)</option>
                                        <option value="2">Casado(a)</option>
                                        <option value="3">Divorciado(a)</option>
                                        <option value="4">Viúvo(a)</option>
                                        <option value="5">Separado(a)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="botoes">
                            <hr className="bg-white" />
                            <div className="row">
                                <div className="col-md-2">
                                    <button className="btn btn-success btn-lg btn-block" type="submit">Gerar Relatório</button> 
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default Membros;