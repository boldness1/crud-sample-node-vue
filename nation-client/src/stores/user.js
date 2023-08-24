import {defineStore} from "pinia";
import {computed, ref} from "vue";
import Api from "@/api";

export const useUserStore = defineStore('users', () => {

    let  users =  ref([])


    let getUsers = computed(() => users.value)

    function FetchUsers() {

        return Api.get('users/all').then(resp => users.value = resp.data.users)
    }

    function DeleteUser(userId) {

        return Api.post('users/remove', {userId:userId})
    }

    function UpdateUser(data) {

        return Api.patch('users/update', data)
    }


    return { getUsers, FetchUsers, DeleteUser, UpdateUser, users}
})
