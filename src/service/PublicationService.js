import http from "@/http-common"

class PublicationService {

    findAll() {
        return http.get("/publications");
    }

    save(data) {
        return http.post("/publications", data);
    }

    update(id, data) {
        return http.put(`/publications/${id}`, data);
    }

    delete(id) {
        return http.delete(`/publications/${id}`);
    }
}

export default new PublicationService();