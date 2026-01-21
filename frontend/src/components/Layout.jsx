import { Link } from "react-router-dom";
import { THEME } from "../app/theme.js";
import logoUrl from "../assets/logo.svg";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className={`mx-auto ${THEME.layout.maxWidth} px-4 py-4 flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="CareerStream" className="h-10 w-auto" />
          </Link>

          <nav className="flex items-center gap-3">
            <Link to="/jobs" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100">
              Browse Jobs
            </Link>

            <Link to="/terms" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100">
              Terms
            </Link>

            <Link to="/privacy" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100">
              Privacy
            </Link>

            <Link
              to="/admin/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: THEME.brand.orange }}
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className={`mx-auto ${THEME.layout.maxWidth} px-4 py-8`}>
        {children}
      </main>

      <footer className="mt-12 border-t bg-white">
  <div className="mx-auto max-w-6xl px-4 py-8">
    {/* top row: brand + links (professional) */}
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="text-lg font-extrabold">CareerStream</div>

      <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
        <a className="hover:text-black" href="/">
          Browse Jobs
        </a>
        <a className="hover:text-black" href="/terms">
          Terms
        </a>
        <a className="hover:text-black" href="/privacy">
          Privacy
        </a>
        <a className="hover:text-black" href="/admin">
          Admin
        </a>
      </nav>
    </div>

    {/* bottom row: centered copyright */}
    <div className="mt-6 text-center text-xs text-gray-500">
      © 2026 CareerStream. All rights reserved.
    </div>
  </div>
</footer>

    </div>
  );
}
