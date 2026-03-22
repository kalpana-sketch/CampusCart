# CampusCart Full-Stack Setup Instructions

This document provides step-by-step instructions for setting up and running the CampusCart marketplace application.

## 🚀 Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))

---

## 🛠️ Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/campuscart
   JWT_SECRET=your_super_secret_key_here
   ```
   *Note: Replace `MONGO_URI` with your connection string if using MongoDB Atlas.*

4. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   # OR normal start
   node server.js
   ```

---

## 🎨 Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

---

## 🔗 Connecting MongoDB

- **Local MongoDB**: Ensure the MongoDB service is running. The default URI is `mongodb://localhost:27017/campuscart`.
- **MongoDB Atlas**: 
  1. Log in to [Atlas](https://www.mongodb.com/cloud/atlas).
  2. Create a cluster and a database named `campuscart`.
  3. Get your connection string from "Connect" -> "Connect your application".
  4. Update `MONGO_URI` in `backend/.env`.

---

## 📡 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /signup`: Create a new account.
- `POST /login`: Log in and receive a JWT token.

### Items (`/api/items`)
- `GET /`: Fetch all items.
- `GET /:id`: Fetch a single item by ID.
- `POST /`: Create a new listing (Auth required).
- `PUT /:id`: Update your listing (Auth required).
- `DELETE /:id`: Delete your listing (Auth required).

### Wishlist (`/api/wishlist`)
- `GET /:userId`: Fetch user's wishlist.
- `POST /add`: Add item to wishlist (Auth required).
- `DELETE /remove/:itemId`: Remove item from wishlist (Auth required).

### Messages (`/api/messages`)
- `POST /send`: Send a message (Auth required).
- `GET /:otherUserId`: Fetch conversation with another user (Auth required).

---

## 💡 Running Together

To run both simultaneously, open two terminal windows:
- **Terminal 1**: `cd backend && npm run dev`
- **Terminal 2**: `cd Frontend && npm run dev`

Both servers will now be running, and the Frontend will communicate with the Backend at `http://localhost:5000/api`.
