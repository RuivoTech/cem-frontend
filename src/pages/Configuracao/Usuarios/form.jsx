import React from "react";
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ data: usuario, usuarios, listaMenu, usuarioSelecionado, isChecked, handleChange, handleChangePermissao, handleSubmit, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabUsuario" role="tab" data-toggle="tab">Usuário</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabPermissao" role="tab" data-toggle="tab">Permissão</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <div className="tab-pane active" id="tabUsuario" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="id">ID:</label>
                            <input className="form-control" name="id" id="id" type="text" value={usuario.id} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="form-group col-md-10"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nomeUsuario">Nome Usuário:</label>
                            <Autocomplete className="form-control col-md-12" onClick={usuarioSelecionado} field="nome" 
                            suggestions={usuarios} value={usuario.nomeUsuario} name="nomeUsuario" onChange={handleChange} 
                            autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="chEsMembro">ID Membro:</label>
                            <input className="form-control" name="chEsMembro" id="chEsMembro" type="text" value={usuario.chEsMembro} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input className="form-control" name="email" id="email" type="text" value={usuario.email} 
                            onChange={handleChange} readOnly />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="senha">Senha:</label>
                            <input className="form-control" name="senha" id="senha" type="password" value={usuario.senha} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="confirmaSenha">Confirma Senha:</label>
                            <input className="form-control" name="confirmaSenha" id="confirmaSenha" type="password" value={usuario.confirmaSenha} 
                            onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="tabPermissao" role="tabpanel">
                    <div className="row">
                        <div className="col-md-12" style={{height: "42px", marginTop: '2vh'}}>
                            <p className="float-left text-center bg-white text-dark" 
                            style={{width: "25vh", height: "42px", borderTopLeftRadius: 5}}>Descrição</p>
                            <p className="float-left text-center bg-white text-dark" 
                            style={{width: "25vh", height: "42px", borderTopRightRadius: 5}}>Visualizar</p>
                        </div>
                        <div className="form-group col-md-12 float-left" style={{maxHeight: '25vh'}}>
                            <ul  className="list-group bg-transparent">
                                {listaMenu.map((item, index) => {
                                    const proxIndex = index < listaMenu.length - 1 ? index + 1 : index;
                                    const proximoItem = listaMenu[proxIndex];
                                    const grupo = proximoItem.grupo.charAt(0).toUpperCase() + proximoItem.grupo.slice(1);
                                    return(
                                        (index === 0) ? 
                                        (<>
                                            <li key={grupo} className="list-group-item bg-transparent border-white rounded-0">
                                                <div className="float-left" style={{width: "25vh"}}>{grupo}</div>
                                            </li>
                                            <li key={item.id} className="list-group-item bg-transparent border-white px-5">
                                                <div className="float-left" style={{width: "20vh"}}>{item.descricao}</div>
                                                <input type="checkbox" className="form-check-input" value={item.id} id={item.id} 
                                                    onChange={handleChangePermissao} name="permissoes.permissao" checked={isChecked(item)}
                                                    style={{width: "25vh"}}
                                                />
                                            </li>
                                        </>) : (item.grupo !== proximoItem.grupo) ? 
                                            (<>
                                                <li key={item.id} className="list-group-item bg-transparent border-white px-5">
                                                    <div className="float-left" style={{width: "20vh"}}>{item.descricao}</div>
                                                    <input type="checkbox" className="form-check-input" value={item.id} id={item.id} 
                                                        onChange={handleChangePermissao} name="permissoes.permissao" checked={isChecked(item)}
                                                        style={{width: "25vh"}}
                                                    />
                                                </li>
                                                <li className="list-group-item bg-transparent border-white rounded-0">
                                                    <div className="float-left" style={{width: "25vh"}}>{grupo}</div>
                                                </li>
                                            </>)
                                        :
                                            (<li key={item.id} className="list-group-item bg-transparent border-white px-5">
                                                <div className="float-left" style={{width: "20vh"}}>{item.descricao}</div>
                                                <input type="checkbox" className="form-check-input" value={item.id} id={item.id} 
                                                    onChange={handleChangePermissao} name="permissoes.permissao" checked={isChecked(item)}
                                                    style={{width: "25vh"}}
                                                />
                                            </li>)
                                    )
                                })}
                            </ul>
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