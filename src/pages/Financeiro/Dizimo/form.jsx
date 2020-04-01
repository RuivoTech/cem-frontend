import React from "react";
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ data: dizimo, handleChange, handleLimpar, handleSubmit, sugestoes, sugestaoSelecionada }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabDizimo" role="tab" data-toggle="tab">Dizimo</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabDizimo" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="idMembro">ID:</label>
                            <input className="form-control" type="text" name="idMembro" id="idMembro" value={dizimo.idMembro} disabled 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <Autocomplete className="form-control col-md-12" onClick={sugestaoSelecionada} field="nome" 
                            suggestions={sugestoes} value={dizimo.nome} name="nome" id="nome" onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataDizimo">Data:</label>
                            <input className="form-control" type="date" name="dataDizimo" id="dataDizimo" value={dizimo.dataDizimo} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="valorDizimo">Valor:</label>
                            <input className="form-control" type="text" name="valorDizimo" id="valorDizimo" value={dizimo.valorDizimo} 
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