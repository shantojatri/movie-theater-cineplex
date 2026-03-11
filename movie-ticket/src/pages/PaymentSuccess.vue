<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { movies, featuredMovie, theaters } from "../data/movies";
import AppHeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import html2pdf from "html2pdf.js";

const route = useRoute();

const selectedMovie = computed(() => {
  const movieId = route.query.movieId;

  const foundInArray = movies.find((m) => m.id === movieId);
  if (foundInArray) return foundInArray;

  if (featuredMovie.id === movieId) {
    return featuredMovie;
  }

  return featuredMovie;
});

const selectedTheater = computed(() => {
  return theaters.find((t) => t.theaterId === route.query.theaterId);
});

const ticketElement = ref(null);

const downloadTicket = () => {
  const element = ticketElement.value;

  // PDF Configuration
  const options = {
    margin: [10, 10],
    filename: `CinePlex-${selectedMovie.value.title}-${selectedTheater.value.name}-${Math.random().toString(36).substr(2, 15).toUpperCase()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // Higher scale = better resolution
      useCORS: true, // Crucial for loading the QR code and Movie Poster images
      letterRendering: true,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Run the conversion
  html2pdf().set(options).from(element).save();
};

const isDownloading = ref(false);

const handleDownload = async () => {
  isDownloading.value = true;
  await downloadTicket();
  isDownloading.value = false;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeaderDesktop />

    <main
      class="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-[#1a0c0c]"
    >
      <div class="max-w-md w-full text-center space-y-8">
        <div class="relative mx-auto w-24 h-24">
          <div
            class="absolute inset-0 bg-primary/20 rounded-full animate-ping"
          ></div>
          <div
            class="relative bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
          >
            <span class="material-symbols-outlined text-5xl font-bold"
              >check</span
            >
          </div>
        </div>

        <div class="space-y-2">
          <h1 class="text-3xl font-black text-slate-900 dark:text-white">
            Payment Successful!
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            Your seats are confirmed. Enjoy the movie, Shanto!
          </p>
        </div>

        <!-- <div
          class="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800"
        >
          <div class="h-32 bg-primary/10 relative flex items-center px-6 gap-4">
            <img
              :src="selectedMovie.imageUrl"
              class="w-16 h-20 object-cover rounded-lg shadow-lg -mb-10"
            />
            <div class="text-left pt-2">
              <h3 class="font-bold text-lg leading-tight">
                {{ selectedMovie.title }}
              </h3>
              <p class="text-xs text-slate-500">{{ selectedTheater.name }}</p>
            </div>
          </div>

          <div class="p-6 pt-12 space-y-4">
            <div
              class="grid grid-cols-2 gap-4 text-left border-b border-dashed border-slate-200 dark:border-slate-800 pb-4"
            >
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-400">
                  Date & Time
                </p>
                <p class="text-sm font-bold">
                  {{ route.query.date }} • {{ route.query.time }}
                </p>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-400">
                  Seats
                </p>
                <p class="text-sm font-bold text-primary">
                  {{ route.query.seats }}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-center py-4 space-y-2">
              <div class="bg-white p-2 rounded-xl border-2 border-slate-100">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=booking-ref-12345"
                  alt="Booking QR"
                  class="w-32 h-32"
                />
              </div>
              <p class="text-[10px] font-mono text-slate-400">
                REF: BKN-{{
                  Math.random().toString(36).substr(2, 9).toUpperCase()
                }}
              </p>
            </div>
          </div>

          <div class="relative h-4 bg-slate-50 dark:bg-[#1a0c0c]">
            <div
              class="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#1a0c0c]"
            ></div>
            <div
              class="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#1a0c0c]"
            ></div>
          </div>
        </div> -->

        <!-- Movie ticket print -->
        <div
          ref="ticketElement"
          id="printable-ticket"
          class="rounded-3xl overflow-hidden p-0"
          style="
            width: 450px;
            margin: 0 auto;
            color: #1e293b;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            font-family: sans-serif;
          "
        >
          <div
            style="background-color: #1a0c0c; padding: 16px; text-align: center"
          >
            <h2
              style="
                color: #ffffff;
                margin: 0;
                font-size: 20px;
                font-weight: 900;
                letter-spacing: 2px;
              "
            >
              CINEPLEX
            </h2>
            <p
              style="
                color: #94a3b8;
                margin: 4px 0 0;
                font-size: 10px;
                text-transform: uppercase;
              "
            >
              Official Digital Ticket
            </p>
          </div>

          <div
            style="
              background-color: #f8fafc;
              position: relative;
              display: flex;
              align-items: center;
              padding: 24px;
              gap: 16px;
              border-bottom: 1px dashed #e2e8f0;
            "
          >
            <img
              :src="selectedMovie.imageUrl"
              style="
                width: 64px;
                height: 80px;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              "
            />
            <div style="text-align: left">
              <h3
                style="
                  font: bold;
                  font-size: 18px;
                  margin: 0;
                  color: #0f172a;
                  line-height: 1.2;
                "
              >
                {{ selectedMovie.title }}
              </h3>
              <p style="font-size: 12px; color: #64748b; margin: 4px 0">
                {{ selectedTheater.name }}
              </p>
              <p
                style="
                  font-size: 10px;
                  color: #94a3b8;
                  margin: 0;
                  line-height: 1.4;
                  max-width: 200px;
                "
              >
                {{
                  selectedTheater.address ||
                  "123 Cinema Lane, Entertainment District, City"
                }}
              </p>
            </div>
          </div>

          <div
            style="
              padding: 24px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            "
          >
            <div style="text-align: left">
              <p
                style="
                  font-size: 10px;
                  color: #94a3b8;
                  text-transform: uppercase;
                  margin: 0;
                "
              >
                Date & Time
              </p>
              <p
                style="
                  font-size: 13px;
                  font-weight: 700;
                  color: #1e293b;
                  margin: 2px 0;
                "
              >
                {{ route.query.date }} • {{ route.query.time }}
              </p>
            </div>
            <div style="text-align: left">
              <p
                style="
                  font-size: 10px;
                  color: #94a3b8;
                  text-transform: uppercase;
                  margin: 0;
                "
              >
                Theater Type
              </p>
              <p
                style="
                  font-size: 13px;
                  font-weight: 700;
                  color: #1e293b;
                  margin: 2px 0;
                "
              >
                {{ route.query.type || "Standard" }}
              </p>
            </div>
            <div style="text-align: left">
              <p
                style="
                  font-size: 10px;
                  color: #94a3b8;
                  text-transform: uppercase;
                  margin: 0;
                "
              >
                Seats
              </p>
              <p
                style="
                  font-size: 14px;
                  font-weight: 900;
                  color: #e11d48;
                  margin: 2px 0;
                "
              >
                {{ route.query.seats }}
              </p>
            </div>
            <div style="text-align: left">
              <p
                style="
                  font-size: 10px;
                  color: #94a3b8;
                  text-transform: uppercase;
                  margin: 0;
                "
              >
                Total Paid
              </p>
              <p
                style="
                  font-size: 14px;
                  font-weight: 900;
                  color: #1e293b;
                  margin: 2px 0;
                "
              >
                ${{ route.query.price }}
              </p>
            </div>
          </div>

          <div
            v-if="appliedDiscount > 0"
            style="
              margin: 0 24px;
              padding: 8px;
              background-color: #f0fdf4;
              border: 1px solid #bbf7d0;
              border-radius: 8px;
              text-align: center;
            "
          >
            <p
              style="
                font-size: 11px;
                color: #166534;
                font-weight: 600;
                margin: 0;
              "
            >
              Discount Applied: {{ appliedDiscount }}% Saved
            </p>
          </div>

          <div
            style="
              padding: 24px;
              text-align: center;
              border-top: 1px solid #f1f5f9;
            "
          >
            <img
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=CINEPLEX-${route.query.movieId}-${route.query.theaterId}-${route.query.seats}`"
              style="
                width: 100px;
                height: 100px;
                margin: 0 auto 12px;
                display: block;
              "
            />
            <p
              style="
                font-size: 12px;
                font-weight: 700;
                color: #0f172a;
                margin: 0;
              "
            >
              www.cineplex.com
            </p>
            <p style="font-size: 10px; color: #94a3b8; margin: 4px 0">
              Please present this QR at the entrance
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-3 mt-4">
          <button
            @click="handleDownload"
            class="w-full bg-slate-900 dark:bg-white dark:text-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">download</span>
            Download Ticket
          </button>
          <RouterLink
            to="/"
            class="text-sm font-bold text-primary hover:underline cursor-pointer"
          >
            Back to Home
          </RouterLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
@media print {
  /* Hide everything except the ticket */
  body * {
    visibility: hidden;
  }
  .flex-1,
  .flex-1 * {
    visibility: visible;
  }
  /* Force the ticket to the top left for printing */
  [ref="ticketElement"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
