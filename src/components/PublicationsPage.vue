<template>
  <div>
    <h1>{{ title }}</h1>

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="row">
      <!-- Список видань -->
      <div class="col-lg-7">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Тематика</th>
              <th>Видавництво</th>
              <th>Ціна, грн/міс</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in publications" :key="p.id"
                @click="selectPublication(index)"
                :class="{ 'table-primary': selected && selected.id === p.id }"
                style="cursor: pointer">
              <td>{{ p.id }}</td>
              <td>{{ p.title }}</td>
              <td>{{ p.category }}</td>
              <td>{{ p.publisher }}</td>
              <td>{{ p.pricePerMonth }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-muted" v-if="publications.length === 0">Каталог порожній.</p>
      </div>

      <div class="col-lg-5">
        <!-- Додавання -->
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Додати видання</h5>
            <input class="form-control mb-2" placeholder="Назва" v-model="publication.title">
            <input class="form-control mb-2" placeholder="Тематика" v-model="publication.category">
            <input class="form-control mb-2" placeholder="Видавництво" v-model="publication.publisher">
            <input class="form-control mb-2" type="number" placeholder="Ціна за місяць" v-model="publication.pricePerMonth">
            <button class="btn btn-success" @click="saveNewPublication">Додати</button>
          </div>
        </div>

        <!-- Зміна / видалення -->
        <div class="card" v-if="selected">
          <div class="card-body">
            <h5 class="card-title">Змінити / видалити (ID {{ selected.id }})</h5>
            <input class="form-control mb-2" v-model="selected.title">
            <input class="form-control mb-2" v-model="selected.category">
            <input class="form-control mb-2" v-model="selected.publisher">
            <input class="form-control mb-2" type="number" v-model="selected.pricePerMonth">
            <button class="btn btn-warning me-2" @click="updatePublication">Зберегти</button>
            <button class="btn btn-danger" @click="deletePublication">Видалити</button>
          </div>
        </div>
        <p class="text-muted" v-else>Клацніть на рядок таблиці, щоб змінити або видалити видання.</p>
      </div>
    </div>
  </div>
</template>

<script>
import PublicationService from "../service/PublicationService"

export default {
  name: "PublicationsPage",
  data() {
    return {
      title: "Каталог періодичних видань",
      publications: [],
      publication: { title: "", category: "", publisher: "", pricePerMonth: "" },
      selected: null,
      error: ""
    }
  },
  methods: {
    getAllPublications() {
      PublicationService.findAll()
          .then((response) => {
            this.publications = response.data;
            this.error = "";
          })
          .catch((e) => this.showError(e));
    },
    saveNewPublication() {
      PublicationService.save(this.publication)
          .then(() => {
            this.publication = { title: "", category: "", publisher: "", pricePerMonth: "" };
            this.getAllPublications();
          })
          .catch((e) => this.showError(e));
    },
    selectPublication(index) {
      // копія, щоб зміни не потрапляли в таблицю до збереження
      this.selected = { ...this.publications[index] };
    },
    updatePublication() {
      PublicationService.update(this.selected.id, this.selected)
          .then(() => this.getAllPublications())
          .catch((e) => this.showError(e));
    },
    deletePublication() {
      PublicationService.delete(this.selected.id)
          .then(() => {
            this.selected = null;
            this.getAllPublications();
          })
          .catch((e) => this.showError(e));
    },
    showError(e) {
      console.log(e);
      this.error = "Помилка запиту до сервера: " + e.message;
    }
  },
  mounted() {
    this.getAllPublications();
  }
}
</script>