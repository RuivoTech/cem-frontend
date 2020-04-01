import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import Menu from "../../componentes/Menu";
import api from "../../services/api";
import Carregando from "../../componentes/Carregando";
import Utils from '../../componentes/Utils';

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

    idade = (rowData, column) => {
        return rowData.idade > 1 ? rowData.idade + " anos" : rowData.idade + " ano";
    }

    pesquisa = e => {
        this.setState({
            pesquisa: e.target.value
        });
    }

    render() {
        const { toggleSidebar } = this.props;
        let header = <div className="h1">Aniversariantes do mês</div>;
        return (
            <>
                <div className="menu">
                    <Menu toggleTabelaForm={this.toggleTabelaForm} toggleSidebar={toggleSidebar} componente="home"
                    pesquisa={this.pesquisa} />
                </div>
                <div className="row text-center">
                    <div className="container-fluid px-2">
                        <DataTable className="table mw-100" header={header} value={this.state.data}  globalFilter={this.state.pesquisa}>
                            <Column field="nome" header="Nome" style={{width:'12%'}} />
                            <Column field="contato.email" header="E-mail" style={{width:'12%'}} />
                            <Column field="contato.telefone" header="Telefone" style={{width:'8%'}} />
                            <Column field="contato.celular" header="Celular" style={{width:'8%'}} />
                            <Column field="dataNascimento" header="Data de Nascimento" body={ (rowData) => Utils.converteData(rowData, "dataNascimento")}
                            style={{width:'12%'}} />
                            <Column field="idade" header="Idade" body={this.idade} style={{width:'5%'}} />
                        </DataTable>
                        {this.state.carregando && <Carregando />}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Home);