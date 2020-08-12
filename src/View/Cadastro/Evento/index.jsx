import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import api from "../../../services/api";
import FormModal from "./FormModal";
import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import Utils from "../../../componentes/Utils";

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoSelecionado, setEventoSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [eventosPesquisa, setEventosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const { addToast } = useToasts();

    useEffect(() => {
        const fetchEventos = async () => {
            document.title = "Eventos - Cadastro de membros CEM";
            let request = await api.get("/eventos");

            setEventos(request.data);
            setQuantidadeTotal(request.data.length);
        }

        if (!show) {
            fetchEventos();
        }
    }, [setQuantidadeTotal, show]);

    const eventoAtivo = (evento) => {
        return evento.ativo ? "Sim" : "Não";
    }

    const remover = async (id) => {
        const respose = await api.delete("/eventos/" + id);

        if (!respose.data.error) {
            const items = eventos.filter(item => item.id !== id);

            setEventos(items);

            addToast("Evento removido com sucesso!", { appearance: "success" });
        } else {
            addToast("Não foi possível remover o evento!", { appearance: "error" });
        }
    }

    const pesquisar = e => {
        let filteredSuggestions = eventos.filter((suggestion) => {
            return suggestion.descricao
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                    e.currentTarget.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                );
        });

        setEventosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const opcoes = (evento) => {
        return (
            <>
                <button
                    key={evento.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setEventoSelecionado(evento);
                        setShow(true);
                    }}
                    title="Editar evento"
                >
                    <i className="fa fa-gear"></i>
                </button>
                {' '}
                <button
                    key={evento.id + "remover"}
                    type="button"
                    onClick={() => remover(evento.id)}
                    value={evento.id}
                    className="btn btn-danger btn-xs"
                    title="Remover evento"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setEventoSelecionado({});
        setShow(!show);
    }

    return (
        <>
            <div className="wrapper-content row">
                <InfoBox corFundo="primary" icone="user-circle-o" quantidade={quantidadeTotal} titulo="Total" />
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-search color-gray"></i>
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={pesquisar}
                                        value={pesquisa}
                                        placeholder="Pesquise por evento"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? eventosPesquisa : eventos}
                            titulo="Eventos"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Evento"
                            handleShow={handleShow}
                        >
                            <Coluna campo="descricao" titulo="Descrição" tamanho="20" />
                            <Coluna campo="valor" titulo="Valor" tamanho="5" />
                            <Coluna
                                campo="dataInicio"
                                titulo="Data Inicio"
                                corpo={(item) => Utils.converteData(item.dataInicio, "DD/MM/YYYY")}
                                tamanho="8"
                            />
                            <Coluna
                                campo="dataFim"
                                titulo="Data Fim"
                                corpo={(item) => Utils.converteData(item.dataFim, "DD/MM/YYYY")}
                                tamanho="8"
                            />
                            <Coluna campo="ativo" titulo="Ativo" corpo={(item) => eventoAtivo(item)} tamanho="5" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={eventoSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Eventos;