import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

import api from "../../../services/api";
import Tabela from '../../../componentes/Tabela';
import Coluna from '../../../componentes/Coluna';
import FormModal from './FormModal';
import InfoBox from '../../../componentes/InfoBox';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [usuariosPesquisa, setUsuariosPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await api.get("/usuarios");

            setUsuarios(response.data);
        }

        document.title = "Usuários - Cadastro de membros CEM";

        fetchUsuarios();
    }, []);

    const pesquisar = e => {
        let filteredSuggestions = usuarios.filter((suggestion) => {
            return suggestion.nome.toLowerCase().includes(e.currentTarget.value.toLowerCase());
        });

        setUsuariosPesquisa(filteredSuggestions);
        setPesquisa(e.target.value);
    }

    const remover = async (id) => {
        let data = await api.delete("/usuarios", id);

        if (data === "OK") {
            const items = usuarios.filter(item => item.id !== id);

            setUsuarios(items);

            NotificationManager.success("Usuário removido com sucesso!", 'Sucesso');
        } else {
            NotificationManager.error("Não foi possível remover o usuário!", 'Erro');
        }
    }

    const opcoes = (usuario) => {
        return (
            <>
                <button
                    key={usuario.id + "editar"}
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                        setUsuarioSelecionado(usuario);
                        setShow(true);
                    }}
                    title="Editar usuário"
                >
                    <i className="fa fa-gear"></i>
                </button>
                &nbsp;
                <button
                    key={usuario.id + "remover"}
                    type="button"
                    onClick={() => remover(usuario.id)}
                    value={usuario.id}
                    className="btn btn-danger btn-xs"
                    title="Remover usuário"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const handleShow = () => {
        setUsuarioSelecionado({});
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
                                        placeholder="Pesquise por nome"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card overflow-hidden align-items-center">
                        <Tabela
                            data={pesquisa ? usuariosPesquisa : usuarios}
                            titulo="Usuários"
                            mostrarBotaoNovo={true}
                            tituloBotao="Novo Usuário"
                            handleShow={handleShow}
                        >
                            <Coluna campo="nome" titulo="Nome" tamanho="20" />
                            <Coluna campo="email" titulo="E-mail" tamanho="20" />
                            <Coluna campo="nivel" titulo="Nivel" tamanho="12" />
                            <Coluna titulo="Opções" corpo={(item) => opcoes(item)} tamanho="10" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal className="modal-lg" data={usuarioSelecionado} show={show} handleShow={handleShow} />
        </>
    )
}

export default Usuarios;