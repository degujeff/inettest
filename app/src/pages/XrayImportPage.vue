<script setup lang="ts">
import { ref, computed, watch } from "vue";
import cardIcon1 from "@/assets/brain.png";
import cardIcon2 from "@/assets/hospital.png";
import cardIcon3 from "@/assets/docs.png";

const activeTab = ref("brain");
const activeSummary = ref("all"); // การ์ด summary ที่ถูกเลือก (ขอบสีฟ้า)
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
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "MRI , 3D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: true,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: true,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 3D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "MRI , 3D",
    status: "รอยืนยันผล",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "X-ray , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
    patientName: "THANYANATTHA TH...",
    hn: "H/N",
    xrayType: "CT Sacn , 2D",
    status: "ยืนยันผลแล้ว",
    result: "ไม่พบโรค",
    hasNew: false,
    date: "04/03/2567 10:0...",
  },
  {
    id: "A123456",
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

const filteredRecords = computed(() =>
  allRecords.filter((r) => {
    const q = search.value.toLowerCase();
    return (
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q)
    );
  }),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRecords.value.length / itemsPerPage.value)),
);
const paginatedRecords = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  return filteredRecords.value.slice(start, start + itemsPerPage.value);
});

// กลับไปหน้า 1 เมื่อเปลี่ยนเงื่อนไขการค้นหา/จำนวนต่อหน้า
watch([search, itemsPerPage, urgency, activeTab], () => {
  page.value = 1;
});
</script>

<template>
  <div class="page-wrapper">
    <!-- ===== Header (อยู่นอกการ์ดใหญ่) ===== -->
   

    <!-- ===== การ์ดใหญ่ใบเดียว ===== -->
    <div class="main-card">

         <div class="page-header d-flex align-center justify-space-between mb-4">
      <h1 class="page-title">รายการ X-ray ที่นำเข้า</h1>
      <button class="upload-btn">
        <v-icon icon="mdi-cloud-upload-outline" size="18" class="me-1" />
        อัปโหลดฟิล์ม X-ray
        <v-icon icon="mdi-chevron-down" size="16" class="ms-1" />
      </button>
    </div>

      <!-- Tabs -->
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
              <th>ผลลัพธ์</th>
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
/* ── Page wrapper (พื้นหลังเทาอ่อน) ── */
.page-wrapper {
  padding: 28px 32px;
  min-height: 100%;
  background: #f1f5f9;
  font-family: "Sarabun", "Inter", sans-serif;
}

/* ── Header ── */
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  background: #1e3a8a;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.upload-btn:hover {
  background: #1e40af;
}

/* ── การ์ดใหญ่ใบเดียว ── */
.main-card {
  background: white;
  border-radius: 20px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
}

/* ── Tabs ── */
.tab-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  gap: 0;
}
.tab-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  padding: 10px 20px;
  font-size: 16px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  transition: color 0.15s;
  white-space: nowrap;
}
.tab-btn:hover {
  color: #1e3a8a;
}
.tab-btn.active {
  color: #1e3a8a;
  border-bottom-color: #1e3a8a;
  font-weight: 600;
}
.tab-badge {
  background: #e2e8f0;
  color: #475569;
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
}
.tab-badge--active {
  background: #dbeafe;
  color: #1d4ed8;
}

/* ── Summary Cards (กล่องเล็กข้างในการ์ดใหญ่) ── */
.summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.summary-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: none;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}
.summary-card:hover {
  border-color: #93c5fd;
}
.summary-card--active {
  border-color: #1d4ed8;
  background: #f0f7ff;
}
.summary-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.summary-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.summary-body {
  flex: 1;
}
.summary-label {
  font-size: 16px;
  color: #475569;
  font-weight: 500;
}
.summary-value {
  display: flex;
  align-items: flex-end;
  gap: 3px;
}
.summary-num {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}
.summary-unit {
  font-size: 16px;
  color: #94a3b8;
  margin-bottom: 1px;
}

/* ── Filter Bar ── */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 0 14px 0;
  border-bottom: none;
  flex-wrap: wrap;
}
.search-box {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 10px 15px;
  gap: 16px;
  min-width: 180px;
}
.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #334155;
  width: 100%;
  font-family: inherit;
}
.search-input::placeholder {
  color: #c4c4c4;
}

.urgency-wrap {
  gap: 8px;
}
.urgency-label {
  font-size: 16px;
  color: #333333;
  white-space: nowrap;
}
.urgency-select {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 8px 16px 8px 20px;
  font-size: 16px;
  color: #334155;
  outline: none;
  font-family: inherit;
  cursor: pointer;
}

.filter-btn-outlined {
  display: inline-flex;
  align-items: center;
  border: 1px solid #1d4ed8;
  color: #1d4ed8;
  background: transparent;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.15s;
}
.filter-btn-outlined:hover {
  background: #eff6ff;
}

.export-btn {
  display: inline-flex;
  align-items: center;
  border: 1px solid #20409c;
  color: #20409c;
  background: white;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.export-btn:hover {
  background: #f8fafc;
}

/* ── Table (กรอบบาง ๆ เฉพาะตาราง) ── */
.table-wrap {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
.xray-table {
  width: 100%;
  border-collapse: collapse;
}
.xray-table th {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  background: #f8fafc;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e2e8f0;
}
.xray-table td {
  padding: 13px 16px;
  font-size: 13px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
  white-space: nowrap;
}
.xray-table tbody tr:hover {
  background: #f8faff;
}
.xray-table tbody tr:last-child td {
  border-bottom: none;
}

.new-dot {
  color: #37c976;
  font-size: 18px;
  margin-right: 3px;
  vertical-align: middle;
}
.record-id {
  color: #333333 !important;
  font-weight: 500;
}

/* Status chip */
.status-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 600;
}
.status-chip--orange {
  background: #fff5f2;
  color: #fea53f;
}
.status-chip--green {
  background: #f7fdf9;
  color: #37c976;
}

.result-bullet {
  color: #37c976;
  margin-right: 4px;
}
.result-text {
  font-size: 14px;
  color: #37c976 !important;
}
.date-col {
  color: #64748b;
}

.detail-link {
  color: #1d4ed8;
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
}
.detail-link:hover {
  text-decoration: underline;
}

/* ── Pagination ── */
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 0 0;
  border-top: none;
}
.page-size-select {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 13px;
  color: #334155;
  background: white;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}
.page-btn {
  min-width: 34px;
  height: 34px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) {
  background: #f1f5f9;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.page-btn--active {
  background: #1e3a8a !important;
  color: white !important;
  border-color: #1e3a8a !important;
  font-weight: 600;
}
.action-icon-box {
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: background 0.15s;
}
.action-icon-box:hover {
  background: #f8fafc;
}
.detail-link {
  color: #20409c;
  text-decoration: underline; /* ทำให้มีเส้นใต้ตาม Figma */
  font-weight: 500;
  font-size: 13px;
}
.detail-link:hover {
  opacity: 0.8;
}
/* ── ตัวแม่ (เอาขีดเส้นใต้ออก) ── */
.advanced-filter-link {
  display: inline-flex;
  align-items: center;
  color: #20409c; /* สีน้ำเงินแบรนด์ */
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: opacity 0.15s;
}

.advanced-filter-link:hover {
  opacity: 0.8;
}

/* ── เฉพาะตัวหนังสือที่จะให้มีเส้นใต้ ── */
.filter-text {
    font-size: 18px;
  text-decoration: underline;
}
.advanced-filter-link:hover {
  opacity: 0.8;
}
</style>
