import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('cu_token');
    const userName = localStorage.getItem('cu_name');

    const handleLogout = () => {
        localStorage.removeItem('cu_token');
        localStorage.removeItem('cu_name');
        localStorage.removeItem('cu_email');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'navbar-link active-link' : 'navbar-link';

    return (
        <nav className="navbar">
            <Link to={token ? '/dashboard' : '/login'} className="navbar-brand">
                CommUnity
            </Link>

            <div className="navbar-links">
                {token ? (
                    <>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginRight: '8px' }}>
                            {userName}
                        </span>
                        <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                        <Link to="/posts" className={isActive('/posts')}>Community Feed</Link>
                        <Link to="/chat" className={isActive('/chat')}>Chat</Link>
                        <button className="navbar-link btn-danger" onClick={handleLogout}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={isActive('/login')}>Login</Link>
                        <Link to="/register" className={isActive('/register')}
                            style={{
                                padding: '7px 16px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                background: 'var(--text-primary)',
                                color: 'var(--bg-primary)',
                            }}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
