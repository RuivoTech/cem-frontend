import React from "react";

const Form = ({ handleChange, data: visitante }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabPessoal" role="tab" data-toggle="tab">Dados Pessoais</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabContato" role="tab" data-toggle="tab">Contato</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabEndereco" role="tab" data-toggle="tab">Endereço</a>
                </li>
            </ul>

            <form className="tab-content" method="POST" id="formFrequentadores">
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabPessoal" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <input className="form-control" id="nome" name="nome" type="text" value={visitante.nome}
                            onChange={handleChange} required />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-2">
                            <label>Deseja uma visita?</label>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="querVisitaSim" name="querVisita" value="0"
                                checked={visitante.visita === 0 ? "checked" : "null"} onChange={handleChange} />
                                <label className="custom-control-label" htmlFor="querVisitaSim">Sim</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="querVisitaNao" name="querVisita" value="1"
                                checked={visitante.visita === 1 ? "checked" : "null"} onChange={handleChange} />
                                <label className="custom-control-label" htmlFor="querVisitaNao">Não</label>
                            </div>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="dataVisita">Data de Visita:</label>
                            <input className="form-control" id="dataVisita" name="dataVisita" type="date" value={visitante.dataVisita}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="religiao">Religião:</label>
                            <input className="form-control" id="religiao" name="religiao" type="text" value={visitante.religiao} 
                            onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tabContato">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input className="form-control" id="email" name="email" type="email" value={visitante.email}
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-2">
                            <label htmlFor="telefone">Telefone:</label>
                            <input className="form-control" id="telefone" name="telefone" type="text" value={visitante.telefone}
                            onChange={handleChange} />
                        </div>
                        
                        <div className="form-group col-md-2">
                            <label htmlFor="celular">Celular:</label>
                            <input className="form-control" id="celular" name="celular" type="text" value={visitante.celular}
                            onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tabEndereco">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="cep">Cep:</label>
                            <input className="form-control" id="cep" name="cep" type="text" value={visitante.cep}
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="endereco">Endereço:</label>
                            <input className="form-control" id="endereco" name="endereco" type="text" value={visitante.endereco}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="complemento">Complemento:</label>
                            <input className="form-control" id="complemento" name="complemento" type="text" 
                            onChange={handleChange} value={visitante.complemento} />
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-success btn-lg" type="button" value="frequentadores" id="btnFrequentadores">Salvar</button>
                <button className="btn btn-primary btn-lg" type="reset" value="limpar" id="btnLimpar">Limpar</button>
            </form>
        </>
    )
}

export default Form;