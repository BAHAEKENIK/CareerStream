import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { THEME } from "../../app/theme.js";
import { adminLogout, adminMe, initAdminAuth, getToken } from "../../services/adminAuth.js";

export default function Dashboard() {
  const nav = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAdminAuth();
    if (!getToken()) {
      nav("/admin/login", { replace: true });
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const me = await adminMe();
        setAdmin(me);
      } catch {
        nav("/admin/login", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [nav]);

  async function onLogout() {
    await adminLogout();
    nav("/", { replace: true });
  }

  return (
    <Layout>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: THEME.brand.dark }}>
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage jobs, categories, countries, cities, and SEO.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: THEME.brand.dark }}
        >
          Logout
        </button>
      </div>

      <div className="mt-5 rounded-2xl border bg-white p-5 shadow-sm">
        {loading ? (
          <div className="text-sm text-gray-600">Loading admin...</div>
        ) : admin ? (
          <div className="text-sm text-gray-700">
            Logged in as <span className="font-semibold">{admin.email}</span>

            {admin.force_password_change ? (
              <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm">
                <div className="font-semibold" style={{ color: THEME.brand.orange }}>
                  Action required: You must change your password (first login).
                </div>

                <Link
                  to="/admin/change-password"
                  className="mt-3 inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: THEME.brand.orange }}
                >
                  Change Password Now
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-gray-600">Not logged in.</div>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link to="/admin/jobs" className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.blue }}>Jobs</div>
          <div className="mt-1 text-sm text-gray-600">Create / update / delete jobs</div>
        </Link>

        <Link to="/admin/taxonomies" className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.green }}>Taxonomies</div>
          <div className="mt-1 text-sm text-gray-600">Categories, countries, cities</div>
        </Link>

        <Link to="/admin/seo" className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="text-sm font-semibold" style={{ color: THEME.brand.orange }}>SEO</div>
          <div className="mt-1 text-sm text-gray-600">Meta titles/descriptions</div>
        </Link>
      </div>
    </Layout>
  );
}
