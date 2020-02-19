import React from "react";

const Form = ({ data: ministerio, handleChange }) => {
    return (
        <>
            <form className="tab-content">
                <input type="hidden" id="id" name="id" />
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="nome">Nome:</label>
                        <input className="form-control" id="nome" name="nome" type="text" value={ministerio.nome} required
                        onChange={handleChange} />
                    </div>
                    <div className="col-md-6"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea className="form-control" name="descricao" id="descricao" value={ministerio.descricao} rows="10"
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