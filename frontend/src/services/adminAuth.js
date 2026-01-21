import { api, setAdminToken } from "./api.js";

const TOKEN_KEY = "careerstrem_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    setAdminToken(token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
    setAdminToken("");
  }
}

export function initAdminAuth() {
  const token = getToken();
  if (token) setAdminToken(token);
}

export async function adminLogin(email, password) {
  const res = await api.post("/admin/login", { email, password });
  const token = res.data?.token || "";
  setToken(token);
  return res.data;
}

export async function adminLogout() {
  try {
    await api.post("/admin/logout");
  } finally {
    setToken("");
  }
}

export async function adminMe() {
  const res = await api.get("/admin/me");
  return res.data?.admin;
}

export async function adminChangePassword(current_password, new_password, new_password_confirmation) {
  const res = await api.post("/admin/change-password", {
    current_password,
    new_password,
    new_password_confirmation,
  });
  return res.data;
}
