<template>
  <div>
    <!-- Верхнє меню -->
    <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div class="container">
        <router-link class="navbar-brand" to="/">Періодичні видання</router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Головна</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/publications">Каталог видань</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/readers">Читачі</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/subscriptions">Передплата</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Тут відображається поточна сторінка -->
    <div class="container">
      <router-view/>
    </div>

    <footer class="container text-muted small mt-5 mb-3">
      Гавука Єлизавета, група ІН-403 · Технології та фреймворки реактивного програмування
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* активний пункт меню підсвічується */
.navbar .router-link-exact-active {
  color: #fff !important;
  font-weight: 600;
}
</style>