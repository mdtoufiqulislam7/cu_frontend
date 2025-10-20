import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvingId, setApprovingId] = useState(null);
  const navigate = useNavigate();

  // const backendUrl = 'https://road-server.onrender.com';
  const backendUrl = 'http://localhost:5000';

  // Fetch registration data
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/info`);
      if (!response.ok) {
        throw new Error('Failed to fetch registrations');
      }
      const data = await response.json();
      setRegistrations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle approve button click
  const handleApprove = async (paymentId) => {
    try {
      setApprovingId(paymentId);
      const response = await fetch(`${backendUrl}/api/is-approved`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'payment_id': paymentId,
          approved: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve payment');
      }

      // Refresh the data after approval
      alert('Payment approved successfully!');
      await fetchRegistrations();
    } catch (err) {
      console.error('Error approving payment:', err);
      alert('Failed to approve payment. Please try again.');
    } finally {
      setApprovingId(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">Error: {error}</div>
        <button onClick={fetchRegistrations} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Registration Management</h1>
        <p className="total-count">Total Registrations: {registrations.length}</p>
        <button 
          onClick={() => navigate('/approved')} 
          className="approved-registration-btn"
        >
          Approved Registration
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Payment Picture</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No registrations found
                </td>
              </tr>
            ) : (
              registrations.map((registration) => (
                <tr key={registration.id}>
                  <td>{registration.name}</td>
                  <td>{registration.contact_number}</td>
                  <td>{registration.email}</td>
                  <td>{registration.transaction_id || 'N/A'}</td>
                  <td>
                    {registration.payment_picture ? (
                      <a
                        href={registration.payment_picture}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-link"
                      >
                        View
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{formatDate(registration.created_at)}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(registration.id)}
                      className={`approve-btn ${approvingId === registration.id ? 'loading' : ''}`}
                      disabled={registration.payment_status === 'approved' || approvingId === registration.id}
                    >
                      {approvingId === registration.id ? (
                        <>
                          <span className="spinner"></span>
                          Wait...
                        </>
                      ) : registration.payment_status === 'approved' ? (
                        'Approved'
                      ) : (
                        'Approve'
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;