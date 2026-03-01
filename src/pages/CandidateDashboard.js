import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CandidateDashboard() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications/my');
            setApplications(response.data);
        } catch (err) {
            console.log('Error fetching applications');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'APPLIED': return '#00b4d8';
            case 'REVIEWED': return '#f59e0b';
            case 'SHORTLISTED': return '#10b981';
            case 'REJECTED': return '#ff4444';
            default: return '#888';
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '30px' }}>
                <h2>👨‍💼 My Applications</h2>
                <button onClick={handleLogout}
                    style={{ padding: '8px 16px', background: '#ff4444',
                        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>

            {applications.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>No applications yet!</p>
            ) : (
                applications.map(app => (
                    <div key={app.id} style={{ padding: '20px', marginBottom: '16px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '10px',
                        borderLeft: `4px solid ${getStatusColor(app.status)}` }}>
                        <h3>{app.job.title}</h3>
                        <p>🏢 {app.job.company} | 📍 {app.job.location} | 💰 {app.job.salary}</p>
                        <p style={{ marginTop: '8px' }}>
                            Status: <span style={{ color: getStatusColor(app.status),
                                fontWeight: 'bold', fontSize: '16px' }}>{app.status}</span>
                        </p>
                        <p style={{ color: '#888', fontSize: '12px' }}>
                            Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default CandidateDashboard;