import axios from "axios";

export const URL = "https://cem2.ruivotech.com.br/api";

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