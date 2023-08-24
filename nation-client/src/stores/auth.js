import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Api from "@/api";

export const useAuthStore = defineStore('auth', () => {

    const  initialParams = ref({
        token:null,
    })
    let user = ref(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : initialParams)

    let isAuthenticated = computed(() => !!user.value.token)

    function setAuthToken(token) {
        user.value.token = token
        persistUser()
    }

    function LoginUser(data) {

      return Api.post('auth/login',data)
    }

    function persistUser() {
        localStorage.setItem('user', JSON.stringify(user.value));

    }

    return { user, isAuthenticated, setAuthToken, LoginUser}
})
