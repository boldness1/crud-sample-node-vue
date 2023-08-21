import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      meta: {requiresAuth: true},
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (true) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
