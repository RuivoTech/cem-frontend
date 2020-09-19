import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Evento from "../../../Model/Evento";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className }) => {
    const [evento, setEvento] = useState({});
    const [carregando, setCarregando] = useState(false);
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setEvento(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoEvento = new Evento();

        novoEvento.id = evento.id ? evento.id : 0;
        novoEvento.descricao = evento.descricao;
        novoEvento.dataInicio = evento.dataInicio;
        novoEvento.dataFim = evento.dataFim;
        novoEvento.valor = evento.valor;
        novoEvento.ativo = evento.ativo;

        if (Number(novoEvento.id) !== 0) {
            response = await api.put("/eventos", novoEvento, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/eventos", novoEvento, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Evento salvo com sucesso!", { appearance: "success" });
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setEvento({
                ...evento,
                [item]: {
                    ...evento[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setEvento({
                ...evento,
                [event.target.name]: event.target.value
            });
        }
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{evento?.id ? `#${evento.id} - ${evento?.descricao}` : "Novo Evento"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="descricao">Descrição:</label>
                            <input
                                className="form-control"
                                id="descricao"
                                name="descricao"
                                type="text"
                                value={evento.descricao}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="ativo">Ativo:</label>
                            <select
                                name="ativo"
                                id="ativo"
                                className="custom-select"
                                value={evento.ativo}
                                onChange={handleChange}
                            >
                                <option>Escolha...</option>
                                <option value="0">Não</option>
                                <option value="1">Sim</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="valor">Valor:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="valor"
                                id="valor"
                                value={evento.valor}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataInicio">Data Inicio:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataInicio"
                                name="dataInicio"
                                value={Utils.converteData(evento.dataInicio, "YYYY-MM-DD")}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dataFim">Data Fim:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataFim"
                                name="dataFim"
                                value={Utils.converteData(evento.dataFim, "YYYY-MM-DD")}
                                onChange={handleChange}
                            />
                        </div>
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