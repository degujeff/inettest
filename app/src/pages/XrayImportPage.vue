<script setup lang="ts">
import { ref, computed, watch } from "vue";
import cardIcon1 from "@/assets/brain.png";
import cardIcon2 from "@/assets/hospital.png";
import cardIcon3 from "@/assets/docs.png";

const activeTab = ref("brain");
const activeSummary = ref("all"); 
const search = ref("");
const urgency = ref("ทั้งหมด");
const page = ref(1);
const itemsPerPage = ref(10);

const urgencyOptions = ["ทั้งหมด", "ด่วนมาก", "ด่วน", "ปกติ"];

interface XrayRecord {
  id: string;
  patientName: string;
  hn: string;
  xrayType: string;
  status: "รอยืนยันผล" | "ยืนยันผลแล้ว";
  result: string;
  hasNew: boolean;
  date: string;
}

const allRecords: XrayRecord[] = [
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "X-ray , 2D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: true,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123457",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "MRI , 3D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: true,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123458",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: true,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123459",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 3D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123451",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "MRI , 3D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123452",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "X-ray , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123453",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123453",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "X-ray , 2D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
];

const tabs = [
  { key: "brain", label: "รายการ X-ray สมอง", count: 85 },
  { key: "heart", label: "รายการ X-ray ทรวงอก", count: 120 },
  { key: "eye", label: "รายการ X-ray ดวงตา", count: 25 },
];

const filteredRecords = computed(() => {
  const q = search.value.toLowerCase();
  return allRecords.filter((r) => {
    // filter by summary card
    if (activeSummary.value === "pending" && r.status !== "รอยืนยันผล") return false;
    if (activeSummary.value === "confirmed" && r.status !== "ยืนยันผลแล้ว") return false;
    // filter by search
    if (q && !r.id.toLowerCase().includes(q) && !r.patientName.toLowerCase().includes(q)) return false;
    return true;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRecords.value.length / itemsPerPage.value)),
);
const paginatedRecords = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  return filteredRecords.value.slice(start, start + itemsPerPage.value);
});

// กลับไปหน้า 1 เมื่อเปลี่ยนเงื่อนไขการค้นหา/จำนวนต่อหน้า/summary card
watch([search, itemsPerPage, urgency, activeTab, activeSummary], () => {
  page.value = 1;
});
</script>

<template>
  <div class="page-wrapper">
   
   

   
    <div class="main-card">

         <div class="page-header d-flex align-center justify-space-between mb-4">
      <h1 class="page-title">รายการ X-ray ที่นำเข้า</h1>
      <button class="upload-btn">
        <v-icon icon="mdi-cloud-upload-outline" size="18" class="me-1" />
        อัปโหลดฟิล์ม X-ray
        <v-icon icon="mdi-chevron-down" size="16" class="ms-1" />
      </button>
    </div>

      
      <div class="tab-bar mb-5">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span
            class="tab-badge"
            :class="{ 'tab-badge--active': activeTab === tab.key }"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="summary-row mb-5">
        <!-- รายการทั้งหมด -->
        <div
          class="summary-card"
          :class="{ 'summary-card--active': activeSummary === 'all' }"
          @click="activeSummary = 'all'"
        >
          <div class="summary-icon-wrap">
            <img :src="cardIcon1" alt="brain icon" class="summary-icon" />
          </div>
          <div class="summary-body">
            <div class="summary-label">รายการทั้งหมด</div>
          </div>
          <div class="summary-value">
            <span class="summary-num" style="color: #016db6">85</span>
            <span class="summary-unit">เคส</span>
          </div>
        </div>

        <!-- รอยืนยันผล -->
        <div
          class="summary-card"
          :class="{ 'summary-card--active': activeSummary === 'pending' }"
          @click="activeSummary = 'pending'"
        >
          <div class="summary-icon-wrap">
            <img :src="cardIcon3" alt="pending icon" class="summary-icon" />
          </div>
          <div class="summary-body">
            <div class="summary-label">รอยืนยันผล</div>
          </div>
          <div class="summary-value">
            <span class="summary-num" style="color: #f57c00">40</span>
            <span class="summary-unit">เคส</span>
          </div>
        </div>

        <!-- ยืนยันผลวินิจฉัย -->
        <div
          class="summary-card"
          :class="{ 'summary-card--active': activeSummary === 'confirmed' }"
          @click="activeSummary = 'confirmed'"
        >
          <div class="summary-icon-wrap">
            <img :src="cardIcon2" alt="confirmed icon" class="summary-icon" />
          </div>
          <div class="summary-body">
            <div class="summary-label">ยืนยันผลวินิจฉัย</div>
          </div>
          <div class="summary-value">
            <span class="summary-num" style="color: #37c976">45</span>
            <span class="summary-unit">เคส</span>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <!-- Search input -->
        <div class="search-box">
          <input v-model="search" placeholder="ค้นหา" class="search-input" />
          <v-icon icon="mdi-magnify" size="18" style="color: #94a3b8" />
        </div>

        <!-- Urgency -->
        <div class="urgency-wrap d-flex align-center">
          <span class="urgency-label">ความเร่งด่วนของเคส :</span>
          <select v-model="urgency" class="urgency-select">
            <option v-for="opt in urgencyOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>

        <!-- Advanced Filter -->
        <div class="advanced-filter-link">
          <v-icon icon="mdi-filter-outline" size="25" class="me-1" />
          <span class="filter-text">ตัวกรองขั้นสูง</span>
        </div>

        <div style="flex: 1" />

        <!-- Export -->
        <button class="export-btn">
          <v-icon icon="mdi-export-variant" size="16" class="me-1" />
          Export
        </button>
      </div>

      <!-- Table -->
      <div class="table-wrap">
        <table class="xray-table">
          <thead>
            <tr>
              <th>
                เลขที่รายการ
                <v-icon
                  icon="mdi-information-outline"
                  size="13"
                  style="color: #94a3b8; vertical-align: middle"
                />
              </th>
              <th>ชื่อผู้ป่วย</th>
              <th>H/N</th>
              <th>ประเภท X-ray</th>
              <th>สถานะรายการ</th>
              <th>
                ผลลัพธ์
                <v-icon
                  icon="mdi-information-outline"
                  size="13"
                  style="color: #94a3b8; vertical-align: middle"
                />
              </th>
              <th>วันที่ X-ray</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in paginatedRecords" :key="i">
              <td>
                <span v-if="row.hasNew" class="new-dot">•</span>
                <span class="record-id">{{ row.id }}</span>
              </td>
              <td>{{ row.patientName }}</td>
              <td>{{ row.hn }}</td>
              <td>{{ row.xrayType }}</td>
              <td>
                <span
                  class="status-chip"
                  :class="
                    row.status === 'รอยืนยันผล'
                      ? 'status-chip--orange'
                      : 'status-chip--green'
                  "
                >
                  <v-icon
                    :icon="
                      row.status === 'รอยืนยันผล'
                        ? 'mdi-clock-time-four'
                        : 'mdi-check-circle'
                    "
                    size="13"
                    class="me-1"
                  />
                  {{ row.status }}
                </span>
              </td>
              <td>
                <span class="result-bullet">•</span>
                <span :class="{ 'result-text': row.result === 'ไม่พบโรค' }">{{
                  row.result
                }}</span>
              </td>
              <td class="date-col">{{ row.date }}</td>
              <td>
                <div class="d-flex align-center" style="gap: 10px">
                  <!-- กล่องกรอบสี่เหลี่ยมโค้งมนใส่ไอคอนตา -->
                  <div class="action-icon-box">
                    <v-icon icon="mdi-eye" size="18" style="color: #20409c" />
                  </div>
                  <!-- ลิงก์รายละเอียดที่มีเส้นใต้ -->
                  <a href="#" class="detail-link">รายละเอียด</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-bar">
        <div class="d-flex align-center" style="gap: 6px">
          <span style="font-size: 12px; color: #64748b">แสดงทั้งหมด</span>
          <select v-model="itemsPerPage" class="page-size-select">
            <option :value="10">10 / page</option>
            <option :value="20">20 / page</option>
            <option :value="50">50 / page</option>
          </select>
        </div>
        <div class="d-flex align-center" style="gap: 4px">
          <button class="page-btn" :disabled="page <= 1" @click="page--">
            Prev
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            class="page-btn"
            :class="{ 'page-btn--active': p === page }"
            @click="page = p"
          >
            {{ p }}
          </button>
          <button
            class="page-btn"
            :disabled="page >= totalPages"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- /main-card -->
  </div>
  <!-- /page-wrapper -->
</template>

<style scoped>
@import "./XrayImportPage.css";
</style>

