import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { useToasts } from "react-toast-notifications";


const Inscricoes = () => {
    const [inscricao, setInscricao] = useState({});
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState("");
    const { addToast } = useToasts();

    useEffect(() => {
        const fetchEventos = async () => {
            document.title = "Inscrições para eventos do CEM";
            let request = await api.get("/eventos", {
                params: {
                    ativo: true
                }
            });

            setEventos(request.data);
        };

        fetchEventos();
    }, []);

    const onChange = event => {
        setInscricao({
            ...inscricao,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setCarregando(true);

        setInscricao({
            ...inscricao,
            pago: false
        })

        const request = await api.post("/inscricao", inscricao);

        if (!request.data.error) {
            addToast("Inscrição salva com sucesso!", { appearance: "success" });
            setInscricao({});
        } else {
            console.error(request.data.error);
            addToast("Desculpe, algo deu errado, por favor entre em contato com seu pastor.", { appearance: "error" });
            setError(request.data.error);
        }

        setCarregando(false);
    }

    const opcoes = () => {
        eventos.map((evento) => {
            return <option key={evento.id} value={evento.id}>{evento.descricao}</option>
        });
    };

    return (
        <>
            <div className="container align-items-center">
                <h1 className="h1 text-center my-5">Inscrições para eventos do CEM</h1>
                <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-5 mx-auto">
                        <div className="card my-5">
                            <div className="card-body">
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <form className="form-sigin" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="nome" onChange={onChange}
                                            placeholder="Nome completo" required />
                                    </div>

                                    <div className="form-group">
                                        <select className="form-control evento" name="evento" onChange={onChange} required>
                                            <option value="">Escolha um evento</option>
                                            {opcoes}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control email" type="email" name="email" onChange={onChange}
                                            placeholder="Email" required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="celular" onChange={onChange}
                                            placeholder="Celular" required />
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                    </div>
                                    <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit"
                                        disabled={carregando}>Inscrever-se</button>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inscricoes;