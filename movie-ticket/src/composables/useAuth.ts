import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const token = ref(localStorage.getItem("token") || null);
const user = ref(JSON.parse(localStorage.getItem("user")) || null);
const isLoading = ref(false);
const error = ref(null);

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      token.value = data.token;
      user.value = data.user;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      router.push("/");
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name, email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      
      // Auto-login after register
      await login(email, password);
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
}
