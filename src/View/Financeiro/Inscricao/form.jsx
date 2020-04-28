import React from "react";
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ membros, eventos, data: inscricao, handleChange, handleLimpar, handleSubmit, sugestaoSelecionada }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabInscricao" role="tab" data-toggle="tab">Inscrições</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <div className="tab-pane active" id="tabInscricao" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="id">ID:</label>
                            <input className="form-control" type="text" name="id" id="id" value={inscricao.id} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="col-md-10"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <Autocomplete className="form-control col-md-12" onClick={sugestaoSelecionada} field="nome" 
                            suggestions={membros} value={inscricao.nome} name="nome" id="nome" onChange={handleChange} autoComplete="no" />
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
                            <label htmlFor="chEsEvento">Evento:</label>
                            <select name="chEsEvento" id="chEsEvento" className="form-control" value={inscricao.chEsEvento} onChange={handleChange}>
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