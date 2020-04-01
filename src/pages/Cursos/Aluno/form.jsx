import React from "react";

const Form = ({ data: aluno, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabMinisterio" role="tab" data-toggle="tab">Ministerio</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabMinisterio" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <input className="form-control" id="nome" name="nome" type="text" value={aluno.nome} required
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-8">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea className="form-control" name="descricao" id="descricao" value={aluno.email} rows="10"
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