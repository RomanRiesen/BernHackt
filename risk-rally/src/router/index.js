import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import MiniGame from '../views/MiniGame.vue' // Import the MiniGame component
import Questionnaire from '../views/Questionnaire.vue'
import RiskGameView from '../views/RiskGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Questionnaire
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/game',
      component: MiniGame
    }
  ]
})

export default router
