//const URL = "http://192.168.0.4/cem-api";
const URL = "http://api.ruivotech.com.br/cem-api";

const api = {
    get: async function (local, dados) {
        let resultado = await fetch(URL + local + "/" + dados);
        let data = await resultado.json();

        return data;
    },

    post: async function (local, dados) {
        let resultado = await fetch(URL + local, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dados)
        });

        let data = await resultado.json();

        return data;
    },

    delete: async function (local, dados) {
        let resultado = await fetch(URL + local + "/" + dados, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });

        let data = await resultado.json();

        return data;

    }
}

export default api;