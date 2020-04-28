import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import Menu from "../../componentes/Menu";
import api from "../../services/api";
import Carregando from "../../componentes/Carregando";
import Utils from '../../componentes/Utils';

const listaEstadoCivil = [
    {
        id: 0,
        descricao: "Não informado"
    },
    {
        id: 1,
        descricao: "Solteiro(a)"
    },{
        id: 2,
        descricao: "Casado(a)"
    },{
        id: 3,
        descricao: "Divorciado(a)"
    },{
        id: 4,
        descricao: "Viúvo(a)"
    },{
        id: 5,
        descricao: "Separado(a)"
    }
];

class Home extends Component {

    state = {
        carregando: true,
        data: [{
            dataNascimento: ""
        }],
        expandedRows: null
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

    rowExpansionTemplate(data) {
        let estadoCivil = listaEstadoCivil.filter((item) => {
            return (
                item.id === Number(data.estadoCivil) ? item : null
            )})

        estadoCivil = estadoCivil[0]
        
        return  (
            <>
            <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
                    <a className="nav-link active lista" href={"#pessoal" + data.id} role="tab" data-toggle="tab">Dados Pessoais</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#contato" + data.id} role="tab" data-toggle="tab">Contato</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#endereco" + data.id} role="tab" data-toggle="tab">Endereço</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link lista" href={"#igreja" + data.id} role="tab" data-toggle="tab">Dados Igreja</a>
                </li>
            </ul>
            <div className="tab-content mt-2" style={{ minHeight: '23vh' }}>
                <div className="tab-pane fade show active lista" id={"pessoal" + data.id} role="tabpanel">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">Nome:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.nome}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">RG:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.rg}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Data de Nascimento:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{Utils.converteData(data, "dataNascimento")}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Sexo:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.sexo === "1" ? "Homem" : "Mulher"}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Profissão:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.profissao}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Estado Civil:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>
                                {estadoCivil.descricao}
                            </div>
                        </div>
                        {Number(data.estadoCivil) === 2 ?
                            <div className="col-md-6">
                                <div className="h6">Conjuge:</div>
                                <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.conjuge}</div>
                            </div>
                        : null }
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"contato" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">E-mail:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.email}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Telefone:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.telefone}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Celular:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.contato.celular}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"endereco" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">CEP:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.cep}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Logradouro:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.logradouro + ", " + data.endereco.complemento}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Cidade:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.cidade}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Estado:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.endereco.estado}</div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade lista" id={"igreja" + data.id}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h6">Batizado?</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.isBatizado ? "Sim" : "Não"}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Data Batismo:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{Utils.converteData(data.dadosIgreja, "dataBatismo")}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Igreja Batizado:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.igrejaBatizado}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Ultimo Pastor:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.ultimoPastor}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="h6">Ultima Igreja:</div>
                            <div className="h6 ml-2" style={{fontWeight:'bold'}}>{data.dadosIgreja.ultimaIgreja}</div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
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
                        <DataTable className="table mw-100" header={header} value={this.state.data}  globalFilter={this.state.pesquisa}
                         expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})} 
                         rowExpansionTemplate={this.rowExpansionTemplate} dataKey="id">
                            <Column expander={true} style={{width:'2%'}} />
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