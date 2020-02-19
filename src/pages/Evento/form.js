import React from "react";

const Form = ({ data: evento, handleChange }) => {
    return (
        <>
            <form className="tab-content">
                <input type="hidden" id="id" name="id" />
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="descricao">Descrição:</label>
                        <input className="form-control" id="descricao" name="descricao" type="text" value={evento.descricao} 
                        onChange={handleChange} required />
                    </div>
                    <div className="col-md-6"></div>
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
                <hr />
                <button className="btn btn-success btn-lg" type="button">Salvar</button>
                <button className="btn btn-primary btn-lg" type="reset">Limpar</button>
            </form>
        </>
    )
}

export default Form;