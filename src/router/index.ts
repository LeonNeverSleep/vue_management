import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    children: [{
      path: '/userlist',
      component: () => import('@/components/UserList.vue')
    },
    {
      path: '/userinfo',
      component: () => import('@/components/UserInfo.vue')
    },
    {
      path: '/edituser',
      component: () => import('@/components/EditUser.vue')
    },
    {
      path: '/culturalreliclist',
      component: () => import('@/components/CulturalRelicList.vue')
    }
    ],
    component: () => import('../views/Home/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
