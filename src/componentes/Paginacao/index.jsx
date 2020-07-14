import React, { useState, useEffect } from "react";

const Paginacao = ({ data, quantidadeItems, renderItems }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [contador, setContador] = useState(0);
    const [delimitador, setDelimitador] = useState(1);
    const [limiteItems, setLimiteItems] = useState(20);
    const [totalPaginas, setTotalPaginas] = useState([]);

    useEffect(() => {
        const retorno = () => {
            const paginas = Math.ceil(quantidadeItems / limiteItems);
            let numeroPaginas = [];

            for (let index = 1; index <= paginas; index++) {
                numeroPaginas.push(index);
            }

            setTotalPaginas(numeroPaginas);
        }

        retorno();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantidadeItems]);

    useEffect(() => {
        const listarItems = () => {
            let count = (paginaAtual * limiteItems) - limiteItems;
            let delimiter = (count + limiteItems);
            let resultado = [];

            for (let i = count; i < delimiter; i++) {
                if (data[i] != null) {
                    resultado.push(data[i]);
                }
                count++;
            }

            setContador((paginaAtual * limiteItems) - limiteItems + 1, setDelimitador(delimiter));

            renderItems(resultado);
        }

        listarItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual, totalPaginas]);

    return (
        <>
            <div className="dataTables_info pull-left pt-3">
                Exibindo de {contador} a {delimitador > quantidadeItems ? quantidadeItems : delimitador} / Total {quantidadeItems}
            </div>
            <div className="dataTables_paginate paging_simple_numbers pull-right pt-3">
                <ul className="pagination justify-content-end mb-0">
                    <li className={paginaAtual === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>Anterior</button>
                    </li>
                    {totalPaginas.map((pagina) => {
                        return (
                            <li key={pagina} className={paginaAtual === pagina ? "page-item active" : "page-item"}>
                                <button className="page-link" onClick={() => setPaginaAtual(pagina)}>{pagina}</button>
                            </li>
                        )
                    })}
                    <li className={paginaAtual === totalPaginas[totalPaginas.length - 1] ? "page-item disabled" : "page-item"}>
                        <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>Próxima</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Paginacao;