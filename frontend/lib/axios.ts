import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      try {
        if (!config.headers.Cookie) {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          const rawCookies = cookieStore.toString();

          if (rawCookies) {
            config.headers.Cookie = rawCookies;
          }
        }
      } catch (error) {
        console.error("Не вдалося зчитати кукі на сервері Next.js:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const originalRequest = error.config;
    console.log("--- INTERCEPTOR DEBUG ---");
    console.log("Error config:", error.config?.url);
    console.log("Error response:", error.response);
    console.log("Error message:", error.message);
    console.log("-------------------------");

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((error) => Promise.reject(error));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshResponse = await api.get("/auth/refresh");
        const newCookies = refreshResponse.headers["set-cookie"];
        if (newCookies) {
          const cookieString = newCookies
            .map((c) => c.split(";")[0])
            .join("; ");
          originalRequest.headers.Cookie = cookieString;
          if (typeof window === "undefined") {
            try {
              const { cookies } = await import("next/headers");
              const cookieStore = await cookies();

              newCookies.forEach((cookieStr) => {
                const [nameValue] = cookieStr.split(";");
                const [name, value] = nameValue.split("=");

                cookieStore.set(name.trim(), value.trim(), {
                  httpOnly: true,
                  path: "/",
                });
              });
            } catch (cookieStoreError) {
              console.warn("cookie error");
            }
          }
        }
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
  //
);

export default api;
