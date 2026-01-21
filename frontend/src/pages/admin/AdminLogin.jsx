import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { adminLogin, initAdminAuth, getToken } from "../../services/adminAuth.js";

export default function AdminLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    initAdminAuth();
    if (getToken()) nav("/admin", { replace: true });
  }, [nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(email.trim(), password);
      nav("/admin", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          One admin only.
        </p>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              placeholder="Your password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
            style={{ backgroundColor: THEME.brand.orange }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          only one admin 
        </div>
      </div>
    </Layout>
  );
}
