import http from "@/http-common"

class SubscriptionService {

    findAll() {
        return http.get("/subscriptions");
    }

    save(data) {
        return http.post("/subscriptions", data);
    }

    delete(id) {
        return http.delete(`/subscriptions/${id}`);
    }
}

export default new SubscriptionService();