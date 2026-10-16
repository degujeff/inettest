import { createRouter, createWebHistory } from 'vue-router'

import XrayImportPage from '../pages/XrayImportPage.vue'
import XrayWaitPage from '../pages/XrayWaitPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'

const routes = [
  { path: '/', redirect: '/xray-import' },
  { path: '/dashboard', component: DashboardPage },
  { path: '/xray-import', component: XrayImportPage },
  { path: '/xray-wait', component: XrayWaitPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router