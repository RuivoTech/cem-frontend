import axios from "axios";

export const URL = "https://ce-api.ruivotech.com.br";
export const URL_RELATORIO = "https://" + window.location.hostname;

const api = axios.create({
    baseURL: URL
});

export default api;