<template>
  <div>
    <div class="p-4 mb-4 bg-light rounded-3">
      <h1>Система «Періодичні видання»</h1>
      <p class="lead mb-0">
        Адміністратор веде каталог періодичних видань. Читач оформлює передплату,
        обравши видання зі списку, а система підраховує суму до оплати.
      </p>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3" v-for="card in cards" :key="card.to">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.text }}</p>
            <router-link class="btn btn-primary" :to="card.to">Перейти</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      cards: [
        { title: "Каталог видань", text: "Перегляд, додавання, зміна та видалення видань.", to: "/publications" },
        { title: "Читачі", text: "Список зареєстрованих читачів і додавання нового.", to: "/readers" },
        { title: "Передплата", text: "Оформлення передплати з автоматичним підрахунком суми.", to: "/subscriptions" }
      ]
    };
  }
}
</script>