import React from "react";

const Form = ({ eventos, data: inscricao, handleChange, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabInscricao" role="tab" data-toggle="tab">Inscrições</a>
                </li>
            </ul>

            <form className="tab-content text-left">
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabInscricao" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <input className="form-control" id="nome" name="nome" type="text" value={inscricao.nome} required
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input className="form-control" type="text" name="email" id="email" value={inscricao.email} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="celular">Celular:</label>
                            <input className="form-control" type="text" name="celular" id="celular" value={inscricao.celular} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="pago">Pago:</label>
                            <select name="pago" id="pago" className="form-control" value={inscricao.pago} onChange={handleChange}>
                                <option>Escolha...</option>
                                <option value="0">Não</option>
                                <option value="1">Sim</option>
                            </select>
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="idEvento">Evento:</label>
                            <select name="idEvento" id="idEvento" className="form-control" value={inscricao.idEvento} onChange={handleChange}>
                                <option>Escolha...</option>
                                {eventos.map((evento) => <option key={evento.id} value={evento.id}>{evento.descricao}</option>)}
                            </select>
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