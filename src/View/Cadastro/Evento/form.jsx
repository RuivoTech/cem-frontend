import React from "react";

const Form = ({ data: evento, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabEvento" role="tab" data-toggle="tab">Evento</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabEvento" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="id">ID:</label>
                            <input className="form-control" id="id" name="id" type="text" value={evento.id} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="descricao">Descrição:</label>
                            <input className="form-control" id="descricao" name="descricao" type="text" value={evento.descricao} 
                            onChange={handleChange} required />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="ativo">Ativo:</label>
                            <select name="ativo" id="ativo" className="form-control" value={evento.ativo} onChange={handleChange}>
                                <option>Escolha...</option>
                                <option value="0">Não</option>
                                <option value="1">Sim</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="valor">Valor:</label>
                            <input type="text" className="form-control" name="valor" id="valor" value={evento.valor} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataInicio">Data Inicio:</label>
                            <input type="date" className="form-control" id="dataInicio" name="dataInicio" value={evento.dataInicio} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataDim">Data Fim:</label>
                            <input type="date" className="form-control" id="dataFim" name="dataFim" value={evento.dataFim}
                            onChange={handleChange} />
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