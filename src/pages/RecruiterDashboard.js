import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: '', company: '', location: '',
        description: '', salary: '', jobType: 'FULL_TIME'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
        } catch (err) {
            console.log('Error fetching jobs');
        }
    };

    const postJob = async (e) => {
        e.preventDefault();
        try {
            await api.post('/jobs', newJob);
            alert('Job posted successfully! 🎉');
            fetchMyJobs();
        } catch (err) {
            alert('Error posting job!');
        }
    };

    const deleteJob = async (jobId) => {
        try {
            await api.delete(`/jobs/${jobId}`);
            alert('Job deleted!');
            fetchMyJobs();
        } catch (err) {
            alert('Error deleting job!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '30px' }}>
                <h2>👔 Recruiter Dashboard</h2>
                <button onClick={handleLogout}
                    style={{ padding: '8px 16px', background: '#ff4444',
                        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>

            {/* Post Job Form */}
            <div style={{ padding: '20px', marginBottom: '30px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <h3 style={{ marginBottom: '16px' }}>📝 Post New Job</h3>
                <form onSubmit={postJob}>
                    {['title', 'company', 'location', 'description', 'salary'].map(field => (
                        <input key={field} type="text" placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={newJob[field]}
                            onChange={(e) => setNewJob({...newJob, [field]: e.target.value})}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px',
                                borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }} />
                    ))}
                    <select value={newJob.jobType}
                        onChange={(e) => setNewJob({...newJob, jobType: e.target.value})}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px',
                            borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}>
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="INTERNSHIP">Internship</option>
                    </select>
                    <button type="submit"
                        style={{ padding: '10px 24px', background: '#00b4d8',
                            color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        Post Job
                    </button>
                </form>
            </div>

            {/* Job Listings */}
            <h3 style={{ marginBottom: '16px' }}>📋 My Job Postings</h3>
            {jobs.map(job => (
                <div key={job.id} style={{ padding: '20px', marginBottom: '16px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '10px',
                    borderLeft: '4px solid #ff6b35' }}>
                    <h3>{job.title}</h3>
                    <p>🏢 {job.company} | 📍 {job.location} | 💰 {job.salary}</p>
                    <p style={{ color: '#666' }}>{job.description}</p>
                    <button onClick={() => deleteJob(job.id)}
                        style={{ marginTop: '10px', padding: '6px 16px', background: '#ff4444',
                            color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        Delete Job
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RecruiterDashboard;