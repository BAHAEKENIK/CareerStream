import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import { SeoProvider } from "./app/seo.jsx";

import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ChangePassword from "./pages/admin/ChangePassword.jsx";
import JobsCrud from "./pages/admin/JobsCrud.jsx";
import TaxonomyCrud from "./pages/admin/TaxonomyCrud.jsx";
import SeoCrud from "./pages/admin/SeoCrud.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SeoProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/admin/jobs" element={<JobsCrud />} />
          <Route path="/admin/taxonomies" element={<TaxonomyCrud />} />
          <Route path="/admin/seo" element={<SeoCrud />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SeoProvider>
  </React.StrictMode>
);
