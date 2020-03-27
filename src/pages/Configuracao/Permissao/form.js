import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ data: usuario, usuarios, listaMenu, usuarioSelecionado, handleChangePermissao, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabPermissao" role="tab" data-toggle="tab">Permissão</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <div className="tab-pane active" id="tabPermissao" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nomeUsuario">Nome Usuário:</label>
                            <Autocomplete className="form-control col-md-12" onClick={usuarioSelecionado} field="nomeUsuario" 
                            suggestions={usuarios} value={usuario.nomeUsuario} name="nomeUsuario" onChange={handleChange} 
                            autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="chEsUsuario">ID Usuario:</label>
                            <input className="form-control" name="id" id="id" type="text" value={usuario.id} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="form-group col-md-12 mh-20">
                            <DataTable value={listaMenu} scrollable={true} scrollHeight="100px" selection={usuarioSelecionado} onSelectionChange={handleChangePermissao}>
                                <Column field="nome" header="Item" />
                                <Column selectionMode="multiple" style={{width:'2em'}} name="permissoes.permissao" />
                            </DataTable>
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