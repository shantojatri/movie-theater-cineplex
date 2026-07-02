<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { movies, featuredMovie, theaters } from "../data/movies";
import AppHeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode";

const route = useRoute();

const selectedMovie = computed(() => {
  const movieId = route.query.movieId;
  const found = movies.find((m) => m.id === movieId);
  if (found) return found;
  return featuredMovie;
});

const selectedTheater = computed(() => {
  return theaters.find((t) => t.theaterId === route.query.theaterId);
});

const ticketElement = ref(null);
const qrDataUrl = ref("");
const posterDataUrl = ref("");
const isDownloading = ref(false);

// Helper to convert images to Base64 (Essential for PDF rendering)
const fetchAsDataUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Image load failed", e);
    return url; // Fallback to original URL
  }
};

onMounted(async () => {
  // Generate QR Code as a high-res Base64 string
  const qrData = `SHANTOPLEX-${route.query.movieId ?? "X"}-${route.query.theaterId ?? "X"}-${route.query.seats ?? "X"}`;
  qrDataUrl.value = await QRCode.toDataURL(qrData, {
    width: 300,
    margin: 1,
    color: { dark: "#1e293b", light: "#ffffff" },
  });

  // Convert Movie Poster to Base64 so html2pdf doesn't ignore it
  if (selectedMovie.value?.imageUrl) {
    posterDataUrl.value = await fetchAsDataUrl(selectedMovie.value.imageUrl);
  }
});

const handleDownload = async () => {
  if (isDownloading.value) return;
  isDownloading.value = true;

  // Wait for any pending DOM updates (like the 'Generating...' text)
  await nextTick();

  const options = {
    margin: 5,
    filename: `Ticket-${selectedMovie.value?.title || "Movie"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 3, // High scale prevents blurry QR codes
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { unit: "mm", format: "a5", orientation: "portrait" },
  };

  try {
    const worker = html2pdf().set(options).from(ticketElement.value);
    await worker.save();
  } catch (err) {
    console.error("PDF Export failed", err);
  } finally {
    isDownloading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeaderDesktop />

    <main
      class="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-[#1a0c0c]"
    >
      <div class="max-w-sm w-full text-center space-y-6">
        <div class="relative mx-auto w-20 h-20">
          <div
            class="absolute inset-0 bg-primary/20 rounded-full animate-ping"
          ></div>
          <div
            class="relative bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
          >
            <span class="material-symbols-outlined text-4xl">check</span>
          </div>
        </div>

        <div class="space-y-1">
          <h1 class="text-2xl font-black text-slate-900 dark:text-white">
            Payment Successful!
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm">
            Your seats are confirmed.
          </p>
        </div>

        <div
          ref="ticketElement"
          id="printable-ticket"
          style="
            width: 360px;
            margin: 0 auto;
            background: linear-gradient(
              145deg,
              #fff1f2 0%,
              #ffe4e6 60%,
              #fecdd3 100%
            );
            border-radius: 20px;
            overflow: hidden;
            font-family:
              Segoe UI,
              sans-serif;
            border: 1px solid #fda4af;
          "
        >
          <div
            style="
              background: linear-gradient(
                135deg,
                #e11d48 0%,
                #f43f5e 50%,
                #fb7185 100%
              );
              padding: 18px 20px 14px;
              text-align: center;
            "
          >
            <p
              style="
                color: rgba(255, 255, 255, 0.75);
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin: 0 0 4px;
              "
            >
              ShantoPlex Cinemas
            </p>
            <h2
              style="
                color: #ffffff;
                font-size: 22px;
                font-weight: 900;
                letter-spacing: 3px;
                margin: 0;
              "
            >
              SHANTOPLEX
            </h2>
            <p
              style="
                color: rgba(255, 255, 255, 0.65);
                font-size: 9px;
                font-weight: 600;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin: 4px 0 0;
              "
            >
              Official Digital Ticket
            </p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 16px 20px 12px;
              border-bottom: 2px dashed #fda4af;
            "
          >
            <img
              :src="posterDataUrl || selectedMovie?.imageUrl"
              style="
                width: 58px;
                height: 78px;
                object-fit: cover;
                border-radius: 10px;
                flex-shrink: 0;
                box-shadow: 0 6px 16px rgba(225, 29, 72, 0.2);
                border: 2px solid #fda4af;
              "
            />
            <div style="text-align: left">
              <h3
                style="
                  font-size: 16px;
                  font-weight: 800;
                  color: #881337;
                  margin: 0;
                "
              >
                {{ selectedMovie?.title }}
              </h3>
              <p style="font-size: 11px; color: #e11d48; margin: 2px 0">
                {{ selectedTheater?.name }}
              </p>
              <p style="font-size: 10px; color: #9f1239; opacity: 0.7">
                {{ selectedTheater?.address }}
              </p>
            </div>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              padding: 20px;
              border-bottom: 2px dashed #fda4af;
            "
          >
            <div
              v-for="(val, label) in {
                'Date & Time': route.query.date + ' ' + route.query.time,
                Seats: route.query.seats,
                Type: route.query.type || 'Standard',
                Price: '$' + route.query.price,
              }"
              :key="label"
              style="text-align: left"
            >
              <p
                style="
                  font-size: 9px;
                  font-weight: 700;
                  color: #be123c;
                  text-transform: uppercase;
                  margin: 0 0 2px;
                "
              >
                {{ label }}
              </p>
              <p
                style="
                  font-size: 12px;
                  font-weight: 800;
                  color: #1e293b;
                  margin: 0;
                "
              >
                {{ val }}
              </p>
            </div>
          </div>

          <div
            style="
              position: relative;
              padding: 20px 20px 22px;
              text-align: center;
              background: rgba(255, 255, 255, 0.45);
            "
          >
            <div
              style="
                display: inline-block;
                padding: 10px;
                border: 2px solid #fda4af;
                border-radius: 10px;
              "
            >
              <div
                style="
                  position: absolute;
                  top: -12px;
                  left: -10px;
                  width: 24px;
                  height: 24px;
                  background: #f8fafc;
                  border-radius: 50%;
                  border: 1px solid #fda4af;
                "
              ></div>
              <div
                style="
                  position: absolute;
                  top: -12px;
                  right: -10px;
                  width: 24px;
                  height: 24px;
                  background: #f8fafc;
                  border-radius: 50%;
                  border: 1px solid #fda4af;
                "
              ></div>
              <img
                v-if="qrDataUrl"
                :src="qrDataUrl"
                style="width: 130px; height: 130px; display: block"
              />
              <div
                v-else
                style="
                  width: 130px;
                  height: 130px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fda4af;
                "
              >
                Generating QR...
              </div>
            </div>
            <p
              style="
                font-size: 12px;
                font-weight: 900;
                color: #e11d48;
                letter-spacing: 2px;
                margin: 12px 0 2px;
              "
            >
              WWW.SHANTOPLEX.COM
            </p>
            <p
              style="
                font-size: 10px;
                color: #be123c;
                opacity: 0.7;
                margin: 0;
                font-weight: 600;
              "
            >
              Present this QR at the entrance
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3 mt-6">
          <button
            @click="handleDownload"
            :disabled="isDownloading || !qrDataUrl"
            class="w-full bg-primary text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-60"
          >
            <span class="material-symbols-outlined">{{
              isDownloading ? "sync" : "download"
            }}</span>
            {{ isDownloading ? "Generating PDF..." : "Download Ticket" }}
          </button>
          <RouterLink
            to="/"
            class="text-sm font-medium text-slate-500 hover:text-rose-600"
            >Back to Home</RouterLink
          >
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
