import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import Menu from "../../componentes/Menu";
import api from "../../services/api";
import Carregando from "../../componentes/Carregando";

class Home extends Component {

    state = {
        carregando: true,
        data: [{
            dataNascimento: ""
        }]
    }

    async componentDidMount(){
        document.title = "Home - Cadastro de membros CEM";
        await this.fetchMembro();        
    }

    fetchMembro = async () => {
        let data = await api.get("/membro/listarAniversariante");
        this.setState({
            carregando: false,
            data
        })
    };

    dataNascimento = (rowData, column) => {
        let dataNascimento = rowData.dataNascimento;
        const [ ano, mes, dia ] = dataNascimento.split("-");

        return dataNascimento.length > 0 ? ( dia + '/' + mes + '/' + ano ) : ( null );
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        let header = <div className="h1 text-center">Aniversariantes do mês</div>;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="home"
                    pesquisa={this.pesquisa} />
                </div>
                <div className="container-fluid">
                    <DataTable className="table" header={header} value={this.state.data}  globalFilter={this.state.pesquisa}>
                        <Column field="nome" header="Nome" />
                        <Column field="contato.email" header="E-mail" />
                        <Column field="contato.telefone" header="Telefone" />
                        <Column field="contato.celular" header="Celular" />
                        <Column field="dataNascimento" header="Data de Nasccimento" body={this.dataNascimento} />
                        <Column field="idade" header="Idade" />
                    </DataTable>
                    {this.state.carregando && <Carregando />}
                </div>
            </>
        )
    }
}

export default withRouter(Home);