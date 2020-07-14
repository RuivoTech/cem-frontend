import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NotificationManager } from "react-notifications";

import Visitante from "../../../Model/Visitante";
import api from "../../../services/api";
import Axios from "axios";

const FormModal = ({ data, show, handleShow, className, visitantes }) => {
    const [visitante, setVisitante] = useState({});
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        setVisitante(data);
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {

        setCarregando(true);

        const novoVisitante = new Visitante();

        novoVisitante.id = visitante?.id;
        novoVisitante.nome = visitante?.nome;
        novoVisitante.rg = visitante?.rg;
        novoVisitante.dataNascimento = visitante?.dataNascimento;
        novoVisitante.sexo = visitante?.sexo;
        novoVisitante.profissao = visitante?.profissao;
        novoVisitante.estadoCivil = visitante?.estadoCivil;
        novoVisitante.chEsConjuge = visitante?.chEsConjuge;
        novoVisitante.conjuge = visitante?.conjuge;
        novoVisitante.ativo = 0;

        novoVisitante.contato.id = visitante?.contato?.id;
        novoVisitante.contato.email = visitante?.contato?.email;
        novoVisitante.contato.telefone = visitante?.contato?.telefone;
        novoVisitante.contato.celular = visitante?.contato?.celular;

        novoVisitante.endereco.id = visitante?.endereco?.id;
        novoVisitante.endereco.cep = visitante?.endereco?.cep;
        novoVisitante.endereco.cidade = visitante?.endereco?.cidade;
        novoVisitante.endereco.estado = visitante?.endereco?.estado;
        novoVisitante.endereco.logradouro = visitante?.endereco?.logradouro;

        novoVisitante.dadosIgreja.id = visitante?.dadosIgreja?.id;
        novoVisitante.dadosIgreja.isBatizado = visitante?.dadosIgreja?.isBatizado;
        novoVisitante.dadosIgreja.dataBatismo = visitante?.dadosIgreja?.dataBatismo;
        novoVisitante.dadosIgreja.igrejaBatizado = visitante?.dadosIgreja?.igrejaBatizado;
        novoVisitante.dadosIgreja.ultimoPastor = visitante?.dadosIgreja?.ultimoPastor;
        novoVisitante.dadosIgreja.ultimaIgreja = visitante?.dadosIgreja?.ultimaIgreja;
        novoVisitante.ministeriosvisitante = visitante?.ministeriosvisitante;


        let data = await api.post("/visitantes", novoVisitante);

        if (data) {
            NotificationManager.success("Visitante salvo com sucesso!", "Sucesso");
            handleShow();
        }
    }

    const handleChange = evento => {
        const [item, subItem] = evento.target.name;

        if (subItem) {
            setVisitante({
                ...visitante,
                [item]: {
                    ...[item],
                    [subItem]: evento.target.value
                }
            });
        } else {
            setVisitante({
                ...visitante,
                [evento.target.name]: evento.target.value
            });
        }
    }

    const handleBlur = async evento => {
        let data = await Axios.get("https://viacep.com.br/ws/" + evento.target.value + "/json/");

        data = data.data;

        setVisitante({
            ...visitante,
            endereco: {
                logradouro: data.logradouro,
                cidade: data.localidade,
                estado: data.uf
            }
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{visitante?.nome ? visitante?.nome : "Novo Visitante"}</ModalHeader>
                <ModalBody>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'perfil' }}
                                    onClick={() => { toggle('perfil'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Perfil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'contato' }}
                                    onClick={() => { toggle('contato'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Contato
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'endereco' }}
                                    onClick={() => { toggle('endereco'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Endereço
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nome">Nome:</label>
                                            <input className="form-control" id="nome" name="nome" type="text" value={visitante.nome}
                                                onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="form-group col-md-4">
                                            <label>Deseja uma visita?</label>
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="querVisitaSim"
                                                    name="querVisita"
                                                    value="0"
                                                    checked={visitante.visita === 0 ? "checked" : null}
                                                    onChange={handleChange}
                                                />
                                                <label className="custom-control-label" htmlFor="querVisitaSim">Sim</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id="querVisitaNao"
                                                    name="querVisita"
                                                    value="1"
                                                    checked={visitante.visita === 1 ? "checked" : null}
                                                    onChange={handleChange}
                                                />
                                                <label className="custom-control-label" htmlFor="querVisitaNao">Não</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="dataVisita">Data de Visita:</label>
                                            <input
                                                className="form-control"
                                                id="dataVisita"
                                                name="dataVisita"
                                                type="date"
                                                value={visitante.dataVisita}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="religiao">Religião:</label>
                                            <input
                                                className="form-control"
                                                id="religiao"
                                                name="religiao"
                                                type="text"
                                                value={visitante.religiao}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="contato">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">E-mail:</label>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={visitante.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="telefone">Telefone:</label>
                                            <input
                                                className="form-control"
                                                id="telefone"
                                                name="telefone"
                                                type="text"
                                                value={visitante.telefone}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="celular">Celular:</label>
                                            <input
                                                className="form-control"
                                                id="celular"
                                                name="celular"
                                                type="text"
                                                value={visitante.celular}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="endereco">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <label htmlFor="cep">CEP:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-map-marker"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cep"
                                                    name="cep"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={visitante?.endereco?.cep}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6"></div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="logradouro">Endereço:</label>
                                                <input className="form-control" id="logradouro" name="endereco.logradouro" type="text"
                                                    value={visitante?.endereco?.logradouro} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <div className="form-group">
                                                <label htmlFor="numero">Número:</label>
                                                <input className="form-control" id="numero" name="endereco.numero" type="text"
                                                    value={visitante?.endereco?.numero} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="complemento">Complemento:</label>
                                                <input
                                                    className="form-control"
                                                    id="complemento"
                                                    name="endereco.complemento"
                                                    type="text"
                                                    value={visitante?.endereco?.complemento}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="cidade">Cidade:</label>
                                                <input className="form-control" id="cidade" name="endereco.cidade" type="text"
                                                    value={visitante?.endereco?.cidade} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="estado">Estado:</label>
                                                <input className="form-control" id="estado" name="endereco.estado" type="text"
                                                    value={visitante?.endereco?.estado} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="success" onClick={() => handleSubmit()} disabled={carregando}>Salvar</Button>{' '}
                    <Button type="button" color="danger" onClick={handleShow} disabled={carregando}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;