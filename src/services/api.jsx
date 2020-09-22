import axios from "axios";

export const URL = "https://" + window.location.hostname + ":3333";
export const URL_RELATORIO = "https://" + window.location.hostname;

const api = axios.create({
    baseURL: URL
});

export default api;