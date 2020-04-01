import axios from "axios";

const hostname = window.location.hostname;

const request = axios.create({
    baseURL: hostname === "localhost" ? "http://192.168.0.7/cem-api" : "https://api.ruivotech.com.br/cem-api",
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