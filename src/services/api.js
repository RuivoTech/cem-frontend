<<<<<<< HEAD
import axios from "axios";

//const URL = "http://192.168.0.4/cem-api";

const request = axios.create({
    baseURL: "http://api.ruivotech.com.br/cem-api",
    responseType: "json"
});

const URL = "http://api.ruivotech.com.br/cem-api";

const api = {
    get: async function (local, dados) {
        let data = await request.get(URL + local + "/" + dados);
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
=======
import { NotificationManager } from 'react-notifications';

const URL = "http://api.ruivotech.com.br/cem-api";
//const URL = "http://177.154.248.249:8080/cem-api";

const api = {
    get: async function (local, dados) {
        console.log(dados);
        dados = dados !== undefined ? "/" +  dados : "";
        let resultado = await fetch(URL + local + dados);
        
        if(resultado.status !== 200) {
            NotificationManager.error("Algo deu errado, favor entrar em contato com o Adminsitrador do sistema!", 'Erro!');
        }else{
            let data = await resultado.json();

            return data;
        }
    },

    post: async function (local, dados) {
        let resultado;
        resultado = await fetch(URL + local, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dados)
        });

        if(resultado.status !== 200) {
            NotificationManager.error("Algo deu errado, favor entrar em contato com o Adminsitrador do sistema!", 'Error!');
        }else{
            let data = await resultado.json();

            return data;
        }
    },

    delete: async function (local, dados) {
        let resultado = await fetch(URL + local + "/" + dados, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });

        if(resultado.status !== 200) {
            NotificationManager.error("Algo deu errado, favor entrar em contato com o Adminsitrador do sistema!", 'Error!');
        }else{
            let data = await resultado.json();

            return data;
        }
>>>>>>> Dev
    }
}

export default api;