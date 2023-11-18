import axios from "axios";

export const api = axios.create({ baseURL: "https://api.ollie.elanto.com.br" });