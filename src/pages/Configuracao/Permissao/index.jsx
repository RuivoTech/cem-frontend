import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovaPermissao from "./form";
import Usuario from "./Usuario";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';

class Permissoes extends Component {

    state = {
        carregando: false,
        data: [Usuario],
        UsuarioSelecionado: Usuario,
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
            carregando: false,
            Usuarios: data
        });

        this.fetchMenu();
    };

    fetchMenu = async () => {
        let data = await api.get("/menu/listar");
        this.setState({
            Menu: data
        });
    };

    toggleTabelaForm = () => {
        this.setState({
            tabelaEstaAberta: !this.state.tabelaEstaAberta
        })
    }

    onClick = e => {
        this.setState({
            UsuarioSelecionado: e.value,
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
            UsuarioSelecionado: Usuario,
            error: data
        });
        this.fetchPermissao();
    }

    handleChange = e => {
        const [ item, subItem ] = e.target.name.split(".");

        if(subItem) {
            this.setState({
                UsuarioSelecionado: {
                    ...this.state.UsuarioSelecionado,
                    [item]: {
                        [subItem]: e.target.value
                    }
                }
            });
        }else{
            this.setState({
                UsuarioSelecionado: {
                    ...this.state.UsuarioSelecionado,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    handleChangePermissao = (data) => {
        console.log(this.state.UsuarioSelecionado);
        this.setState({
            UsuarioSelecionado: {
                ...this.state.UsuarioSelecioando,
                permissoes: {
                    ...this.state.UsuarioSelecioando.permissoes,
                    permissao: data.value
                }
            }
        })
    }

    handleLimpar = () => {
        this.setState({
            UsuarioSelecionado: Usuario
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

    usuarioSelecioando = event => {
        let usuarioSelecionado = this.state.Usuarios.filter(usuario => {
            return usuario.id === event.currentTarget.id ? usuario : null;
        });
        usuarioSelecionado = usuarioSelecionado[0];
        
        this.setState({
            UsuarioSelecionado: {
                ...this.state.UsuarioSelecionado,
                id: usuarioSelecionado.id,
                nomeUsuario: usuarioSelecionado.nomeUsuario,
                permissoes: usuarioSelecionado.permissoes
            }
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="permissão" 
                    pesquisa={this.pesquisa} mostrarBotao="true" />
                </div>
                <div className="row">
                    <div className="container-fluid px-2">
                        <Collapse isOpen={!this.state.tabelaEstaAberta}>
                            <NovaPermissao data={this.state.UsuarioSelecionado} handleChange={this.handleChange} mostrarBotao="true"
                            handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} usuarios={this.state.Usuarios}
                            listaMenu={this.state.Menu} handleChangePermissao={this.handleChangePermissao} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.Usuarios} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.UsuarioSelecionado} onSelectionChange={this.onClick} rowGroupMode="rowspan" sortField="nomeUsuario" 
                            sortOrder={1} groupField="nomeUsuario" >
                                <Column field="id" header="ID" />
                                <Column field="nomeUsuario" header="Nome Usuario" />
                                <Column field="email" header="E-mail" />
                                <Column field="nivel" header="Nível" />
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

export default Permissoes;