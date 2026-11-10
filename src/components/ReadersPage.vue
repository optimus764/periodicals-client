<template>
  <div>
    <h1>{{ title }}</h1>

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="row">
      <div class="col-lg-7">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ім'я</th>
              <th>Прізвище</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in readers" :key="r.id">
              <td>{{ r.id }}</td>
              <td>{{ r.firstName }}</td>
              <td>{{ r.lastName }}</td>
              <td>{{ r.email }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="deleteReader(r.id)">Видалити</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-muted" v-if="readers.length === 0">Читачів ще немає.</p>
      </div>

      <div class="col-lg-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Новий читач</h5>
            <input class="form-control mb-2" placeholder="Ім'я" v-model="reader.firstName">
            <input class="form-control mb-2" placeholder="Прізвище" v-model="reader.lastName">
            <input class="form-control mb-2" type="email" placeholder="Email" v-model="reader.email">
            <button class="btn btn-success" @click="saveNewReader">Додати</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ReaderService from "../service/ReaderService"

export default {
  name: "ReadersPage",
  data() {
    return {
      title: "Читачі",
      reader: { firstName: "", lastName: "", email: "" },
      error: ""
    }
  },
  computed: {
    // список читачів береться зі сховища Vuex
    ...mapGetters({ readers: 'READERS' })
  },
  methods: {
    ...mapActions(['GET_READERS_FROM_API']),
    saveNewReader() {
      ReaderService.save(this.reader)
          .then(() => {
            this.reader = { firstName: "", lastName: "", email: "" };
            this.error = "";
            this.GET_READERS_FROM_API();
          })
          .catch((e) => this.showError(e));
    },
    deleteReader(id) {
      ReaderService.delete(id)
          .then(() => this.GET_READERS_FROM_API())
          .catch((e) => this.showError(e));
    },
    showError(e) {
      console.log(e);
      this.error = "Помилка запиту до сервера: " + e.message;
    }
  },
  mounted() {
    this.GET_READERS_FROM_API();
  }
}
</script>