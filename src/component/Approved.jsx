import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Approved.css';

function Approved() {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const backendUrl = 'https://road-server.onrender.com';
  const backendUrl = 'http://localhost:5000';

  // Fetch approved registrations
  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const fetchApprovedUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/is-approved`);
      if (!response.ok) {
        throw new Error('Failed to fetch approved registrations');
      }
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setApprovedUsers(data);
      } else if (data && typeof data === 'object') {
        // If data is an object, try to find the array inside
        setApprovedUsers(data.data || data.users || data.registrations || []);
      } else {
        setApprovedUsers([]);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching approved registrations:', err);
      setApprovedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="approved-container">
        <div className="approved-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="approved-container">
        <div className="approved-error">Error: {error}</div>
        <button onClick={fetchApprovedUsers} className="approved-retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="approved-container">
      <div className="approved-header">
        <h1>✓ Approved Registrations</h1>
        <p className="approved-total-count">Total Approved: {approvedUsers.length}</p>
        <button 
          onClick={() => navigate('/admin-mahi@123')} 
          className="back-to-admin-btn"
        >
          ← Back to Admin
        </button>
      </div>

      <div className="approved-table-container">
        <table className="approved-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>T-Shirt Size</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {approvedUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="approved-no-data">
                  No approved registrations found
                </td>
              </tr>
            ) : (
              approvedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.registrant_name}</td>
                  <td>{user.registrant_email}</td>
                  <td>{user.registrant_phone}</td>
                  <td>
                    {user.t_size ? (
                      <span className="success-badge">{user.t_size}</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{user.transaction_id || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Approved;