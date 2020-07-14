import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NotificationManager } from "react-notifications";

import Usuario from "../../../Model/Usuario";
import api from "../../../services/api";
import Autocomplete from "../../../componentes/Autocomplete";
import Tabela from "../../../componentes/Tabela";
import Coluna from "../../../componentes/Coluna";
import Axios from "axios";

const FormModal = ({ data, show, handleShow, className, membros }) => {
    const [usuario, setUsuario] = useState({});
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);
    const [filhos, setFilhos] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        setUsuario(data);
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {

        setCarregando(true);

        const novoUsuario = new Usuario();

        novoUsuario.id = usuario?.id;
        novoUsuario.nome = usuario?.nome;
        novoUsuario.email = usuario?.email;

        let data = await api.post("/usuarios", novoUsuario);

        if (data) {
            NotificationManager.success("Usuário salvo com sucesso!", "Sucesso");
            handleShow();
        }
    }

    const handleChange = evento => {
        const [item, subItem] = evento.target.name;

        if (subItem) {
            setUsuario({
                ...usuario,
                [item]: {
                    ...[item],
                    [subItem]: evento.target.value
                }
            });
        } else {
            setUsuario({
                ...usuario,
                [evento.target.name]: evento.target.value
            });
        }
    }

    const handleClick = (item, id, nome) => {
        setUsuario(item);
    }

    const handleValue = event => {
        setValue(event.target.value);
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{usuario?.nome ? usuario?.nome : "Novo Usuário"}</ModalHeader>
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
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="nome">Nome:</label>
                                                <input className="form-control" type="text" id="nome" name="nome" value={usuario?.nome}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail:</label>
                                                <input className="form-control" id="email" name="email" type="email"
                                                    value={usuario?.email} onChange={handleChange} />
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