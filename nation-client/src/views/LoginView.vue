<script setup>
import {useAuthStore} from "../stores/auth";
import {useRouter} from "vue-router";
import Api from "@/api";
import {ref} from "vue";


const authStore = useAuthStore()

const userName = ref("")
const userPassword = ref("")
const errors = ref([])

const router = useRouter()

const loginUser = async () => {

  const email = userName.value
  const password = userPassword.value

  authStore.LoginUser({email,password}).then(resp => {

    if(resp.data.errors && resp.data.errors.length || resp.data.error) {
      errors.value = resp.data.errors ?? [resp.data.message]

      return
    }

    if(resp.data.access_token) {
      authStore.setAuthToken(resp.data.access_token)
      Api.setToken(resp.data.access_token)
      router.push({name:"users"})
    }
  })


}

</script>

<template>
<div class="d-flex flex-column justify-content-center align-items-center mt-5">
  <div class="d-flex flex-column">
    <input class="form-control m-2" type="text" placeholder="username" v-model="userName">
    <input class="form-control m-2" type="text" placeholder="password" v-model="userPassword" >
    <button
        class="btn btn-dark btn-lg m-3"
        @click="() => loginUser()"
    >
      Login
    </button>
  </div>

  <div class="d-flex flex-column">
    <div class="alert alert-danger" role="alert" v-for="error in errors">
      {{error.msg ?? error}}
    </div>
  </div>

</div>
</template>

<style scoped>

</style>
