# CommUnity 🤝

A simple, full-stack social platform for students to share posts and chat in real-time.

## 🚀 Features

- **Authentication**: Secure Login and Sign-up system.
- **Community Feed**: Post updates with image uploads.
- **Real-time Chat**: Instant messaging powered by Socket.IO.
- **Responsive Design**: Minimalist black-and-white aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React, Axios, Socket.IO Client.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Real-time**: Socket.IO.
- **Storage**: Multer (Local disk storage for uploads).

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Setup Environment**:
   Create a `backend/config/config.env` with:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET_KEY=your_secret
   FRONTEND_URL=http://localhost:3000
   ```
3. **Run the App**:
   ```bash
   npm run dev
   ```
   *Frontend: http://localhost:3000 | Backend: http://localhost:4000*

## 🌐 Deployment (Render)

https://community-app-i32z.onrender.com


