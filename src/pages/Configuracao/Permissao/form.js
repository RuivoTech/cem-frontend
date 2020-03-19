import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ data: permissao, usuarios, menu, usuarioSelecionado, menuSelecionado, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabPermissao" role="tab" data-toggle="tab">Menu</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabPermissao" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nomeUsuario">Nome Usuário:</label>
                            <Autocomplete className="form-control col-md-12" onClick={usuarioSelecionado} field="nomeUsuario" 
                            suggestions={usuarios} value={permissao.nomeUsuario} name="nomeUsuario" onChange={handleChange} 
                            autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="chEsUsuario">ID Usuario:</label>
                            <input className="form-control" name="chEsUsuario" id="chEsUsuario" type="text" value={permissao.chEsUsuario} 
                            onChange={handleChange} readOnly />
                        </div>
                        <DataTable value={menu} selection={menuSelecionado} onSelectionChange={handleChange}>
                        {menu.map((item) => {
                            return (
                                <>
                                    <Column field="nome" header="Item" />
                                    <Column selectionMode="single" style={{width:'2em'}} />
                                </>
                            )
                        })}
                        </DataTable>
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