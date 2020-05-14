import axios from "axios";
import { NotificationManager } from "react-notifications";

const hostname = window.location.hostname;

export const URL = hostname === "localhost" ? "http://localhost/cem-api/" : "https://api.ruivotech.com.br";

const request = axios.create({
    baseURL: URL,
    responseType: "json"
});

const api = {
    get: async function (local, dados) {
        try {
            let data = await request.get(local + "/" + dados);
            return data.data;
        } catch(error) {
            NotificationManager.error("Algo deu errado, por favor entre em contato com o Administrador!")
        }
    },

    post: async function (local, dados) {
        try {
            let data = await request.post(local, dados);

            return data.data;
        } catch (error) {
            
            NotificationManager.error("Não foi possível salvar este membro, por favor entre em contato com o Administrador!", "Erro");
        }        
    },

    delete: async function (local, dados) {
        try{
            let data = await request.delete(local + "/" + dados);
            return data.data;
        } catch(error) {
            NotificationManager.error("Algo deu errado, por favor entre em contato com o Administrador!")
        }
    }
}

export default api;