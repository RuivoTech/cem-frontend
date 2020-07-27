import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

import api from "../../../services/api";
import "./styles.css"

import InfoBox from '../../../componentes/InfoBox';
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import FormModal from './FormModal';

const Membros = () => {
    const [membros, setMembros] = useState([]);
    const [membroSelecionado, setMembroSelecionado] = useState({});
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0);
    const [quantidadeNovos, setQuantidadeNovos] = useState(0);
    const [quantidadeBatizados, setQuantidadeBatizados] = useState(0);
    const [show, setShow] = useState(false);
    const [membrosPesquisa, setMembrosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("membros");

            setMembros(response.data);
        }

        document.title = "Membros - Cadastro de membros CEM";

        fetchMembros();
    }, []);

    useEffect(() => {
        const fetchMembros = async () => {
            const response = await api.get("/membros");

            setMembros(response.data);
        }
        if (!show) {
            fetchMembros();
        }
    }, [show]);

    const pesquisar = e => {
        let filteredSuggestions = membros.filter((suggestion) => {
            return suggestion.nome.toLowerCase().includes(e.currentTarget.value.toLowerCase());
        });

        setMembrosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        let data = await api.delete("/membros", id);

        if (data === "OK") {
            const items = membros.filter(item => item.id !== id);

            setMembros(items);

            NotificationManager.success("Membro removido com sucesso!", 'Sucesso');
        } else {
            NotificationManager.error("Não foi possível remover o membro!", 'Erro');
        }
    }

    const opcoes = (membro) => {
        return (
            <>
                <button
                    key={membro.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setMembroSelecionado(membro);
                        setShow(true);
                    }}
                    title="Editar membro"
                >
                    <i className="fa fa-gear"></i>
                </button>
                &nbsp;
                <button
                    key={membro.id + "remover"}
                    type="button"
                    onClick={() => remover(membro.id)}
                    value={membro.id}
                    className="btn btn-danger btn-xs"
                    title="Remover membro"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setMembroSelecionado({});
        setShow(!show);
    }

    return (
        <>
            <div className="wrapper-content row">
                <InfoBox corFundo="primary" icone="user-circle-o" quantidade={quantidadeAtivos} titulo="Ativos" />
                <InfoBox corFundo="success" icone="check-circle" quantidade={quantidadeNovos} titulo="Novos" />
                <InfoBox corFundo="danger" icone="heart-o" quantidade={quantidadeBatizados} titulo="Batizados" />
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
                            data={pesquisa ? membrosPesquisa : membros}
                            titulo="Membros"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Membro"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="20" />
                            <Coluna campo="contato.email" titulo="E-mail" tamanho="20" />
                            <Coluna campo="contato.telefone" titulo="Telefone" tamanho="12" />
                            <Coluna campo="contato.celular" titulo="Celular" tamanho="12" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="10" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={membroSelecionado} show={show} handleShow={handleShow} membros={membros} />
        </>
    )
}

export default Membros;