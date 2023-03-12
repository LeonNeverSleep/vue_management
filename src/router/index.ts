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
      name: 'userlist',
      component: () => import('@/components/UserList.vue')
    },
    {
      path: '/culturalreliclist',
      name: 'culturalreliclist',
      component: () => import('@/components/CulturalRelicList.vue')
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      component: () => import('@/components/EnvironmentMonitoring.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/components/HistoryData.vue')
    },
    {
      path: '/editUserInfo',
      component: () => import('@/components/EditUserInfo.vue')
    }
    ],
    component: () => import('../views/Home/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/blank',
    name: 'blank',
    component: () => import('../views/Blank/Blank.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.name === 'userlist' || to.name === 'home' || to.name === 'monitoring' || to.name === 'culturalreliclist' || to.name === 'history') {
    if (sessionStorage.getItem("token")) {
      next()
    } else {
      alert("您还未登录，请先登录!")
      router.push('/')
    }
  } else {
    next()
  }
})

export default router
