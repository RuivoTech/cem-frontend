import React from "react";
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ ministerios, sugestoes, sugestaoSelecionada, membro, handleChange, handleLimpar, handleSubmit }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabPessoal" role="tab" data-toggle="tab">Dados Pessoais</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabContato" role="tab" data-toggle="tab">Contato</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabEndereco" role="tab" data-toggle="tab">Endereço</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link formulario" href="#tabIgreja" role="tab" data-toggle="tab">Dados Igreja</a>
                </li>
            </ul>

            <form className="tab-content text-left" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" value={membro.id} onChange={handleChange} />
                <div className="tab-pane active" id="tabPessoal" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-1">
                            <label htmlFor="id">Nome:</label>
                            <input className="form-control" id="id" name="id" type="text" onChange={handleChange} 
                            autoComplete="off" value={membro.id} required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <input className="form-control" id="nome" name="nome" type="text" onChange={handleChange} 
                            autoComplete="off" value={membro.nome} required />
                        </div>
                        <div className="col-md-5"></div>
                        <div className="form-group col-md-2">
                            <label htmlFor="rg">RG:</label>
                            <input className="form-control" id="rg" name="rg" type="text" value={membro.rg} onChange={handleChange}
                            autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="dataNascimento">Data de Nascimento:</label>
                            <input className="form-control" id="dataNascimento" name="dataNascimento" type="date" autoComplete="off"
                            value={membro.dataNascimento} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="sexo">Sexo:</label>
                            <select name="sexo" id="sexo" className="form-control" value={membro.sexo} onChange={handleChange}>
                                <option value="0">Escolha...</option>
                                <option value="1">Homem</option>
                                <option value="2">Mulher</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="profissao">Profissão:</label>
                            <input className="form-control" id="profissao" name="profissao" type="text" value={membro.profissao}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="estadoCivil">Estado Civil:</label>
                            <select name="estadoCivil" id="estadoCivil" className="form-control" value={membro.estadoCivil}
                            onChange={handleChange}>
                                <option value="0">Escolha...</option>
                                <option value="1">Solteiro(a)</option>
                                <option value="2">Casado(a)</option>
                                <option value="3">Divorciado(a)</option>
                                <option value="4">Viúvo(a)</option>
                                <option value="5">Separado(a)</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="conjuge">Cônjuge:</label>
                            <Autocomplete className="form-control col-md-12" onClick={sugestaoSelecionada} field="nome" 
                            suggestions={sugestoes} value={membro.conjuge} name="conjuge" onChange={handleChange} autoComplete="no" />
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="idConjuge">ID Cônjuge:</label>
                            <input className="form-control" name="idConjuge" id="idConjuge" type="text" value={membro.chEsConjuge} 
                            onChange={handleChange} disabled />
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tabContato">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input className="form-control" id="email" name="contato.email" type="email" value={membro.contato.email}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-2">
                            <label htmlFor="telefone">Telefone:</label>
                            <input className="form-control" id="telefone" name="contato.telefone" type="tel" 
                            value={membro.contato.telefone} onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="col-md-10"></div>
                        <div className="form-group col-md-2">
                            <label htmlFor="celular">Celular:</label>
                            <input className="form-control" id="celular" name="contato.celular" type="text" value={membro.contato.celular}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tabEndereco">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="cep">Cep:</label>
                            <input className="form-control" id="cep" name="endereco.cep" type="text" value={membro.endereco.cep}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="cidade">Cidade:</label>
                            <input className="form-control" id="cidade" name="endereco.cidade" type="text" value={membro.endereco.cidade}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="estado">Estado:</label>
                            <input className="form-control" id="estado" name="endereco.estado" type="text" value={membro.endereco.estado}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="logradouro">Endereço:</label>
                            <input className="form-control" id="logradouro" name="endereco.logradouro" type="text" value={membro.endereco.logradouro}
                            onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="complemento">Complemento:</label>
                            <input className="form-control" id="complemento" name="endereco.complemento" type="text" 
                            value={membro.endereco.complemento} onChange={handleChange} autoComplete="off" />
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tabIgreja">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label>É Batizado?</label>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="isBatizadoSim" name="dadosIgreja.isBatizado" value="0"
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="isBatizadoSim">Sim</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="isBatizadoNao" name="dadosIgreja.isBatizado" value="1"
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="isBatizadoNao">Não</label>
                            </div>
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="dataBatismo">Data do Batismo:</label>
                            <input className="form-control" id="dataBatismo" name="dadosIgreja.dataBatismo" type="date" 
                            value={membro.dadosIgreja.dataBatismo} onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="igrejaBatizado">Igreja Batizado:</label>
                            <input className="form-control" id="igrejaBatizado" name="dadosIgreja.igrejaBatizado" type="text" 
                            value={membro.dadosIgreja.igrejaBatizado} onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ultimoPastor">Ultimo Pastor:</label>
                            <input className="form-control" id="ultimoPastor" name="dadosIgreja.ultimoPastor" type="text" 
                            value={membro.dadosIgreja.ultimoPastor} onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ultimaIgreja">Ultima Igreja:</label>
                            <input className="form-control" id="ultimaIgreja" name="dadosIgreja.ultimaIgreja" type="text" 
                            value={membro.dadosIgreja.ultimaIgreja} onChange={handleChange} autoComplete="off" />
                        </div>
                        <div className="custom-control custom-checkbox">
                            <label id="lblMinisterios" >Ministérios:</label>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="marcarTodosMinisterios" 
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="marcarTodosMinisterios">Selecionar todos</label>
                            </div>
                            <div className="col-md-12">
                                {ministerios.map((ministerio, index) => {
                                    return (
                                        <div key={index} className='custom-control custom-checkbox custom-control-inline'>
                                            <input type='checkbox' className='custom-control-input' key={index}
                                            name='dadosIgreja.ministerios' value={ministerio.nome}  />
                                            <label className='custom-control-label' htmlFor={index} 
                                            title={ministerio.nome}>{ministerio.nome}</label>
                                        </div>
                                    )
                                })
                                }
                            </div>
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