import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { NotificationManager } from "react-notifications";

import api from "../../../services/api";
import NovoUsuario from "./form";
import Usuario from "./Usuario";
import Menu from "../../../componentes/Menu";
import Carregando from '../../../componentes/Carregando';
import Permissao from "./Permissao";
import MenuClass from "./Menu";

class Usuarios extends Component {

    state = {
        carregando: false,
        data: [],
        UsuarioSelecionado: {
            id: 0,
            nomeUsuario: "",
            senha: "",
            confirmaSenha: "",
            chEsMembro: "",
            email: "",
            permissoes: [
                Permissao
            ]
        },
        Membros: [],
        Menu: [new MenuClass(), new MenuClass()],
        isOpen: true,
        tabelaEstaAberta: true,
        error: ""
    }

    async componentDidMount(){
        document.title = "Usuários - Cadastro de membros CEM";
        this.setState({
            carregando: true
        });

        this.fetchUsuario();       
    }

    fetchUsuario = async () => {
        let data = await api.get("/usuario/listar");
        this.setState({
            carregando: false,
            data
        });

        await this.fetchMenu();
    };

    fetchMenu = async () => {
        let data = await api.get("/menu/listar");
        this.setState({
            Menu: data
        });

        this.fetchMembros();
    };

    fetchMembros = async () => {
        let data = await api.get("/membro/listar");
        this.setState({
            Membros: data
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
        if( this.state.UsuarioSelecionado.id === 0 && !this.confirmaSenha()){
            NotificationManager.warning("Por favor, verifique a senha inserida!", "Atenção");
            return;
        }
        const usuario = new Usuario();

        usuario.id = this.state.UsuarioSelecionado.id;
        usuario.nomeUsuario = this.state.UsuarioSelecionado.nomeUsuario;
        usuario.senha = this.state.UsuarioSelecionado.senha;
        usuario.email = this.state.UsuarioSelecionado.email;
        usuario.chEsMembro = this.state.UsuarioSelecionado.chEsMembro;
        usuario.chEsUsuario = this.state.UsuarioSelecionado.chEsUsuario;
        usuario.permissoes = this.state.UsuarioSelecionado.permissoes;
        
        if(usuario.permissoes[0] === Permissao){
            usuario.permissoes.splice(0, 1);
        }

        this.setState({
            carregando: true
        });
        let data = await api.post("/usuario/salvar",  usuario);
        
        NotificationManager.success("Usuário salvo com sucesso!", "Sucesso");
        
        this.setState({
            carregando: false,
            UsuarioSelecionado: {
                id: 0,
                nomeUsuario: "",
                email: "",
                senha: "",
                confirmaSenha: "",
                chEsMembro: "",
                permissoes: [
                    Permissao
                ]
            },
            error: data
        });
        this.fetchUsuario();
    }

    confirmaSenha = () => {
        return this.state.UsuarioSelecionado.senha === this.state.UsuarioSelecionado.confirmaSenha;
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

    handleChangePermissao = async event => {
        let permissao = this.state.UsuarioSelecionado.permissoes.filter((permissao) => {
            return (permissao.chEsMenuPermissao === event.target.value)
        });
        let permissoes = this.state.UsuarioSelecionado.permissoes.filter((permissao) => {
            return (permissao.chEsMenuPermissao !== event.target.value)
        });
        
        let novaPermissao = new Permissao();
        novaPermissao.id = permissao[0] ? permissao[0].id : 0;
        novaPermissao.chEsUsuario = this.state.UsuarioSelecionado.id;
        novaPermissao.chEsMenuPermissao = permissao[0] ? permissao[0].chEsMenuPermissao: event.target.value;
        novaPermissao.permissao = permissao[0] ? !permissao[0].permissao : true;
        
        await permissoes.push(novaPermissao);

        this.setState({
            UsuarioSelecionado: {
                ...this.state.UsuarioSelecionado,
                permissoes: permissoes
            }
        });
    }

    handleLimpar = () => {
        this.setState({
            UsuarioSelecionado: {
                id: 0,
                nomeUsuario: "",
                email: "",
                senha: "",
                confirmaSenha: "",
                chEsMembro: "",
                chEsUsuario: "",
                permissoes: [
                    Permissao
                ]
            }
        });
    }

    remover = async (id) => {
        let data = await api.delete("/usuario/remover", id);

        if(data === "OK"){
            const items = this.state.data.filter(item => item.id !== id);

            this.setState({
                tabelaEstaAberta: true,
                data: items,
            });

            NotificationManager.success("Usuário removido com sucesso!", 'Sucesso');
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

    usuarioSelecionado = event => {
        let usuarioSelecionado = this.state.Membros.filter(membro => {
            return membro.id === event.currentTarget.id ? membro : null;
        });
        usuarioSelecionado = usuarioSelecionado[0];
        
        this.setState({
            UsuarioSelecionado: {
                ...this.state.UsuarioSelecionado,
                chEsMembro: usuarioSelecionado.id,
                nomeUsuario: usuarioSelecionado.nome,
                email: usuarioSelecionado.contato.email
            }
        });
    }

    isChecked = (item) => {
        let permissao = this.state.UsuarioSelecionado.permissoes.filter((permissao) => {
            return (permissao.chEsMenuPermissao === item.id ? permissao : null);
        });
        permissao = permissao.length > 0 ? permissao[0].permissao : null;

        return permissao ? true : false;
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
                            <NovoUsuario data={this.state.UsuarioSelecionado} handleChange={this.handleChange} mostrarBotao="true"
                            handleLimpar={this.handleLimpar} handleSubmit={this.handleSubmit} usuarios={this.state.Membros}
                            listaMenu={this.state.Menu} handleChangePermissao={this.handleChangePermissao} isChecked={this.isChecked}
                            usuarioSelecionado={this.usuarioSelecionado} />
                        </Collapse>
                        <Collapse isOpen={this.state.tabelaEstaAberta}>
                            <DataTable className="table" value={this.state.data} selectionMode="single" globalFilter={this.state.pesquisa}
                            selection={this.state.UsuarioSelecionado} onSelectionChange={this.onClick} rowGroupMode="rowspan" sortField="nomeUsuario" 
                            sortOrder={1} groupField="nomeUsuario" >
                                <Column field="id" header="ID" />
                                <Column field="nomeUsuario" header="Nome Usuario" />
                                <Column field="email" header="E-mail" />
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

export default Usuarios;