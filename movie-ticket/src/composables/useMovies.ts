import { ref, computed } from "vue";
import { useAuth } from "./useAuth";

const movies = ref([]);
const featuredMovie = ref(null);
const isLoading = ref(false);
const error = ref(null);

export function useMovies() {
  const { token, logout } = useAuth();

  const fetchMovies = async () => {
    if (movies.value.length > 0) return; // Basic cache

    isLoading.value = true;
    error.value = null;
    try {
      const headers = new Headers();
      if (token.value) {
        headers.append("Authorization", `Bearer ${token.value}`);
      }

      const response = await fetch("http://localhost:8080/api/movies", { headers });

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      movies.value = data;
      
      if (data.length > 0) {
        // Set the first generic movie as featured if none is assigned normally
        featuredMovie.value = data[0];
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getMovieById = (id) => {
    // In our Go backend, IDs are numbers, but in the previous data struct they were strings. 
    // We compare softly by coercion.
    return computed(() => movies.value.find((m) => String(m.ID) === String(id)));
  };

  return {
    movies,
    featuredMovie,
    isLoading,
    error,
    fetchMovies,
    getMovieById,
  };
}
