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

## 📂 Project Structure

```text
CommUnity/
├── backend/           # Express API & Socket.IO server
├── frontend/          # React application
├── uploads/           # User-uploaded images (posts)
├── render.yaml        # Deployment blueprint for Render
└── package.json       # Unified root configuration
```

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

This project is optimized for deployment as a single **Web Service** on Render.

1. **Push to GitHub**: Push your code to a GitHub repository.
2. **Create New Service**:
   - Go to [Render Dashboard](https://dashboard.render.com).
   - Click **New** > **Web Service**.
   - Connect your GitHub repo.
3. **Configure Service**:
   - **Environment**: `Node`
   - **Build Command**: `npm install && cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
4. **Add Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET_KEY`: A long secret string.
   - `NODE_VERSION`: `18.17.0` (or higher).
5. **Deploy**: Click **Create Web Service**.

## 📄 License

This is a student portfolio project. Feel free to use and modify it!
