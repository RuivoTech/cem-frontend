import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovaInscricao from "./form";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Inscricao from "./Inscricao";

class Inscricoes extends Component {

    state = {
        carregando: false,
        data: [{
            id: 0,
            nome: "",
            email: "",
            celular: "",
            pago: "",
            idEvento: "",
            evento: ""
        }],
        membros: [{}],
        eventos: [{
            id: 0,
            ativo: "",
            dataIicio: "",
            dataFim: "",
            descricao: "",
            valor: "",
        }],
        InscricaoSelecionada: {
            id: 0,
            nome: "",
            email: "",
            celular: "",
            pago: "",
            idEvento: "",
            evento: ""
        },
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Inscrições - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchEvento();        
    }

    fetchEvento = async () => {
        let data = await api.get("/evento/listar");
        this.setState({
            eventos: data
        });

        await this.fetchInscricao();
    }

    fetchInscricao = async () => {
        let data = await api.get("/inscricao/listar");
        this.setState({
            carregando: false,
            data
        });

        this.fetchMembros();
    };

    fetchMembros = async () => {
        let data = await api.get("/membro/listar");
        this.setState({
            membros: data
        });
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            InscricaoSelecionada: e.value,
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        });
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let inscricao = new Inscricao();
        let evento = this.state.eventos.filter(evento => evento.id === this.state.InscricaoSelecionada.idEvento);
        
        inscricao.id = this.state.InscricaoSelecionada.id;
        inscricao.nome = this.state.InscricaoSelecionada.nome;
        inscricao.email = this.state.InscricaoSelecionada.email;
        inscricao.celular = this.state.InscricaoSelecionada.celular;
        inscricao.pago = this.state.InscricaoSelecionada.pago;
        inscricao.idEvento = this.state.InscricaoSelecionada.idEvento;
        inscricao.evento = evento[0].descricao;

        this.setState({
            carregando: true
        });
        let data = await api.post("/inscricao/salvar",  inscricao);

        NotificationManager.success("Inscrição salva com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            InscricaoSelecionada: {
                id: 0,
                nome: "",
                email: "",
                celular: "",
                pago: "",
                idEvento: "",
                evento: ""
            },
            error: data
        });

        this.fetchInscricao();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                InscricaoSelecionada: {
                    ...this.state.InscricaoSelecionada,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                InscricaoSelecionada: {
                    ...this.state.InscricaoSelecionada,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    remover = async (id) => {
        let data = await api.delete("/inscricao/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Inscrição removida com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o inscrição!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    pago = (rowData, column) => {
        return rowData.pago === "1" ? "Sim" : "Não";
    }

    selecionarSugestao = event => {
        let membroSelecionado = this.state.membros.filter(membro => {
            return membro.id === event.currentTarget.id ? membro : null;
        });

        membroSelecionado = membroSelecionado[0];
        
        this.setState({
            InscricaoSelecionada: {
                ...this.state.InscricaoSelecionada,
                idMembro: membroSelecionado.id,
                email: membroSelecionado.contato.email,
                nome: membroSelecionado.nome,
                celular: membroSelecionado.contato.celular
            }
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="inscrição" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row text-center">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovaInscricao data={this.state.InscricaoSelecionada} handleChange={this.handleChange} membros={this.state.membros}
                            eventos={this.state.eventos} mostrarBotao="true" sugestaoSelecionada={this.selecionarSugestao} handleSubmit={this.handleSubmit} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.InscricaoSelecionada} onSelectionChange={this.onClick} >
                                <Column field="id" header="ID" />
                                <Column field="nome" header="Nome" />
                                <Column field="email" header="E-mail" />
                                <Column field="celular" header="Celular" />
                                <Column field="evento" header="Evento" />
                                <Column field="pago" header="Pago" body={this.pago} />
                                <Column field="id" header="Opções" body={this.opcoes} />
                            </DataTable>
                            {this.state.carregando && <Carregando />}
                        </Collapse>
                    </div>
                </div>
            </>
        )
    }
}

export default Inscricoes;