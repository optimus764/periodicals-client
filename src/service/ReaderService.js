import http from "@/http-common"

class ReaderService {

    findAll() {
        return http.get("/readers");
    }

    save(data) {
        return http.post("/readers", data);
    }

    delete(id) {
        return http.delete(`/readers/${id}`);
    }
}

export default new ReaderService();