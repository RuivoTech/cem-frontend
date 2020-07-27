import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NotificationManager } from "react-notifications";

import Membro from "../../../Model/Membro";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import MinisterioMembro from "../../../Model/MinisterioMembro";
import Autocomplete from "../../../componentes/Autocomplete";
import Tabela from "../../../componentes/Tabela";
import Coluna from "../../../componentes/Coluna";
import Axios from "axios";

const FormModal = ({ data, show, handleShow, className, membros }) => {
    const [membro, setMembro] = useState({});
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);
    const [filhos, setFilhos] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {

        setMembro(data);
    }, [data]);

    useEffect(() => {
        setCarregando(false);
    }, [show]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoMembro = new Membro();

        novoMembro.id = membro.id ? membro.id : 0;
        novoMembro.nome = membro.nome;
        novoMembro.rg = membro.rg;
        novoMembro.dataNascimento = membro.dataNascimento;
        novoMembro.sexo = membro.sexo;
        novoMembro.profissao = membro.profissao;
        novoMembro.estadoCivil = membro.estadoCivil;
        novoMembro.chEsConjuge = membro?.chEsConjuge;
        novoMembro.conjuge = membro?.conjuge;
        novoMembro.ativo = 0;

        novoMembro.contato.id = membro?.contato?.id;
        novoMembro.contato.email = membro?.contato?.email;
        novoMembro.contato.telefone = membro?.contato?.telefone;
        novoMembro.contato.celular = membro?.contato?.celular;

        novoMembro.endereco.id = membro?.endereco?.id;
        novoMembro.endereco.cep = membro?.endereco?.cep;
        novoMembro.endereco.cidade = membro?.endereco?.cidade;
        novoMembro.endereco.uf = membro?.endereco?.uf;
        novoMembro.endereco.logradouro = membro?.endereco?.logradouro;

        novoMembro.dadosIgreja.id = membro?.dadosIgreja?.id;
        novoMembro.dadosIgreja.isBatizado = membro?.dadosIgreja?.isBatizado;
        novoMembro.dadosIgreja.dataBatismo = membro?.dadosIgreja?.dataBatismo;
        novoMembro.dadosIgreja.igrejaBatizado = membro?.dadosIgreja?.igrejaBatizado;
        novoMembro.dadosIgreja.ultimoPastor = membro?.dadosIgreja?.ultimoPastor;
        novoMembro.dadosIgreja.ultimaIgreja = membro?.dadosIgreja?.ultimaIgreja;

        if (Number(novoMembro.id) !== 0) {
            response = await api.put("/membros", novoMembro);
        } else {
            response = await api.post("/membros", novoMembro);
        }

        if (!response.data.error) {
            NotificationManager.success("Membro salvo com sucesso!", "Sucesso");
            setFilhos([]);
        } else {
            console.error(response.data.error);
            NotificationManager.error("Alguma coisa deu errado, por favor falar com o administrador!", "Erro");
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setMembro({
                ...membro,
                [item]: {
                    ...membro[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setMembro({
                ...membro,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleClick = (item, id, nome) => {
        const dataCasamento = nome === "conjuge" ? item.dataCasamento : membro.familia.dataCasamento;

        setMembro({
            ...membro,
            familia: {
                ...membro.familia,
                [id]: item.id,
                [nome]: item.nome,
                dataCasamento
            }
        });
    }

    const handleValue = event => {
        setValue(event.target.value);
    }

    const selecionarFilho = (item) => {
        const filho = filhos.findIndex(filho => filho.id === item.id);

        if (filho >= 0) {
            const filhosFiltrados = filhos.filter(filho => filho.id !== item.id);

            setFilhos(filhosFiltrados);
        } else {
            setFilhos([...filhos, item])
        }
        setValue("");
    }

    const handleChangeMinisterio = async event => {
        let ministerio = membro?.ministeriosMembro.filter((ministerio) => {
            return (ministerio.chEsMinisterio === event.target.value)
        });
        let ministerios = membro?.ministeriosMembro.filter((ministerio) => {
            return (ministerio.chEsMinisterio !== event.target.value)
        });

        let novoMinisterio = new MinisterioMembro();
        novoMinisterio.id = ministerio[0] ? ministerio[0].id : 0;
        novoMinisterio.chEsMembro = membro?.id;
        novoMinisterio.chEsMinisterio = ministerio[0] ? ministerio[0].chEsMministerio : event.target.value;
        novoMinisterio.checked = ministerio[0] ? !ministerio[0].checked : true;

        await ministerios.push(novoMinisterio);

        setMembro({
            ...membro,
            ministeriosMembro: ministerios
        });
    }

    const handleBlur = async evento => {
        let data = await Axios.get("https://viacep.com.br/ws/" + evento.target.value + "/json/");

        data = data.data;

        setMembro({
            ...membro,
            endereco: {
                logradouro: data.logradouro,
                cidade: data.localidade,
                uf: data.uf
            }
        });
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>{membro?.nome ? membro?.nome : "Novo Membro"}</ModalHeader>
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
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'familia' }}
                                    onClick={() => { toggle('familia'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Familia
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={{ active: tabAtivo === 'ministerio' }}
                                    onClick={() => { toggle('ministerio'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Ministério
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="nome">Nome:</label>
                                                <input className="form-control" type="text" id="nome" name="nome" value={membro?.nome}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="sexo">Sexo:</label>
                                                <select className="custom-select" id="sexo" name="sexo" value={membro?.sexo} onChange={handleChange}>
                                                    <option value="0">Escolha...</option>
                                                    <option value="1">Homem</option>
                                                    <option value="2">Mulher</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                                <input className="form-control" id="dataNascimento" name="dataNascimento" type="date"
                                                    value={Utils.converteData(membro, "dataNascimento", "YYYY-MM-DD")} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="estadoCivil">Estado Civil:</label>
                                                <select className="custom-select" id="estadoCivil" name="estadoCivil" value={membro?.estadoCivil}
                                                    onChange={handleChange}>
                                                    <option value="0">Escolha...</option>
                                                    <option value="1">Solteiro(a)</option>
                                                    <option value="2">Casado(a)</option>
                                                    <option value="3">Divorciado(a)</option>
                                                    <option value="4">Viúvo(a)</option>
                                                    <option value="5">Separado(a)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="indentidade">Identidade:</label>
                                                <input className="form-control" id="indentidade" name="rg" type="text"
                                                    value={membro?.rg} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="profissao">Profissão:</label>
                                                <input className="form-control" id="profissao" name="profissao" type="text"
                                                    value={membro?.profissao} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="contato">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail:</label>
                                                <input className="form-control" id="email" name="contato.email" type="email"
                                                    value={membro?.contato?.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="telefone">Telefone:</label>
                                                <input className="form-control" id="telefone" name="contato.telefone" type="text"
                                                    value={membro?.contato?.telefone} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="celular">Celular:</label>
                                                <input className="form-control" id="celular" name="contato.celular" type="text"
                                                    value={membro?.contato?.celular} onChange={handleChange} />
                                            </div>
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
                                                    value={membro?.endereco?.cep}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6"></div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="logradouro">Endereço:</label>
                                                <input className="form-control" id="logradouro" name="endereco.logradouro" type="text"
                                                    value={membro?.endereco?.logradouro} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <div className="form-group">
                                                <label htmlFor="numero">Número:</label>
                                                <input className="form-control" id="numero" name="endereco.numero" type="text"
                                                    value={membro?.endereco?.numero} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="complemento">Complemento:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={membro?.endereco?.complemento}
                                                    className="form-control"
                                                    id="complemento"
                                                    name="endereco.complemento"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="cidade">Cidade:</label>
                                                <input className="form-control" id="cidade" name="endereco.cidade" type="text"
                                                    value={membro?.endereco?.cidade} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="uf">Estado:</label>
                                                <input className="form-control" id="uf" name="endereco.uf" type="text"
                                                    value={membro?.endereco?.uf} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="familia">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <div className="form-group">
                                                <label htmlFor="conjuge">Nome do Cônjuge:</label>
                                                <Autocomplete className="form-control" id="conjuge" name="familia.conjuge" suggestions={membros}
                                                    onChange={handleChange} onClick={(item) => handleClick(item, "chEsConjuge", "conjuge")}
                                                    value={membro?.parentes?.conjuge} field="nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="dataCasamento">Data de Casamento:</label>
                                                <input className="form-control" id="dataCasamento" name="familia.dataCasamento" type="date"
                                                    value={membro?.dataCasamento} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="nomePai">Nome do Pai:</label>
                                                <Autocomplete className="form-control" id="nomePai" name="familia.nomePai" suggestions={membros}
                                                    onChange={handleChange} onClick={(item) => handleClick(item, "chEsPai", "nomePai")}
                                                    value={membro?.parentes?.nomePai} field="nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="nomeMae">Nome da Mãe:</label>
                                                <Autocomplete className="form-control" id="nomeMae" name="familia.nomeMae" suggestions={membros}
                                                    onChange={handleChange} onClick={(item) => handleClick(item, "chEsMae", "nomeMae")}
                                                    value={membro?.parentes?.nomeMae} field="nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="filhos">Filhos:</label>
                                                <Autocomplete
                                                    className="form-control"
                                                    id="filhos"
                                                    suggestions={membros}
                                                    onClick={(item) => selecionarFilho(item)}
                                                    onChange={handleValue}
                                                    field="nome"
                                                    value={value}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <Tabela data={filhos}>
                                                    <Coluna titulo="Nome" campo="nome" />
                                                    <Coluna titulo="E-mail" campo="contato.email" />
                                                    <Coluna titulo="Celular" campo="contato.celular" />
                                                </Tabela>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="ministerio">

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