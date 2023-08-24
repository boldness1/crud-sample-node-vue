<script setup>
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {useAuthStore} from "./stores/auth";



const authStore = useAuthStore()
const router = useRouter()


const logoutUser = () => {
  authStore.setAuthToken(null)
  router.push({name:"login"})

}


</script>

<template>
  <header class="d-flex flex-row justify-content-between">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />

    <div class="d-flex flex-row">
      <nav>
      <div class="d-flex justify-content-around">
        <div class="d-flex">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/users">Users</RouterLink>
        </div>
        <div>
          <a href="#" @click="logoutUser()" v-if="authStore.isAuthenticated">Logout</a>
          <a href="#" @click="router.push({name:'login'})"  v-else >Login</a>
        </div>
      </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {


}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;

}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
