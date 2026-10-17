<script setup>
import { useRouter } from "vue-router";
import logoOneImg from "@/assets/one.png";
import logoProImg from "@/assets/Pro.png";
import logoicon from "@/assets/icon.png";
import logomg from "@/assets/mange.png";
import logobot from "@/assets/robot.png";

const router = useRouter();

const handleLogin = () => {
  // นำทางไปหน้า Dashboard หรือตามต้องการ
  router.push("/xray-import");
};

const handleRegister = () => {
  console.log("Register clicked");
};

const handleOneIdLogin = () => {
  console.log("ONE ID Login clicked");
};
</script>

<template>
  <div class="login-wrapper d-flex align-center justify-center">
    <!-- Floating Card Center -->
    <v-card
      class="login-card elevation-10 rounded-xl overflow-hidden"
      max-width="900"
      width="100%"
    >
      <v-row no-gutters>
        <!-- Left Side: Dark Blue Graphic Side -->
        <v-col
          cols="12"
          md="6"
          class="left-side d-flex flex-column justify-space-between p-0 position-relative"
        >
          <!-- Top Logo Card (ติดมุมบนซ้ายตาม Figma) -->
          <div class="d-flex align-start ms-4">
            <div
              class="manage-ai-badge d-flex align-center justify-center pa-2"
            >
              <img
                :src="logomg"
                alt="Manage AI"
                style="width: 60px; height: auto; object-fit: contain"
              />
            </div>
          </div>

          <!-- Center Content: Robot Graphic / CXR Illustration -->
          <div
            class="d-flex align-center justify-center flex-grow-1 px-4 my-auto"
          >
            <v-img
              :src="logobot"
              max-height="320"
              width="100%"
              contain
              class="mx-auto"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-icon size="120" color="blue-lighten-3"
                    >mdi-robot-industrial</v-icon
                  >
                </div>
              </template>
            </v-img>
          </div>

          <!-- Bottom Text -->
          <div class="text-center pb-6">
            <h2 class="text-h6 font-weight-bold text-white tracking-wide">
              AI - CXR SCREENING
            </h2>
          </div>
        </v-col>

        <!-- Right Side: Login Options -->
        <v-col
          cols="12"
          md="6"
          class="right-side bg-white pa-8 d-flex flex-column justify-center align-center"
        >
          <div class="w-100 max-w-sm text-center">
            <!-- System Logo -->
            <div class="d-flex align-center justify-center mb-6">
              <img
                :src="logoicon"
                alt="1 LIFE System"
                style="height: 40px; width: auto; object-fit: contain"
              />
            </div>

            <!-- Provider ID Subtitle -->
            <div
              class="text-body-2 text-grey-darken-1 mb-6 d-flex align-center justify-center"
              style="gap: 6px"
            >
              <span>เข้าสู่ระบบด้วยบัญชี</span>
              <img
                :src="logoProImg"
                alt="PROVIDER ID"
                style="height: 40px; width: auto; object-fit: contain"
              />
              <span>ของคุณ</span>
            </div>

            <!-- Action Buttons -->
            <v-btn
              block
              color="#1e429f"
              size="large"
              rounded="pill"
              class="text-none font-weight-bold text-white mb-3 shadow-sm"
              height="48"
              @click="handleLogin"
            >
              ลงชื่อเข้าใช้งาน
            </v-btn>

            <v-btn
              block
              variant="outlined"
              color="#1e429f"
              size="large"
              rounded="pill"
              class="text-none font-weight-bold mb-6"
              height="48"
              @click="handleRegister"
            >
              ลงทะเบียน
            </v-btn>

            <!-- Divider -->
            <div class="d-flex align-center w-100 my-4">
              <v-divider></v-divider>
              <span class="px-3 text-caption text-grey">หรือ</span>
              <v-divider></v-divider>
            </div>

            <!-- ONE ID Login Option -->
            <v-btn
              block
              variant="outlined"
              color="grey-lighten-1"
              size="large"
              rounded="pill"
              class="text-none font-weight-medium text-grey-darken-2"
              height="48"
              @click="handleOneIdLogin"
            >
              <template #prepend>
                <img
                  :src="logoOneImg"
                  alt="ONE Platform"
                  style="height: 24px; width: auto; object-fit: contain"
                  class="me-1"
                />
              </template>
              เข้าสู่ระบบด้วย ONE ID
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped>
/* Full screen soft blue/purple background */
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4fd 0%, #e8eefc 100%);
  padding: 16px;
}

/* Card Styling */
.login-card {
  border-radius: 20px !important;
  background: #ffffff;
}

/* Left side dark blue gradient */
.left-side {
  background: linear-gradient(180deg, #0d238b 0%, #0a1b6f 100%);
  min-height: 480px;
}

.max-w-sm {
  max-width: 340px;
}

.manage-ai-badge {
  width: 80px;
  height: 85px;
  background-color: #ffffff;
  border-bottom-right-radius: 80px;
  border-bottom-left-radius: 80px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 5px;
}
</style>
