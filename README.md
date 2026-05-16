# 💰 Expense Tracker

A full stack personal finance management application that helps you track income and expenses, visualize spending patterns, and take control of your financial life.

🌐 **Live Demo:** [expensetrackerforever.netlify.app](https://expensetrackerforever.netlify.app)
⚙️ **API:** [expense-tracker-api-s060.onrender.com](https://expense-tracker-api-s060.onrender.com)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with httpOnly cookies
- 📊 **Interactive Dashboard** — Real-time balance, income & expense overview
- 📈 **Visual Analytics** — Bar charts showing spending by category
- 💸 **Transaction Management** — Add, edit, and delete transactions
- 🗂️ **Smart Categories** — Organize by Salary, Food, Rent, Freelance and more
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop
- 🏠 **Landing Page** — Professional corporate design for new users

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

- React 18
- Tailwind CSS
- Recharts (data visualization)
- Axios (API calls)
- React Router DOM (navigation)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

- Node.js + Express
- PostgreSQL (Supabase)
- JWT Authentication
- bcrypt (password hashing)
- cookie-parser

### Deployment

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

- Frontend → Netlify
- Backend → Render
- Database → Supabase (PostgreSQL)

---

## 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL
);

-- Transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Create new account     |
| POST   | `/api/auth/login`    | Login and receive JWT  |
| POST   | `/api/auth/logout`   | Logout and clear token |

### Transactions

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/transactions`     | Get all transactions   |
| POST   | `/api/transactions`     | Create new transaction |
| PUT    | `/api/transactions/:id` | Update transaction     |
| DELETE | `/api/transactions/:id` | Delete transaction     |

### Categories

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/categories` | Get all categories |

---

## 🚀 Run Locally

### Prerequisites

- Node.js v18+
- PostgreSQL
- Git

### Clone the repo

```bash
git clone https://github.com/SriHariPokkimgari/expense-tracker.git
cd expense-tracker
```

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

### Setup Frontend

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## 📁 Project Structure

```
expense-tracker/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Transactions.jsx
│   │   └── App.jsx
│   └── netlify.toml
│
└── server/                   # Node.js backend
    ├── config/
    │   └── db.js             # PostgreSQL connection
    ├── controllers/
    │   ├── authController.js
    │   └── transactionController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── transactionRoutes.js
    │   └── categoryRoutes.js
    └── index.js
```

---

## 👨‍💻 Author

**Sri Hari Pokkimgari**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SriHariPokkimgari)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!
