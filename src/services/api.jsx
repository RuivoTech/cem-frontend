import axios from "axios";

export const URL = "https://" + window.location.hostname + "/api";
export const URL_RELATORIO = "https://" + window.location.hostname;

const request = axios.create({
    baseURL: URL,
    responseType: "json"
});

const api = {
    get: async function (local, dados) {
        let data = await request.get(local + "/" + dados);
        //let data = await resultado.json();
        
        return data.data;
    },

    post: async function (local, dados) {
        let data = await request.post(local, dados);
        
        return data.data;
    },

    delete: async function (local, dados) {
        let data = await request.delete(local + "/" + dados);

        return data.data;
    }
}

export default api;