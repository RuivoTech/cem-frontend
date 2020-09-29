import axios from "axios";

export const URL = "http://localhost:3333";
export const URL_RELATORIO = "https://" + window.location.hostname;

const api = axios.create({
    baseURL: URL
});

export default api;