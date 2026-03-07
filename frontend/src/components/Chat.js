import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const API = window.location.hostname === 'localhost' ? 'http://localhost:4000' : '';



// Create a single socket connection (module-level so it's not recreated on re-renders)
let socket;

function Chat() {
    const name = localStorage.getItem('cu_name') || 'Anonymous';
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // 1. Fetch message history on mount
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${API}/api/chats/messages`);
                setMessages(res.data.messages || []);
            } catch (err) {
                console.error('Could not load message history:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();

        // 2. Connect to Socket.IO
        socket = io(API, { transports: ['websocket', 'polling'] });

        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        });

        // 3. Listen for incoming messages from all clients (including self)
        socket.on('receive_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed || !connected) return;
        socket.emit('send_message', { sender: name, text: trimmed });
        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-page">
            {/* Header */}
            <div className="chat-header">
                <div className="chat-header-dot" style={{ background: connected ? '#6bff6b' : '#ff6b6b' }} />
                <h1 className="chat-header-title">Community Chat</h1>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {connected ? 'Connected' : 'Connecting…'}
                </span>
            </div>

            {/* Messages */}
            <div className="chat-messages">
                {loading && (
                    <div className="chat-empty">Loading messages…</div>
                )}
                {!loading && messages.length === 0 && (
                    <div className="chat-empty">
                        No messages yet. Be the first to say something!
                    </div>
                )}
                {messages.map((msg, idx) => {
                    const isOwn = msg.sender === name;
                    return (
                        <div key={msg._id || idx} className={`chat-msg ${isOwn ? 'own' : 'other'}`}>
                            <div className="chat-msg-meta">
                                {!isOwn && <span>{msg.sender} &bull; </span>}
                                <span>{formatTime(msg.createdAt)}</span>
                            </div>
                            <div className="chat-msg-bubble">{msg.text}</div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="chat-input-area">
                <textarea
                    className="chat-input"
                    placeholder="Type a message… (Enter to send)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button
                    className="chat-send-btn"
                    onClick={handleSend}
                    disabled={!text.trim() || !connected}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
