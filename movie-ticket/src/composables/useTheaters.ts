import { ref } from "vue";
import { useAuth } from "./useAuth";

const BASE_URL = "http://localhost:8080/api";

export function useTheaters() {
  const { token } = useAuth();
  const theaters = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchTheaters = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const headers: Record<string, string> = {};
      if (token.value) {
        headers["Authorization"] = `Bearer ${token.value}`;
      }
      const res = await fetch(`${BASE_URL}/theaters`, { headers });
      if (!res.ok) throw new Error("Failed to fetch theaters");
      theaters.value = await res.json();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const theatersForIds = (ids?: string[]) => {
    if (!ids || ids.length === 0) return theaters.value;
    return ids
      .map((id) => theaters.value.find((t: any) => t.theaterId === id))
      .filter(Boolean);
  };

  const toggleFavorite = async (theaterId: string) => {
    if (!token.value) return;
    try {
      const res = await fetch(`${BASE_URL}/theaters/${theaterId}/favorite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token.value}` },
      });
      if (!res.ok) throw new Error("Failed to toggle favorite");
      const data = await res.json();
      // Optimistically update local state
      const idx = theaters.value.findIndex((t: any) => t.theaterId === theaterId);
      if (idx !== -1) {
        theaters.value[idx] = Object.assign({}, theaters.value[idx], { isFavorite: data.isFavorite });
      }
      return data.isFavorite as boolean;
    } catch (e: any) {
      error.value = e.message;
    }
  };

  return {
    theaters,
    isLoading,
    error,
    fetchTheaters,
    theatersForIds,
    toggleFavorite,
  };
}

