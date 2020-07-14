import axios from "axios";

export const URL = "http://" + window.location.hostname + ":3333";
export const URL_RELATORIO = "http://" + window.location.hostname;

const api = axios.create({
    baseURL: URL
});

export default api;