
# 📅 Bookrino — Smart Scheduling Platform

Bookrino is a full-stack appointment scheduling platform (Calendly-lite) that allows users to create events, share booking links, and manage their schedules effortlessly.

<div align="center">
  <img src="https://img.shields.io/badge/Status-In%20Progress-blue" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-green" />
  <img src="https://img.shields.io/badge/Backend-Express.js-red" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-9cf" />
</div>

---

## 🚀 Features

### ✅ User-side
- 🔐 Authentication (Sign up, Login)
- 🗓️ Event creation (title, duration, time slots)
- 🌍 Time zone support
- 📤 Public booking link
- 📥 Book appointment interface
- 📬 Booking confirmation (visual + alert)

### ✅ Admin-side
- 🧾 View booked appointments
- 🗑️ Cancel or delete events
- 📊 User dashboard for managing schedule

---

## 🧠 Tech Stack

| Layer     | Tech Stack             |
|-----------|------------------------|
| Frontend  | React (Vite) + TailwindCSS |
| Backend   | Node.js + Express.js   |
| Database  | SQLite (development)   |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📂 Folder Structure

```bash
📁 wiz-hiring-fullstack-2025/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/            # Axios/fetch logic
│   │   ├── assets/         # Images, logos
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page-level components
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Root App component
│   │   └── main.jsx        # Entry point
│   └── public/             # Static files
│
├── server/                 # Backend (Express.js)
│   ├── routes/             # API routes
│   ├── data/               # Sample or seed data
│   ├── utils/              # Middleware / helpers
│   ├── db.js               # SQLite config
│   ├── index.js            # Entry point
│   └── database.db         # SQLite DB file
│
├── .env.example            # Env variable template
├── render.yaml             # Backend deployment config
└── README.md               # This file!
````

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Jatin-20/wiz-hiring-fullstack-2025.git
cd wiz-hiring-fullstack-2025
```

### 2. Setup environment variables

Create `.env` files in both `client/` and `server/` folders using the `.env.example` files.

---

### 3. Run Frontend

```bash
cd client
npm install
npm run dev
```

### 4. Run Backend

```bash
cd server
npm install
npm start
```

---

## 🌐 Deployment (Planned)

* Frontend: [Vercel](https://vercel.com/)
* Backend: [Render](https://render.com/)
* **Note**: Deployment in progress. Local development is stable.

---

## 🔮 Future Enhancements

* 📩 Email reminders for bookings
* 📆 Google Calendar integration
* 🧑‍🤝‍🧑 Group scheduling
* 📱 Mobile responsiveness & PWA
* 🛡️ Role-based access control

---

## 👨‍💻 Author

Made with ❤️ by [Jatin Garg](https://github.com/Jatin-20)

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).




