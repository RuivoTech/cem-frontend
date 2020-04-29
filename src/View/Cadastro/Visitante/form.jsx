import React from "react";

const Form = ({ handleChange, data: visitante, handleLimpar, handleBlur, handleSubmit }) => {
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

            <form className="tab-content text-left" onSubmit={handleSubmit}>
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
                                checked={visitante.visita === 0 ? "checked" : null} onChange={handleChange} />
                                <label className="custom-control-label" htmlFor="querVisitaSim">Sim</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="querVisitaNao" name="querVisita" value="1"
                                checked={visitante.visita === 1 ? "checked" : null} onChange={handleChange} />
                                <label className="custom-control-label" htmlFor="querVisitaNao">Não</label>
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataVisita">Data de Visita:</label>
                            <input className="form-control" id="dataVisita" name="dataVisita" type="date" value={visitante.dataVisita}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="religiao">Religião:</label>
                            <input className="form-control" id="religiao" name="religiao" type="text" value={visitante.religiao} 
                            onChange={handleChange} />
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
                        <div className="form-group col-md-3">
                            <label htmlFor="telefone">Telefone:</label>
                            <input className="form-control" id="telefone" name="telefone" type="text" value={visitante.telefone}
                            onChange={handleChange} />
                        </div>
                        
                        <div className="form-group col-md-3">
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
                            onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="logradouro">Endereço:</label>
                            <input className="form-control" id="logradouro" name="logradouro" type="text" value={visitante.logradouro}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="complemento">Complemento:</label>
                            <input className="form-control" id="complemento" name="complemento" type="text" 
                            onChange={handleChange} value={visitante.complemento} />
                        </div>
                    </div>
                </div>
                <div className="botoes">
                    <hr className="bg-white" />
                    <div className="row">
                        <div className="col-md-2">
                            <button className="btn btn-success btn-lg btn-block" type="submit">Salvar</button> 
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleLimpar} >Limpar</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form;