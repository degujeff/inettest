import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '../pages/DashboardPage.vue'
import Login from '../pages/Login.vue'
import XrayImportPage from '../pages/XrayImportPage.vue'
import XrayWaitPage from '../pages/XrayWaitPage.vue'

const routes = [
  { path: '/', component: Login }, // กำหนดให้หน้าแรก (/) เปิด Login.vue
  { path: '/dashboard', component: DashboardPage },
  { path: '/xray-import', component: XrayImportPage },
  { path: '/xray-wait', component: XrayWaitPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router