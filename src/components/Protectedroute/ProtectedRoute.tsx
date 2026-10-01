import { Navigate, Outlet, useLocation } from "react-router";

const decodeJwtPayload = (token: string) => {
  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    return JSON.parse(
      decodeURIComponent(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      ),
    );
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  const decoded = decodeJwtPayload(token);
  if (!decoded || typeof decoded.exp !== "number") return true;

  return Date.now() >= decoded.exp * 1000;
};

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const expired = isTokenExpired(token);

  if (!token || expired) {
    clearSession();
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
