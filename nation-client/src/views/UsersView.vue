<script setup>
import {computed, inject, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import Swal from 'sweetalert2'
const userStore = useUserStore()

const swal = inject('$swal')

onMounted(  () => {
  userStore.FetchUsers()
})

const removeUser = (userId) => {

  userStore.DeleteUser(userId).then(resp => {
    if(resp.data.message) {
      swal(resp.data.message)
      userStore.FetchUsers()
    }
  })
}

const updateUser = (user) => {
  userStore.UpdateUser(user).then(resp => {
    if(resp.data.message) {
      swal(resp.data.message)
      userStore.FetchUsers()
    }
  })
}


</script>

<template>
  <div class="users" >
    <div class="d-flex flex-column" v-for="user in userStore.getUsers">
      <div class="accordion w-75 border-bottom border-4" id="accordionExample">

        <div class="accordion-item m-2">
          <h2 class="accordion-header" :id="'heading' + user.id">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + user.id" aria-expanded="true" :aria-controls="'collapse' + user.id">
              {{user.firstName}}
            </button>
          </h2>
          <div :id="'collapse' + user.id" class="accordion-collapse collapse show" :aria-labelledby="'heading' + user.id" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <input class="form-control m-2" type="text"  v-model="user.firstName">
              <input class="form-control m-2" type="text"  v-model="user.lastName" >
              <input class="form-control m-2" type="text"  v-model="user.email" >
            </div>
          </div>
        </div>


        <div class="d-flex flex-row justify-content-between align-items-center">
          <div>
            <button
                class="btn btn-dark btn-lg m-3"
                @click="() => updateUser(user)"
            >
              Güncelle
            </button>

            <button
                class="btn btn-danger btn-lg m-3"
                @click="() => removeUser(user.id)"
            >
              Sil
            </button>
          </div>

          <div class="d-flex flex-column justify-content-center align-items-center">
            <span class="m-2 fw-bold ">
              Role
            </span>
            <span class="  badge text-bg-danger m-2" v-if="user.Role.role === 'admin' ">{{user.Role.role}}</span>
            <span class="badge text-bg-primary" v-if="user.Role.role === 'default' ">{{user.Role.role}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>

</style>
