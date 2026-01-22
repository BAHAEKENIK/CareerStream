# CareerStream — Job Board (Laravel 11 API + React)

CareerStream is a lightweight job board focused on **category-first browsing** with optional **country (flag) + city** filters.  
No visitor accounts. One admin only.

## Live
- Frontend: https://career-stream.vercel.app
- Backend (API): https://careerstream-production.up.railway.app

---

## Key Features

### Public (Visitors)
- Browse jobs as cards
- Search by keyword
- Filter by:
  - Category (primary)
  - Country (with flag emoji)
  - City (appears after country selection)
- Job details page with apply link
- SEO meta tags (React Helmet)

### Admin (One Admin Only)
- Admin seeded automatically (no registration)
- Login + logout
- First login forces password change
- CRUD:
  - Jobs (create, edit, delete)
  - Categories, countries, cities
  - SEO meta entries
- Company logo upload (file picker → upload endpoint → stored path saved)

---

## Tech Stack
- **Backend:** Laravel 11 (API only) + Sanctum (token auth)
- **Frontend:** React (Vite) + Tailwind CSS + Axios + React Router
- **Database:** MySQL
- **Hosting:**
  - Frontend on Vercel
  - Backend + MySQL on Railway

---

## Project Structure

CareerStream/
backend/ Laravel API
frontend/ React Vite app

markdown
Copy code

---

## API Endpoints (Summary)

### Public
- `GET /api/jobs`
- `GET /api/jobs/{id}`
- `GET /api/taxonomies/categories`
- `GET /api/taxonomies/countries`
- `GET /api/taxonomies/countries/{iso2}/cities`

### Admin
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET  /api/admin/me`
- `POST /api/admin/change-password`

- `POST /api/admin/upload/company-logo`

- `apiResource /api/admin/categories`
- `apiResource /api/admin/countries`
- `apiResource /api/admin/cities`
- `apiResource /api/admin/jobs`
- `GET/POST/PUT /api/admin/seo`

---

## Local Setup (Windows)

### Requirements
- PHP 8.3+
- Composer
- Node.js 18+ (or 20+)
- MySQL 8+

### Backend
cd D:\CareerStream\backend
copy .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --host=127.0.0.1 --port=8000
Frontend
bash
Copy code
cd D:\CareerStream\frontend
npm install
npm run dev
Frontend dev URL: http://localhost:5173
Backend dev URL: http://127.0.0.1:8000