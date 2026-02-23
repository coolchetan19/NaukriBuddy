import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>🚀 NaukriBuddy Login</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                    <input type="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <input type="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '14px' }} />
                </div>
                <button type="submit"
                    style={{ width: '100%', padding: '12px', background: '#00b4d8',
                        color: 'white', border: 'none', borderRadius: '6px',
                        fontSize: '16px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '16px' }}>
                Don't have account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default Login;