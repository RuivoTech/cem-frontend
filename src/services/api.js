import axios from "axios";

//const URL = "http://192.168.0.7/cem-api";

const request = axios.create({
    baseURL: "http://192.168.0.7/cem-api",
    responseType: "json"
});

//const URL = "https://api.ruivotech.com.br/cem-api";

const api = {
    get: async function (local, dados) {
        let data = await request.get(local + "/" + dados);
        //let data = await resultado.json();
        
        return data.data;
    },

    post: async function (local, dados) {
        let data = await request.post(URL + local, dados);
        
        return data.data;
    },

    delete: async function (local, dados) {
        let data = await request.delete(URL + local + "/" + dados);

        return data.data;
    }
}

export default api;