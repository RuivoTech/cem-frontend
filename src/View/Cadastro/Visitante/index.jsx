import React, { useState, useEffect } from 'react';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import FormModal from "./FormModal";
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import InfoBox from '../../../componentes/InfoBox';

const Visitantes = () => {
    const [visitantes, setVisitantes] = useState([]);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [visitanteSelecionado, setVisitanteSelecionado] = useState({});
    const [visitantesPesquisa, setVisitantesPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.title = "Visitantes - Cadastro de membros CEM";
        const fetchVisitante = async () => {
            let data = await api.get("/visitantes");
            setVisitantes(data.data);
        };

        fetchVisitante();
    }, []);

    useEffect(() => {
        const fetchVisitante = async () => {
            let data = await api.get("/visitantes");
            setVisitantes(data.data);
        };

        if (!show) {
            fetchVisitante();
        }
    }, [show]);

    const pesquisar = e => {
        let filteredSuggestions = visitantes.filter((suggestion) => {
            return suggestion.nome.toLowerCase().includes(e.currentTarget.value.toLowerCase());
        });

        setVisitantesPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        let data = await api.delete("/visitante/remover", id);

        if (data === "OK") {
            const items = visitantes.filter(item => item.id !== id);

            setVisitantes(items);

            NotificationManager.success("Visitante removido com sucesso!", 'Sucesso');
        } else {
            NotificationManager.error("Não foi possível remover o visitante!", 'Erro');
        }
    }

    const opcoes = (visitante) => {
        return (
            <>
                <button
                    key={visitante.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setVisitanteSelecionado(visitante);
                        setShow(true);
                    }}
                    title="Editar membro"
                >
                    <i className="fa fa-gear"></i>
                </button>
                {' '}
                <button
                    key={visitante.id + "remover"}
                    type="button"
                    onClick={() => remover(visitante.id)}
                    value={visitante.id}
                    className="btn btn-danger btn-xs"
                    title="Remover membro"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setVisitanteSelecionado({});
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
                                        placeholder="Pesquise por nome ou sobrenome"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? visitantesPesquisa : visitantes}
                            titulo="Visitantes"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Visitante"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="20" />
                            <Coluna campo="contato.email" titulo="E-mail" tamanho="20" />
                            <Coluna campo="contato.telefone" titulo="Telefone" tamanho="15" />
                            <Coluna campo="contato.celular" titulo="Celular" tamanho="15" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="6" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={visitanteSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Visitantes;