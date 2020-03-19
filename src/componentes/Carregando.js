import React from "react";

const Carregando = () => {
    return (
        <div className="text-center text-success">
            <div className="spinner-border" role="status">
                <span className="sr-only ">Carregando...</span>
            </div>
            <span className="h3 text-success pl-3">Carregando...</span>
        </div>
    )
}

export default Carregando;