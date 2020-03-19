import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovaPermissao from "./form";
import Permissao from "./Permissao";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';

class Permissoes extends Component {

    state = {
        carregando: false,
        data: [Permissao],
        PermissaoSelecionada: Permissao,
        Usuarios: [],
        Menu: [],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Permissao - Cadastro de membros CEM";
        this.setState({
            carregando: true
        })
        await this.fetchUsuario();        
    }

    fetchUsuario = async () => {
        let data = await api.get("/usuario/listar");
        this.setState({
            Usuarios: data
        });

        this.fetchMenu();
    };

    fetchMenu = async () => {
        let data = await api.get("/menu/listar");
        this.setState({
            Menu: data
        });

        this.fetchPermissao();
    };

    fetchPermissao = async () => {
        let data = await api.get("/permissao/listar");
        this.setState({
            carregando: false,
            data
        })
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            PermissaoSelecionada: e.value,
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

        const permissao = this.state.PermissaoSelecionada;
        this.setState({
            carregando: true
        });
        let data = await api.post("/permissao/salvar",  permissao);


        NotificationManager.success("Permissao salva com sucesso!", "Sucesso");

        this.setState({
            carregando: false,
            PermissaoSelecionada: Permissao,
            error: data
        });
        this.fetchPermissao();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                PermissaoSelecionada: {
                    ...this.state.PermissaoSelecionada,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                PermissaoSelecionada: {
                    ...this.state.PermissaoSelecionada,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleLimpar = () => {
        this.setState({
            PermissaoSelecionada: Permissao
        });
    }

    remover = async (id) => {
        let data = await api.delete("/permissao/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Permissão removido com sucesso!", 'Sucesso');
        } else {

            this.setState({
                tabelaEstaAberta: true,
            });
            NotificationManager.error("Não foi possível remover o permissão!", 'Erro');
        }
    }

    opcoes = (rowData, column) => {
        return(
            <button key={rowData.id} type="button" onClick={() => this.remover(rowData.id)} value={rowData.id} className="btn btn-danger btn-sm" title="Remover"><i className="fa fa-trash"></i></button>
        )
    }

    headerTemplate(data) {
        return data.nomeUsuario;
    }

    permissao = (rowData, column) => {
        return rowData.permissao ? "Sim" : "Não";
    }

    usuarioSelecioando = event => {
        let usuarioSelecionado = this.state.Usuarios.filter(usuario => {
            return usuario.id === event.currentTarget.id ? usuario : null;
        });
        usuarioSelecionado = usuarioSelecionado[0];
        
        this.setState({
            PermissaoSelecionada: {
                ...this.state.PermissaoSelecionada,
                chEsUsuario: usuarioSelecionado.id,
                nomeUsuario: usuarioSelecionado.nomeUsuario
            }
        });
    }

    menuSelecionado = event => {
        this.setState({
            PermissaoSelecionada: {
                ...this.state.PermissaoSelecionada,
                permissoes: [
                    ...this.state.PermissaoSelecionada.permissoes,   
                    {
                        
                    }
                ]
            }
        })
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="permissão" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="container-fluid">
                    <Collapse isOpen={!this.state.tabelaEstaAberta}>
                        <NovaPermissao data={this.state.PermissaoSelecionada} handleChange={this.handleChange} mostrarBotao="true"
                        handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} usuarios={this.state.Usuarios}
                        usuarioSelecionado={this.usuarioSelecioando} menu={this.state.Menu} />
                    </Collapse>
                    <Collapse isOpen={this.state.tabelaEstaAberta}>
                        <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                        selection={this.state.PermissaoSelecionada} onSelectionChange={this.onClick} rowGroupMode="rowspan" sortField="nomeUsuario" 
                        sortOrder={1} groupField="nomeUsuario" >
                            <Column field="id" header="ID" />
                            <Column field="nomeMenu" header="Nome Menu" />
                            <Column field="permissao" header="Permissão" body={this.permissao} />
                            <Column field="id" header="Opções" body={this.opcoes} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </Collapse>
                </div>
            </>
        )
    }
}

export default Permissoes;