<script setup lang="ts">
import cardIcon1 from "@/assets/brain.png";
import cardIcon2 from "@/assets/oo.png";
import cardIcon3 from "@/assets/eyes.png";
import cardIcon4 from "@/assets/boxred.png";
import cardIcon5 from "@/assets/doc2.png";
import cardIcon6 from "@/assets/boxgreen.png";

// ===== ApexCharts: Donut Chart (สถิติรูปแบบการ Consult) =====

const donutSeries = [800, 200];
const donutOptions = {
  chart: { type: "donut", background: "transparent" },
  labels: ["ส่งต่อเคส", "Tele Consult"],
  colors: ["#f87171", "#facc15"],
  dataLabels: { enabled: false },
  legend: { show: false },
  stroke: { width: 0 },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "เคสทั้งหมด",
            fontSize: "10px",
            color: "#94a3b8",
            formatter: () => "1,000",
          },
          value: { show: false },
          name: { show: false },
        },
      },
    },
  },
  tooltip: {
    enabled: true,
    custom: function({ series, seriesIndex, w }: any) {
      const val = series[seriesIndex];
      const total = series.reduce((a: number, b: number) => a + b, 0);
      const percent = Math.round((val / total) * 100);
      const label = w.globals.labels[seriesIndex];

      return `
        <div class="donut-custom-tooltip">
          <div class="percent-text">${percent}%</div>
          <div class="label-text">${label}</div>
        </div>
      `;
    }
  },
};

const categoryProgressSeries = [{ name: "จำนวนเคส", data: [110, 80, 50] }];
const categoryProgressOptions = {
  chart: { type: "bar", toolbar: { show: false }, background: "transparent" },
  colors: ["#ff7b54", "#22c55e", "#2563eb"], // สีตามแต่ละหมวด
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "35%",
      borderRadius: 4,
      distributed: true, // แยกสีแต่ละแท่งตาม colors array
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["สมอง", "ทรวงอก", "ดวงตา"],
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { show: false } },
  grid: { show: false },
  legend: { show: false },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
      const val = series[seriesIndex][dataPointIndex];
      const cat = w.globals.labels[dataPointIndex];
      return `<div class="custom-apex-tooltip pa-2">
        <div style="font-weight: bold;">${cat}</div>
        <div style="font-size: 12px;">จำนวน: ${val} เคส</div>
      </div>`;
    },
  },
};

// ===== ApexCharts: Bar Chart (สถิติ Consult แยกประเภท) =====
const barSeries = [
  { name: "รอตอบรับ", data: [50, 65, 20] },
  { name: "การนัดสำเร็จ", data: [115, 170, 50] },
  { name: "ปฏิเสธการนัด", data: [28, 100, 8] },
];
const barOptions = {
  chart: {
    type: "bar",
    background: "transparent",
    toolbar: { show: false },
    fontFamily: "inherit",
  },
  colors: ["#facc15", "#2dd4bf", "#f87171"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 4,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: {
    categories: ["สมอง", "ทรวงอก", "ดวงตา"],
    labels: { style: { fontSize: "12px", fontWeight: 600, colors: "#475569" } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    max: 200,
    tickAmount: 4,
    labels: { style: { fontSize: "11px", colors: "#94a3b8" } },
  },
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
  },
  legend: { show: false },
  tooltip: {
    y: { formatter: (val: number) => `${val} เคส` },
  },
};
</script>

<template>
  <div class="dashboard-container">
    <!-- Section 1: สถิติการนัดหมาย X-ray -->
    <v-card color="white" class="pa-6 mb-6 rounded-xl" elevation="1">
      <!-- Header Section -->
      <div class="d-flex align-center justify-space-between mb-2">
        <h1 class="text-h5 font-weight-bold text-indigo-darken-4">Dashboard</h1>

        <div class="d-flex align-center gap-2">
          <span class="text-caption text-grey-darken-1">แสดงข้อมูล :</span>
          <v-select
            density="compact"
            variant="outlined"
            hide-details
            model-value="ณ ปัจจุบัน"
            :items="['ณ ปัจจุบัน', 'ย้อนหลัง 7 วัน', 'ย้อนหลัง 30 วัน']"
            class="bg-white custom-select-rounded"
            style="width: 150px"
          />
        </div>
      </div>

      <!-- Tab Bar & Export Button -->
      <div class="d-flex align-center justify-space-between mb-6 border-b pb-2">
        <!-- เปลี่ยนเป็นใส่ style="gap: 24px;" ตรงนี้ -->
        <div class="d-flex" style="gap: 24px">
          <span class="tab-item active">สถิติการนัดหมาย X-ray</span>
          <span class="tab-item text-grey">สถิติการนัดหมาย Consult</span>
        </div>

        <div class="d-flex align-center gap-3">
          <span class="text-caption text-grey-darken-1 me-4">
            <v-icon size="14" class="me-1">mdi-clock-outline</v-icon
            >ข้อมูลอัปเดต 18/04/2567
          </span>
          <v-btn
            variant="outlined"
            color="#1e3a8a"
            rounded="pill"
            class="text-none font-weight-bold"
            size="small"
            prepend-icon="mdi-export-variant"
          >
            Export
          </v-btn>
        </div>
      </div>

      <div class="d-flex align-center justify-space-between mb-4">
        <h2 class="text-subtitle-1 font-weight-bold" style="color: #1e293b">
          สถิติการนัดหมาย X-ray
        </h2>
        <v-btn
          variant="text"
          color="#1e3a8a"
          size="small"
          class="text-none font-weight-bold pa-0"
        >
          <v-icon
            start
            icon="mdi-calendar-month-outline"
            size="26"
            class="me-1"
          />
          <span class="text-decoration-underline" style="font-size: 18px"
            >ดูทั้งหมด</span
          >
        </v-btn>
      </div>

      <!-- Summary Banner -->
     
      <div class="summary-banner pa-4 rounded-xl mb-6">
        <v-row align="center" no-gutters>
          <!-- 1. จำนวนเคสประจำเดือน -->
          <v-col
            cols="12"
            md="4"
            class="d-flex align-center pe-md-4 mb-3 mb-md-0"
          >
            <div class="d-flex align-center flex-grow-1">
              <img
                :src="cardIcon5"
                alt="ประจำเดือน"
                style="width: 50px; height: 50px; object-fit: contain"
                class="me-3"
              />
              <div>
                <div class="text-body-1 font-weight-medium text-grey-darken-1">
                  จำนวนเคสประจำเดือน
                </div>
                <div
                  class="text-subtitle-2 font-weight-bold text-indigo-darken-4"
                >
                  มีนาคม 2567
                </div>
              </div>
              <div class="ms-auto text-end">
                <span class="text-h4 font-weight-black text-blue-darken-3"
                  >100</span
                >
                <span class="text-caption text-grey-darken-1 ms-1">เคส</span>
              </div>
            </div>
          </v-col>

          <!-- 2. เคสด่วน -->
          <v-col cols="12" md="4" class="px-md-2 mb-3 mb-md-0">
            <v-card
              color="white"
              flat
              class="pa-3 rounded-lg d-flex align-center w-100 border-subtle"
            >
              <img
                :src="cardIcon4"
                alt="เคสด่วน"
                style="width: 50px; height: 50px; object-fit: contain"
                class="me-3"
              />
              <span class="text-body-2 font-weight-bold text-grey-darken-2"
                >เคสด่วน</span
              >
              <v-spacer />
              <div>
                <span class="text-h5 font-weight-black text-red-accent-3 me-1"
                  >20</span
                >
                <span class="text-caption text-red-accent-3">เคส</span>
              </div>
            </v-card>
          </v-col>

          <!-- 3. เคสปกติ -->
          <v-col cols="12" md="4" class="ps-md-4">
            <v-card
              color="white"
              flat
              class="pa-3 rounded-lg d-flex align-center w-100 border-subtle"
            >
              <img
                :src="cardIcon6"
                alt="เคสปกติ"
                style="width: 50px; height: 50px; object-fit: contain"
                class="me-3"
              />
              <span class="text-body-2 font-weight-bold text-grey-darken-2"
                >เคสปกติ</span
              >
              <v-spacer />
              <div>
                <span class="text-h5 font-weight-black text-teal-darken-1 me-1"
                  >80</span
                >
                <span class="text-caption text-teal-darken-1">เคส</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Daily Cards -->
      <v-row class="px-1" no-gutters>
        <v-col cols="3" class="pe-3">
          <div class="daily-card active pa-3 rounded-lg">
            <div
              class="d-flex justify-space-between align-center text-caption mb-2"
            >
              <span class="font-weight-bold text-indigo-darken-4 text-body-2"
                >TODAY</span
              >
              <span class="text-grey-darken-1">27 มีนาคม 2567</span>
            </div>
            <div class="d-flex justify-space-between text-caption mb-1">
              <span class="border-s-2 border-red ps-2">เคสด่วน</span>
              <span class="font-weight-bold"
                >3 <span class="font-weight-regular">เคส</span></span
              >
            </div>
            <div class="d-flex justify-space-between text-caption">
              <span class="border-s-2 border-teal ps-2">เคสปกติ</span>
              <span class="font-weight-bold"
                >1 <span class="font-weight-regular">เคส</span></span
              >
            </div>
          </div>
        </v-col>

        <v-col cols="3" class="pe-3">
          <div class="daily-card pa-3 rounded-lg">
            <div class="text-caption text-grey-darken-1 mb-2">
              28 มีนาคม 2567
            </div>
            <div class="d-flex justify-space-between text-caption mb-1">
              <span class="border-s-2 border-red ps-2">เคสด่วน</span>
              <span class="font-weight-bold"
                >5 <span class="font-weight-regular">เคส</span></span
              >
            </div>
            <div class="d-flex justify-space-between text-caption">
              <span class="border-s-2 border-teal ps-2">เคสปกติ</span>
              <span class="font-weight-bold"
                >12 <span class="font-weight-regular">เคส</span></span
              >
            </div>
          </div>
        </v-col>

        <v-col cols="3" class="pe-3">
          <div class="daily-card pa-3 rounded-lg">
            <div class="text-caption text-grey-darken-1 mb-2">
              29 มีนาคม 2567
            </div>
            <div class="d-flex justify-space-between text-caption mb-1">
              <span class="border-s-2 border-red ps-2">เคสด่วน</span>
              <span class="font-weight-bold"
                >8 <span class="font-weight-regular">เคส</span></span
              >
            </div>
          </div>
        </v-col>

        <v-col cols="3">
          <div class="daily-card pa-3 rounded-lg" style="position: relative">
            <div class="text-caption text-grey-darken-1 mb-2">
              3 เมษายน 2567
            </div>
            <div class="d-flex justify-space-between text-caption mb-1">
              <span class="border-s-2 border-red ps-2" style="color: #9ca3af"
                >เคสด่วน</span
              >
              <span class="font-weight-bold" style="color: #9ca3af"
                >2 <span class="font-weight-regular">เคส</span></span
              >
            </div>
            <div class="d-flex justify-space-between text-caption">
              <span class="border-s-2 border-teal ps-2" style="color: #9ca3af"
                >เคสปกติ</span
              >
              <span class="font-weight-bold" style="color: #9ca3af"
                >3 <span class="font-weight-regular">เคส</span></span
              >
            </div>
            <v-icon class="nav-arrow" size="18" color="#94a3b8"
              >mdi-chevron-right</v-icon
            >
          </div>
        </v-col>
      </v-row>

      <!-- Pagination dots -->
      <div class="d-flex justify-center mt-3 gap-1">
        <span class="dot-nav active"></span>
        <span class="dot-nav"></span>
      </div>
    </v-card>

    <!-- Section 2: Consult Statistics Grid -->
    <v-row class="mb-4">
      <!-- สถิติประเภทของการขอ Consult -->
     
      <v-col cols="12" md="6" class="pe-md-2">
        <v-card
          color="white"
          class="pa-6 rounded-xl fill-height d-flex flex-column"
          flat
          elevation="1"
        >
          <h3
            class="text-subtitle-1 font-weight-bold mb-5"
            style="color: #1e293b"
          >
            สถิติประเภทของการขอ Consult
          </h3>

          <!-- สมอง -->
          <div class="mb-5">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center gap-2">
                <img
                  :src="cardIcon1"
                  alt="สมอง"
                  style="width: 24px; height: 24px; object-fit: contain"
                />
                <span class="text-caption font-weight-bold text-grey-darken-3"
                  >สมอง</span
                >
              </div>
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >110
                <span class="text-caption font-weight-regular text-grey"
                  >เคส</span
                ></span
              >
            </div>
            <v-progress-linear
              model-value="85"
              color="#ff7b54"
              height="10"
              rounded
              bg-color="#f1f5f9"
            />
          </div>

          <!-- ทรวงอก -->
          <div class="mb-5">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center gap-2">
                <img
                  :src="cardIcon2"
                  alt="ทรวงอก"
                  style="width: 24px; height: 24px; object-fit: contain"
                />
                <span class="text-caption font-weight-bold text-grey-darken-3"
                  >ทรวงอก</span
                >
              </div>
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >80
                <span class="text-caption font-weight-regular text-grey"
                  >เคส</span
                ></span
              >
            </div>
            <v-progress-linear
              model-value="65"
              color="#22c55e"
              height="10"
              rounded
              bg-color="#f1f5f9"
            />
          </div>

          <!-- ดวงตา -->
          <div>
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center gap-2">
                <img
                  :src="cardIcon3"
                  alt="ดวงตา"
                  style="width: 24px; height: 24px; object-fit: contain"
                />
                <span class="text-caption font-weight-bold text-grey-darken-3"
                  >ดวงตา</span
                >
              </div>
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >50
                <span class="text-caption font-weight-regular text-grey"
                  >เคส</span
                ></span
              >
            </div>
            <v-progress-linear
              model-value="40"
              color="#2563eb"
              height="10"
              rounded
              bg-color="#f1f5f9"
            />
          </div>
        </v-card>
      </v-col>

      <!-- สถิติรูปแบบการ Consult -->
      <v-col cols="12" md="6">
        <v-card color="white" class="pa-6 rounded-xl" flat elevation="1">
          <h3
            class="text-subtitle-1 font-weight-bold mb-4"
            style="color: #1e293b"
          >
            สถิติรูปแบบการ Consult
          </h3>

          <div
            class="d-flex align-center justify-space-between"
            style="gap: 24px"
          >
            <!-- Donut Chart (ApexCharts) -->
            <div class="donut-apex-wrapper">
              <div class="donut-label-top">
              
              </div>
              <apexchart
                type="donut"
                :width="160"
                :options="donutOptions"
                :series="donutSeries"
              />
              <div class="donut-label-bottom">
              
              </div>
            </div>

            <!-- Legend Cards (เพิ่ม ms-3 เพื่อดันเว้นระยะห่างจากกราฟ) -->
            <div class="d-flex flex-column gap-3 flex-grow-1 ms-3">
              <div
                class="d-flex align-center justify-space-between legend-card red-legend pa-3 rounded-lg"
              >
                <div class="d-flex align-center gap-2">
                  <span class="legend-dot" style="background: #f87171"></span>
                  <span class="text-caption font-weight-bold text-grey-darken-3"
                    >ส่งต่อเคส</span
                  >
                </div>
                <div>
                  <span
                    class="font-weight-black text-indigo-darken-4 me-1"
                    style="font-size: 16px"
                    >800</span
                  >
                  <span class="text-caption text-grey">เคส</span>
                </div>
              </div>

              <div
                class="d-flex align-center justify-space-between legend-card amber-legend pa-3 rounded-lg"
              >
                <div class="d-flex align-center gap-2">
                  <span class="legend-dot" style="background: #facc15"></span>
                  <span class="text-caption font-weight-bold text-grey-darken-3"
                    >Tele Consult</span
                  >
                </div>
                <div>
                  <span
                    class="font-weight-black text-indigo-darken-4 me-1"
                    style="font-size: 16px"
                    >200</span
                  >
                  <span class="text-caption text-grey">เคส</span>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 3: Bar Chart สถิติ Consult แยกประเภท (ApexCharts) -->
    <v-card color="white" class="pa-6 mb-4 rounded-xl" flat elevation="1">
      <!-- Legend -->
      <div class="d-flex justify-end align-center mb-2">
        <div class="d-flex align-center me-4">
          <span class="legend-dot me-2" style="background: #facc15"></span>
          <span class="text-caption text-grey-darken-2">รอตอบรับ</span>
        </div>
        <div class="d-flex align-center me-4">
          <span class="legend-dot me-2" style="background: #2dd4bf"></span>
          <span class="text-caption text-grey-darken-2">การนัดสำเร็จ</span>
        </div>
        <div class="d-flex align-center">
          <span class="legend-dot me-2" style="background: #f87171"></span>
          <span class="text-caption text-grey-darken-2">ปฏิเสธการนัด</span>
        </div>
      </div>

      <!-- ApexCharts Bar -->
      <apexchart
        type="bar"
        height="240"
        :options="barOptions"
        :series="barSeries"
      />
    </v-card>

    <!-- Section 4: การนัด Consult -->
    <v-card color="white" class="pa-6 rounded-xl" flat elevation="1">
      <h3 class="text-subtitle-1 font-weight-bold mb-5" style="color: #1e293b">
        การนัด Consult
      </h3>

      <v-row no-gutters>
        <!-- สมอง -->
        <v-col cols="12" md="4">
          <div class="consult-card d-flex align-center pa-3 rounded-xl">
            <!-- ด้านซ้าย: ไอคอน + ชื่อ -->
            <div
              class="d-flex flex-column align-center justify-center me-3 px-2"
            >
              <img
                :src="cardIcon1"
                alt="สมอง"
                style="width: 36px; height: 36px; object-fit: contain"
                class="mb-1"
              />
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >สมอง</span
              >
            </div>
            <div class="d-flex flex-column gap-2 flex-grow-1">
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >Consult สำเร็จ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-teal-accent-4"
                  >50</span
                >
              </div>
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >ขาดการติดต่อ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-red-lighten-1"
                  >0</span
                >
              </div>
            </div>
          </div>
        </v-col>

        <!-- <v-divider vertical class="d-none d-md-block mx-4" /> -->

        <!-- ทรวงอก -->
        <v-col cols="12" md="4">
          <div class="consult-card d-flex align-center pa-3 rounded-xl">
           
            <div
              class="d-flex flex-column align-center justify-center me-3 px-2"
            >
              <img
                :src="cardIcon2"
                alt="ทรวงอก"
                style="width: 36px; height: 36px; object-fit: contain"
                class="mb-1"
              />
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >ทรวงอก</span
              >
            </div>

            <!-- ด้านขวา: สถิติ Consult สำเร็จ / ขาดการติดต่อ -->
            <div class="d-flex flex-column gap-2 flex-grow-1">
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >Consult สำเร็จ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-teal-accent-4"
                  >44</span
                >
              </div>
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >ขาดการติดต่อ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-red-lighten-1"
                  >1</span
                >
              </div>
            </div>
          </div>
        </v-col>

        <!-- <v-divider vertical class="d-none d-md-block mx-4" /> -->

        <!-- ดวงตา -->
        <v-col cols="12" md="4">
          <div class="consult-card d-flex align-center pa-3 rounded-xl">
         
            <div
              class="d-flex flex-column align-center justify-center me-3 px-2"
            >
              <img
                :src="cardIcon3"
                alt="ดวงตา"
                style="width: 36px; height: 36px; object-fit: contain"
                class="mb-1"
              />
              <span class="text-caption font-weight-bold text-grey-darken-3"
                >ดวงตา</span
              >
            </div>

            <!-- ด้านขวา: สถิติ Consult สำเร็จ / ขาดการติดต่อ -->
            <div class="d-flex flex-column gap-2 flex-grow-1">
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >Consult สำเร็จ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-teal-accent-4"
                  >30</span
                >
              </div>
              <div
                class="d-flex align-center justify-space-between bg-white px-3 py-2 rounded-lg border-subtle"
              >
                <span class="text-caption text-grey-darken-1"
                  >ขาดการติดต่อ</span
                >
                <span
                  class="text-subtitle-2 font-weight-black text-red-lighten-1"
                  >5</span
                >
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px 20px;
  background-color: #f1f5f9;
  min-height: 100vh;
}

:deep(.v-card) {
  background-color: #ffffff !important;
  color: #1e293b !important;
}

/* ===== Tabs ===== */
.tab-item {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding-bottom: 10px;
  color: #64748b;
  transition: color 0.2s;
}
.tab-item.active {
  color: #1e3a8a;
  border-bottom: 2px solid #1e3a8a;
}

/* ===== Summary Banner ===== */
.summary-banner {
  background-color: #fff8f5;
  border: 1px solid #ffe3d8;
}
.summary-divider {
  width: 1px;
  height: 48px;
  background-color: #e2e8f0;
  margin: 0 8px;
}
.summary-stat-block {
  min-width: 160px;
  flex: 1;
}
.stat-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.red-box {
  background-color: #fee2e2;
}
.teal-box {
  background-color: #ccfbf1;
}
.xray-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.consult-card {
  background-color: #f8fafc; /* พื้นหลังการ์ดสีเทาฟ้าอ่อนนุ่ม */
  border: 1px solid #f1f5f9;
}

.border-subtle {
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.gap-2 {
  gap: 8px;
}

/* ===== Daily Cards ===== */
.daily-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  height: 100%;
  position: relative;
}
.daily-card.active {
  background-color: #eef2ff;
  border: 1px solid #c7d2fe;
}
.nav-arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
.border-s-2 {
  border-left: 2px solid;
}
.border-red {
  border-color: #f87171 !important;
}
.border-teal {
  border-color: #2dd4bf !important;
}

/* ===== Pagination dots ===== */
.dot-nav {
  width: 20px;
  height: 5px;
  border-radius: 3px;
  background-color: #cbd5e1;
  display: inline-block;
}
.dot-nav.active {
  background-color: #3b5bdb;
  width: 28px;
}

/* ===== Category Icons (CSS-based) ===== */
.category-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
  background-size: cover;
}
.brain-icon {
  background: linear-gradient(135deg, #ff7b54, #ff4c4c);
  border-radius: 50%;
  position: relative;
}
.brain-icon::after {
  content: "🧠";
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lung-icon {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  position: relative;
}
.lung-icon::after {
  content: "🫁";
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.eye-icon {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 50%;
  position: relative;
}
.eye-icon::after {
  content: "👁️";
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ===== Donut Chart (ApexCharts) ===== */
.donut-apex-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.donut-label-top,
.donut-label-bottom {
  text-align: center;
  line-height: 1.4;
}
/* remove apexcharts default bg */
:deep(.apexcharts-canvas svg) {
  background: transparent !important;
}

/* ===== Legend Cards ===== */
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.legend-card {
  border: 1px solid transparent;
}
.red-legend {
  background-color: #fff0f0;
}
.amber-legend {
  background-color: #fffbeb;
}

:deep(.custom-select-rounded .v-field) {
  border-radius: 50px 50px 50px 50px !important;
}

/* ลบ margin ด้านบนของ apexcharts ใน bar card */
:deep(.apexcharts-toolbar) {
  display: none !important;
}

:deep(.custom-apex-tooltip) {
  background-color: #334155 !important;
  color: #ffffff !important;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

:deep(.donut-custom-tooltip) {
  background-color: #ffffff !important;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
  min-width: 90px;
}

:deep(.donut-custom-tooltip .percent-text) {
  font-size: 15px;
  font-weight: 800;
  color: #1e3a8a; /* สีน้ำเงินเข้มตามดีไซน์ Figma */
  line-height: 1.2;
}

:deep(.donut-custom-tooltip .label-text) {
  font-size: 11px;
  color: #64748b; /* สีเทาอ่อน */
  margin-top: 2px;
}



/* ===== Consult Summary Section ===== */
.consult-summary-item {
  padding: 8px 0;
}
</style>
