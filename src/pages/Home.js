import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
        } catch (err) {
            console.log('Error fetching jobs');
        }
    };

    const applyForJob = async (jobId) => {
        try {
            await api.post(`/applications/apply/${jobId}`);
            alert('Applied successfully! 🎉');
        } catch (err) {
            alert('Already applied or error occurred!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', 
                alignItems: 'center', marginBottom: '30px' }}>
                <h2>🚀 NaukriBuddy — Job Listings</h2>
                <button onClick={handleLogout}
                    style={{ padding: '8px 16px', background: '#ff4444',
                        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
            {jobs.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>No jobs available!</p>
            ) : (
                jobs.map(job => (
                    <div key={job.id} style={{ padding: '20px', marginBottom: '16px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '10px',
                        borderLeft: '4px solid #00b4d8' }}>
                        <h3 style={{ marginBottom: '8px' }}>{job.title}</h3>
                        <p>🏢 {job.company} | 📍 {job.location} | 💰 {job.salary}</p>
                        <p style={{ color: '#666', margin: '8px 0' }}>{job.description}</p>
                        <p>🕐 {job.jobType} | Status: {job.status}</p>
                        <button onClick={() => applyForJob(job.id)}
                            style={{ marginTop: '12px', padding: '8px 20px',
                                background: '#00b4d8', color: 'white', border: 'none',
                                borderRadius: '6px', cursor: 'pointer' }}>
                            Apply Now
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;