import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './from.css'

function From() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '',
    b_name: '',
    division: '',
    thana: '',
    gender: '',
    blood_group: '',
    transaction_id: ''
  });
  
  const [paymentPicture, setPaymentPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentPicture(file);
    }
  };

  const handleClosePopup = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add payment picture
      if (paymentPicture) {
        submitData.append('payment_picture', paymentPicture);
      }

      // You can replace this URL with your actual backend URL
      const backendUrl = 'http://localhost:5000'; // Replace with your actual backend URL
      const response = await fetch(`${backendUrl}/api/info`, {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          phone: '',
          email: '',
          name: '',
          b_name: '',
          division: '',
          thana: '',
          gender: '',
          blood_group: '',
          transaction_id: ''
        });
        setPaymentPicture(null);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Banner Section */}
      <div className="form-banner">
        <div className="banner-background">
          <div className="banner-overlay"></div>
        </div>
        
        <div className="banner-content">
          <div className="banner-left">
            <div className="event-info">
              <h3 className="event-title">BURNERZ ADVENTURE CAMP 2025</h3>
              <h1 className="form-title">Registration Form</h1>
              <p className="form-instruction">
                Please Fillup The Form <span className="underline">Carefully</span> & do the payment.
              </p>
            </div>
          </div>
          
          <div className="banner-right">
            <div className="logo-container">
              <img 
                src="https://pfp.acsfutureschool.com/1760036975898_7fcqij5c_camp1.jpg" 
                alt="Burnerz Adventure Camp Logo" 
                className="camp-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-group">
                <h3 className="section-title">Personal Information</h3>
                
                <div className="input-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="b_name">Bangla Name</label>
                  <input
                    type="text"
                    id="b_name"
                    name="b_name"
                    value={formData.b_name}
                    onChange={handleInputChange}
                    placeholder="Enter your name in Bangla"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Location & Personal Details */}
              <div className="form-group">
                <h3 className="section-title">Location & Details</h3>
                
                <div className="input-group">
                  <label htmlFor="division">Division *</label>
                  <select
                    id="division"
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="thana">Thana/Upazila *</label>
                  <input
                    type="text"
                    id="thana"
                    name="thana"
                    value={formData.thana}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your thana/upazila"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="blood_group">Blood Group</label>
                  <select
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-section">
              <h3 className="section-title">Payment Information</h3>
              
              {/* Payment Details */}
              <div className="payment-details">
                <div className="payment-info-card">
                  <h4 className="payment-method-title">Payment Method</h4>
                  <div className="payment-method">
                    <div className="method-icon">📱</div>
                    <div className="method-info">
                      <h5>bKash</h5>
                      <p className="account-type">Personal Account</p>
                    </div>
                  </div>
                  <div className="account-number">
                    <span className="number-label">Account Number:</span>
                    <span className="number-value">01866733279</span>
                    <button 
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText('01866733279')}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="payment-note">
                    <p>Please send <strong>৳1250</strong> to this bKash number and use the transaction ID in the form below.</p>
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="transaction_id">Transaction ID *</label>
                <input
                  type="text"
                  id="transaction_id"
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your payment transaction ID"
                />
              </div>

              <div className="input-group">
                <label htmlFor="payment_picture">Payment Screenshot *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="payment_picture"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                  <label htmlFor="payment_picture" className="file-upload-label">
                    {paymentPicture ? paymentPicture.name : 'Choose Payment Screenshot'}
                  </label>
                </div>
                {paymentPicture && (
                  <div className="file-preview">
                    <img src={URL.createObjectURL(paymentPicture)} alt="Payment preview" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">
          <div className="popup-overlay" onClick={handleClosePopup}></div>
          <div className="popup-content">
            <div className="success-icon">✅</div>
            <h2 className="success-title">Registration Complete!</h2>
            <p className="success-message">
              Your registration has been completed successfully. 
              You will receive an email confirmation soon.
            </p>
            <button 
              className="popup-close-btn"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default From