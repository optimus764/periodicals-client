import axios from "axios";

// Усі запити йдуть на /api/..., а devServer (vue.config.js) пересилає їх на localhost:8080
export default axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    }
});