import React, { useState } from "react";
import "./styles.css";
import Paginacao from "../Paginacao";

const Tabela = ({ titulo, tituloBotao, mostrarBotaoNovo, data = [], handleShow, height, corLinha, maxHeight, children = [] }) => {
    const [items, setItems] = useState([]);



    const renderValor = (campo, item) => {
        const [grupo, subGrupo] = campo.split(".");
        let retorno = "";

        if (subGrupo) {
            retorno = item[grupo][subGrupo];
        } else {
            retorno = item[campo];
        }

        return retorno;
    }

    const listarItems = (items) => {

        setItems(items);
    }

    return (
        <>
            <div className="ibox float-e-margins mb-0">
                {titulo &&
                    <div className="ibox-title">
                        <div className="h1 pull-left">{titulo}</div>
                        <div className="ibox-tools">
                            {mostrarBotaoNovo ?
                                <div className="button-group">
                                    <button
                                        className="btn btn-outline-primary"
                                        type="button"
                                        title={tituloBotao}
                                        onClick={() => handleShow({})}>
                                        {tituloBotao}
                                    </button>&nbsp;
                        </div> : null}
                        </div>
                    </div>}
                <div className="ibox-content">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper">
                            <div className="overflow-hidden" style={height}>
                                <table className="table table-sm table-striped table-hover">
                                    <thead className="thead-light">
                                        <tr >
                                            {children.map((child) => {
                                                return (<th scope="col" key={child.props.titulo} style={{ width: child.props.tamanho + "vw" }}>{child.props.titulo}</th>)
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="overflow-auto"
                                        style={{ maxHeight: "calc(80vh - 230px)" }}
                                    >
                                        {items?.map((item, index) => {
                                            return (
                                                <tr role="row" key={index} className={corLinha ? corLinha(item) : null}>
                                                    {React.Children.map(children, child => {
                                                        const valor = child.props.corpo ? child.props.corpo(item) : renderValor(child.props.campo, item);

                                                        return React.cloneElement(child, {
                                                            valor,
                                                            className: child.props.className
                                                        })
                                                    })}
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <Paginacao data={data} quantidadeItems={data.length} renderItems={(items) => listarItems(items)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabela;