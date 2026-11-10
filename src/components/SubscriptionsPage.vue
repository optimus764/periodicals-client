<template>
  <div>
    <h1>{{ title }}</h1>

    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="alert alert-success" v-if="lastCreated">
      Передплату оформлено! Сума до оплати: <strong>{{ lastCreated.totalAmount }} грн</strong>
      ({{ lastCreated.months }} міс.)
    </div>

    <div class="row">
      <!-- Форма оформлення передплати -->
      <div class="col-lg-5 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Оформити передплату</h5>

            <label class="form-label">Читач</label>
            <select class="form-select mb-2" v-model="subscription.readerId">
              <option disabled value="">Оберіть читача</option>
              <option v-for="r in readers" :key="r.id" :value="r.id">
                {{ r.firstName }} {{ r.lastName }}
              </option>
            </select>

            <label class="form-label">Видання</label>
            <select class="form-select mb-2" v-model="subscription.publicationId">
              <option disabled value="">Оберіть видання</option>
              <option v-for="p in publications" :key="p.id" :value="p.id">
                {{ p.title }} — {{ p.pricePerMonth }} грн/міс
              </option>
            </select>

            <label class="form-label">Кількість місяців</label>
            <input class="form-control mb-2" type="number" min="1" v-model.number="subscription.months">

            <p class="mb-2" v-if="previewTotal !== null">
              Орієнтовна сума: <strong>{{ previewTotal }} грн</strong>
            </p>

            <button class="btn btn-primary" @click="saveSubscription">Оформити</button>
          </div>
        </div>
      </div>

      <!-- Список передплат -->
      <div class="col-lg-7">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Читач</th>
              <th>Видання</th>
              <th>Міс.</th>
              <th>Початок</th>
              <th>Сума, грн</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in subscriptions" :key="s.id">
              <td>{{ s.id }}</td>
              <td>{{ readerName(s.readerId) }}</td>
              <td>{{ publicationTitle(s.publicationId) }}</td>
              <td>{{ s.months }}</td>
              <td>{{ s.startDate }}</td>
              <td>{{ s.totalAmount }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="deleteSubscription(s.id)">Видалити</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-muted" v-if="subscriptions.length === 0">Передплат ще немає.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SubscriptionService from "../service/SubscriptionService"

export default {
  name: "SubscriptionsPage",
  data() {
    return {
      title: "Передплата",
      subscriptions: [],
      subscription: { readerId: "", publicationId: "", months: 1 },
      lastCreated: null,
      error: ""
    }
  },
  computed: {
    ...mapGetters({ readers: 'READERS', publications: 'PUBLICATIONS' }),
    // попередній підрахунок у браузері; остаточну суму рахує сервер
    previewTotal() {
      const p = this.publications.find((x) => x.id === this.subscription.publicationId);
      if (!p || !this.subscription.months) return null;
      return (p.pricePerMonth * this.subscription.months).toFixed(2);
    }
  },
  methods: {
    ...mapActions(['GET_READERS_FROM_API', 'GET_PUBLICATIONS_FROM_API']),
    getAllSubscriptions() {
      SubscriptionService.findAll()
          .then((response) => { this.subscriptions = response.data; })
          .catch((e) => this.showError(e));
    },
    saveSubscription() {
      SubscriptionService.save(this.subscription)
          .then((response) => {
            this.lastCreated = response.data;   // сервер повертає обчислену суму
            this.error = "";
            this.subscription = { readerId: "", publicationId: "", months: 1 };
            this.getAllSubscriptions();
          })
          .catch((e) => this.showError(e));
    },
    deleteSubscription(id) {
      SubscriptionService.delete(id)
          .then(() => this.getAllSubscriptions())
          .catch((e) => this.showError(e));
    },
    readerName(id) {
      const r = this.readers.find((x) => x.id === id);
      return r ? r.firstName + " " + r.lastName : id;
    },
    publicationTitle(id) {
      const p = this.publications.find((x) => x.id === id);
      return p ? p.title : id;
    },
    showError(e) {
      console.log(e);
      this.lastCreated = null;
      this.error = "Помилка запиту до сервера: " + e.message;
    }
  },
  mounted() {
    this.GET_READERS_FROM_API();
    this.GET_PUBLICATIONS_FROM_API();
    this.getAllSubscriptions();
  }
}
</script>