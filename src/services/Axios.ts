import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(api.defaults.baseURL);

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const isAuthRequest = (url?: string) =>
  typeof url === "string" &&
  (url.includes("auth/login") || url.includes("auth/refresh"));

const redirectToLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && isAuthRequest(originalRequest?.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const res = await api.post("/auth/refresh");
      const newAccessToken = res.data.accessToken;
      localStorage.setItem("token", newAccessToken);
      api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      redirectToLogin();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;

const LoginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("v1/auth/login", { email, password });
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
    }
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Login error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { LoginUser };

const LogoutUser = async () => {
  try {
    const response = await api.post("v1/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Logout error:",
      error.response?.data || error?.message || error,
    );
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
    throw error;
  }
};

export { LogoutUser };
  
interface SigninProps {
  user: {
    full_name: string;
    organization: string;
    department: string;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
    role: string;
  };
}

const SigninClient: () => Promise<SigninProps> = async () => {
  const payload = {
    full_name: "full_name",
    organization: "organization",
    department: "department",
    email: "email",
    username: "username",
    password: "password",
    confirm_password: "confirm_password",
    role: "role",
  };
  try {
    const response = await api.post(`v1/auth/signup`, payload);
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Signup error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { SigninClient };

