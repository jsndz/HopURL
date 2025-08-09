# HopURL – Full Stack (React + Node.js + MongoDB)

A production-ready URL shortener with click tracking, admin management, and a modern React frontend.
Built with **Vite + React + Tailwind** on the frontend and **Express + MongoDB** on the backend.

**Live Demo:** [https://hop-url.vercel.app/](https://hop-url.vercel.app/)

---

## ✨ Features

### Frontend (React + Vite + Tailwind)

- 🖥 **Modern UI** – Clean, responsive interface with TailwindCSS.
- 🔗 **URL Shortening Form** – Quickly create short links.
- 📊 **Admin Dashboard** – View all shortened URLs & stats (requires admin key).
- ⚠ **Error Alerts** – Friendly error messages for invalid inputs or failed requests.

### Backend (Node.js + Express + MongoDB)

- ✅ **Shorten URLs** – Convert long URLs to short codes.
- 📈 **Click Tracking** – Counts each visit to a short link.
- 🔐 **Admin API** – Secure endpoints protected by an `X-Admin-Key` header.
- 🛡 **Rate Limiting** – Prevents abuse.
- 📏 **URL Validation** – Ensures submitted URLs are valid.
- 🌍 **CORS Support** – Ready for frontend integration.

---

## 📂 Project Structure

```
.
├── client                  # React frontend
│   ├── src
│   │   ├── components      # Reusable UI components
│   │   ├── pages           # Home & Admin pages
│   │   ├── App.tsx         # Main app entry
│   │   └── index.css       # Global styles
│   ├── vite.config.ts      # Vite config
│   └── tailwind.config.js  # Tailwind config
│
└── server                  # Express backend
    ├── src
    │   ├── config          # Database connection
    │   ├── middleware      # Rate limiting, security
    │   ├── models          # Mongoose schemas
    │   └── routes          # API routes
    └── server.js           # Server entry point
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2️⃣ Install Dependencies

```bash
# Install backend deps
cd server
npm install

# Install frontend deps
cd ../client
npm install
```

### 3️⃣ Set Up Environment Variables

Create `server/.env`:

```env
MONGODB_URI=your-mongodb-uri
PORT=5000
NODE_ENV=development
ADMIN_KEY=your-secret-admin-key
BASE_URL=http://localhost:5000
```

---

## 🖥 Running the Project

### Development Mode (with hot reload)

In two separate terminals:

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

### Production Build

```bash
# Build frontend
cd client
npm run build

# Serve backend
cd ../server
npm start
```

---

## 🔑 API Endpoints

### Shorten a URL

```
POST /api/shorten
Content-Type: application/json
{
  "original_url": "https://example.com"
}
```

### Redirect

```
GET /:shortcode
```

### Admin – List All URLs

```
GET /api/admin/list
X-Admin-Key: your-secret-admin-key
```

### Admin – Stats

```
GET /api/admin/stats
X-Admin-Key: your-secret-admin-key
```

---

## 🛡 Security

- Admin key stored in `.env` and required in `X-Admin-Key` header
- Input validation & sanitization
- Rate limiting to prevent abuse

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Utilities:** nanoid, express-rate-limit, cors
