<script setup lang="ts">
import { ref } from "vue";
import bgImg from "@/assets/bg.png";
import logoImg from "@/assets/icon.png";
import locationIcon from "@/assets/hos.png"; // หรือเปลี่ยน path รูปไอคอนหมุดบริการตามที่คุณใช้งาน
import profileImg from "@/assets/profile.png";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <v-app>
    <!-- แสดงหน้า Login แบบเต็มจอโดยไม่มี Sidebar และ App Bar -->
    <template v-if="route.path === '/' || route.path === '/login'">
      <router-view />
    </template>

    <!-- แสดง Layout หลัก (Sidebar + App Bar) สำหรับหน้าอื่นๆ -->
    <template v-else>
      <!-- Sidebar (ปรับเป็น Card ลอย) -->
      <v-navigation-drawer
        permanent
        elevation="0"
        :image="bgImg"
        color="white"
        width="240"
        class="floating-sidebar"
      >
        <!-- Logo + 3-Line Menu -->
        <div class="pa-4 d-flex align-center" style="height: 64px; gap: 12px">
          <!-- ย้ายปุ่ม 3 ขีดมาไว้ด้านซ้ายสุด -->
          <v-btn
            icon="mdi-menu"
            variant="text"
            size="small"
            style="color: #64748b"
          />

          <div class="d-flex align-center">
            <img :src="logoImg" alt="Logo" style="height: 32px; width: auto" />
          </div>
        </div>

        <div class="px-3 pt-3">
          <!-- Dashboard -->
          <v-list class="pa-0 bg-transparent">
            <v-list-item
              prepend-icon="mdi-view-dashboard-outline"
              title="Dashboard"
              to="/dashboard"
              rounded="lg"
              class="mb-1 nav-item"
            />

            <!-- X-ray Group (ใช้ v-list-group ของ Vuetify) -->
            <v-list-group value="xray" class="custom-list-group">
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-clipboard-text-outline"
                  title="รายการ X-ray"
                  rounded="lg"
                  class="nav-group-header"
                />
              </template>

              <!-- รายการย่อยข้างใน -->
              <v-list-item
                title="รายการ X-ray ที่นำเข้า"
                to="/xray-import"
                rounded="lg"
                class="mb-1 sub-nav-item"
                active-class="sub-nav-active"
              />
              <v-list-item
                title="รายการ รอ X-ray"
                to="/xray-wait"
                rounded="lg"
                class="sub-nav-item"
                active-class="sub-nav-active"
              />
            </v-list-group>
          </v-list>
        </div>
      </v-navigation-drawer>

      <!-- App Bar -->
      <v-app-bar flat color="white" height="64" class="custom-app-bar">
        <!-- Unit selector -->
        <div class="ms-4 d-flex align-center" style="gap: 12px">
          <div class="d-flex align-center" style="gap: 8px">
            <img
              :src="locationIcon"
              alt="location"
              style="width: 32px; height: 32px; object-fit: contain"
            />
            <span style="font-size: 14px; color: #334155; font-weight: 500"
              >:</span
            >
          </div>

          <div class="unit-chip d-flex align-center px-4 py-2">
            <span style="font-size: 13px; color: #334155; font-weight: 500"
              >หน่วยบริการ A</span
            >
            <v-icon
              icon="mdi-chevron-down"
              size="16"
              class="ms-3"
              style="color: #94a3b8"
            />
          </div>
        </div>

        <v-spacer />

        <!-- Bell notification -->
        <v-btn icon variant="text" class="me-2" size="small">
          <v-badge
            content="1"
            color="red"
            overlap
            style="--v-badge-top: 2px; --v-badge-right: 4px"
          >
            <v-icon icon="mdi-bell-outline" color="#64748b" size="18" />
          </v-badge>
        </v-btn>

        <!-- User profile -->
        <div class="d-flex align-center me-4 user-profile">
          <v-avatar size="36" class="me-2">
            <v-img :src="profileImg" alt="Profile" />
          </v-avatar>
          <div class="me-1">
            <div
              style="
                font-size: 13px;
                font-weight: 600;
                line-height: 1.3;
                color: #1e293b;
              "
            >
              นายพัธนัส จิตภักดี
            </div>
            <div style="font-size: 11px; line-height: 1.3; color: #94a3b8">
              เจ้าหน้าที่รังสี
            </div>
          </div>
          <v-icon
            icon="mdi-chevron-down"
            size="16"
            style="color: #94a3b8"
            class="ms-1"
          />
        </div>
      </v-app-bar>

      <!-- Main content -->
      <v-main style="background: #f1f5f9">
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<style scoped>
/* Nav items */
.nav-item {
  font-size: 13px;
  color: #475569;
  min-height: 40px !important;
}
.nav-item :deep(.v-list-item-title) {
  font-size: 13px !important;
  color: #475569;
}

.sub-nav-item {
  min-height: 38px !important;
  padding-left: 16px !important;
}
.sub-nav-item :deep(.v-list-item-title) {
  font-size: 13px !important;
  color: #475569;
}

:deep(.sub-nav-active) {
  background: #1e3a8a !important;
  border-radius: 10px !important;
}
:deep(.sub-nav-active .v-list-item-title) {
  color: white !important;
  font-weight: 600 !important;
}

.nav-group-header {
  border-radius: 8px;
  cursor: pointer;
}
.nav-group-header:hover {
  background: #f1f5f9;
}

/* Unit chip */
.unit-chip {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  height: 38px;
}

/* User profile */
.user-profile {
  cursor: pointer;
}

/* Notification badge fix */
.notification-btn :deep(.v-badge__badge) {
  border: 2px solid white;
}

.floating-sidebar {
  height: calc(
    100vh - 24px
  ) !important; /* ความสูงเต็มจอ หักระยะบนล่างรวมกัน 24px */
  margin: 10px 12px 12px 12px !important; /* ห่างจากขอบซ้าย 12px และเว้นบน/ล่าง */
  border-radius: 16px !important; /* ความมนของมุมการ์ด */
  border: 1px solid #e8edf2 !important;
  overflow: hidden; /* ป้องกันเนื้อหาล้นมุมมน */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important; /* เงาบางๆ ให้ดูลอย */
}

/* แต่ง App Bar ให้เป็นทรงการ์ดลอยรับกับ Sidebar ด้านซ้าย */
/* ปรับแต่ง App Bar ให้เว้นระยะทางด้านซ้ายเท่ากับ Sidebar (width 260px + margin 12px = 272px) */
.custom-app-bar {
  position: fixed !important;
  top: 12px !important;
  left: 284px !important; /* (ความกว้าง Sidebar 260px + ระยะห่างซ้าย 12px + เผื่อช่องว่างอีก 12px) */
  width: calc(100% - 296px) !important; /* คำนวณความกว้างที่เหลือพอดีจอ */
  border-radius: 16px !important;
  border: 1px solid #e8edf2 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  z-index: 1004;
}

:deep(.v-navigation-drawer__img) {
  opacity: 0.2; /* ปรับลดหรือเพิ่มค่านี้ได้ (เช่น 0.7 - 0.9) เพื่อให้สีพื้นหลังดูเบาลงเท่ากับ Figma */
}

.v-navigation-drawer {
  background-color: #f8fafc !important;
}

.custom-sidebar {
  height: 100vh !important;
  border-right: 1px solid #e8edf2 !important;
  border-radius: 0 !important;
}

.custom-list-group :deep(.v-list-group__items) {
  padding-left: 4px;
}
.custom-list-group :deep(.v-list-item__prepend) {
  min-width: 32px !important;
}
.nav-group-header :deep(.v-list-item-title) {
  font-size: 13px !important;
  color: #334155 !important;
  font-weight: 500;
}
</style>
