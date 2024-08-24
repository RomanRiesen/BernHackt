import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MiniGame from '../views/MiniGame.vue' // Import the MiniGame component
import RiskGameView from '@/views/RiskGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/game',
      name: 'MiniGame',
      component: MiniGame
    },
    {
      path: '/RiskGame',
      name: 'RiskGameView',
      component: RiskGameView
    }
  ]
})

export default router
