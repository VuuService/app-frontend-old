import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const isAuth = computed(() => !user.value)
    function login() {
    }

    function logout() {
    }

    function register() {
    }

    return { user, isAuth, login, logout, register }
})
