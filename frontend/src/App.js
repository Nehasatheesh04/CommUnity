import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import PostFeed from './components/PostFeed';
import Footer from './components/Footer';
import './index.css';
import './App.css';

// A wrapper that redirects unauthenticated users to /login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('cu_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/posts" element={
              <ProtectedRoute><PostFeed /></ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute><Chat /></ProtectedRoute>
            } />

            {/* Default — redirect to dashboard or login */}
            <Route path="/" element={
              localStorage.getItem('cu_token')
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;