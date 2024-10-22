import axios from "axios";

export const BaseUrl = 'http://localhost:8080';  // Ensure the correct base URL (API server)

export const myAxios = axios.create({
    baseURL: BaseUrl,
});
