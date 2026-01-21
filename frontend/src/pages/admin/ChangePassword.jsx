import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { adminChangePassword, adminMe, getToken, initAdminAuth } from "../../services/adminAuth.js";

export default function ChangePassword() {
  const nav = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    initAdminAuth();
    if (!getToken()) {
      nav("/admin/login", { replace: true });
      return;
    }

    (async () => {
      try {
        const me = await adminMe();
        setAdmin(me);
      } catch {
        nav("/admin/login", { replace: true });
      }
    })();
  }, [nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await adminChangePassword(current, next, confirm);
      setMsg("Password changed successfully.");
      setCurrent("");
      setNext("");
      setConfirm("");
      nav("/admin", { replace: true });
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Change password failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
          Change Password
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          {admin?.email ? `Logged in as ${admin.email}` : "Admin session"}
        </p>

        {err ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        ) : null}

        {msg ? (
          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {msg}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Current password</label>
            <input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">New password</label>
            <input
              value={next}
              onChange={(e) => setNext(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              required
            />
            <div className="mt-1 text-xs text-gray-500">Minimum 10 characters.</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Confirm new password</label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
            style={{ backgroundColor: THEME.brand.orange }}
          >
            {loading ? "Saving..." : "Save new password"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
