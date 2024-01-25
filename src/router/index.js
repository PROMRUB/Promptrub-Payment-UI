import { createRouter, createWebHistory } from 'vue-router'
import PaymentMethod from '../views/PaymentMethod.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'paymentMethod',
      component: PaymentMethod
    },
  ]
})

export default router
