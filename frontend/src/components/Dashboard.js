import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const name = localStorage.getItem('cu_name') || 'User';
    const email = localStorage.getItem('cu_email') || '';

    const handleLogout = () => {
        localStorage.removeItem('cu_token');
        localStorage.removeItem('cu_name');
        localStorage.removeItem('cu_email');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-greeting">Hello, {name} 👋</h1>
                <p className="dashboard-email">{email}</p>
            </div>

            <div className="dashboard-grid">
                {/* Chat card */}
                <div className="dash-card">
                    <h2 className="dash-card-title">Community Chat</h2>
                    <p className="dash-card-desc">
                        Join the real-time global chat room. Send and receive messages instantly.
                    </p>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/chat')}
                        style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                    >
                        Open Chat →
                    </button>
                </div>

                {/* Account card */}
                <div className="dash-card">
                    <h2 className="dash-card-title">Your Account</h2>
                    <p className="dash-card-desc">
                        <span style={{ display: 'block', marginBottom: '6px' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>NAME</span><br />
                            {name}
                        </span>
                        <span style={{ display: 'block' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>EMAIL</span><br />
                            {email}
                        </span>
                    </p>
                    <button
                        className="btn btn-ghost"
                        onClick={handleLogout}
                        style={{ marginTop: 'auto', alignSelf: 'flex-start', color: '#ff6b6b', borderColor: '#3a0000' }}
                    >
                        Logout
                    </button>
                </div>

                {/* Tips card */}
                <div className="dash-card">
                    <h2 className="dash-card-title">Getting Started</h2>
                    <p className="dash-card-desc" style={{ fontSize: '13px' }}>
                        <span style={{ display: 'block', marginBottom: '10px' }}>
                            ① Go to <strong>Chat</strong> to talk with the community in real time.
                        </span>
                        <span style={{ display: 'block' }}>
                            ② All messages are saved so you can see the history when you return.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
