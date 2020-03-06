import React from "react";

const Form = ({ data: oferta, handleChange, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabOferta" role="tab" data-toggle="tab">Oferta</a>
                </li>
            </ul>

            <form className="tab-content text-left">
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabOferta" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label htmlFor="dataOferta">Data:</label>
                            <input className="form-control" type="date" name="dataOferta" id="dataOferta" value={oferta.dataOferta} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="valorOferta">Valor:</label>
                            <input className="form-control" type="text" name="valorOferta" id="valorOferta" value={oferta.valorOferta} 
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