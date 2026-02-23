import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CANDIDATE');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { name, email, password, role });
            navigate('/login');
        } catch (err) {
            setError('Registration failed!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>📝 NaukriBuddy Register</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '16px' }}>
                    <input type="text" placeholder="Full Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '14px' }} />
                </div>
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
                <div style={{ marginBottom: '16px' }}>
                    <select value={role} onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px',
                            border: '1px solid #ddd', fontSize: '14px' }}>
                        <option value="CANDIDATE">Candidate</option>
                        <option value="RECRUITER">Recruiter</option>
                    </select>
                </div>
                <button type="submit"
                    style={{ width: '100%', padding: '12px', background: '#ff6b35',
                        color: 'white', border: 'none', borderRadius: '6px',
                        fontSize: '16px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '16px' }}>
                Already have account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default Register;