import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './from.css'

function From() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    contact_number: '',
    email: '',
    name: '',
    nickname: '',
    p_address: '',
    gender: '',
    t_size: '',
    bick_club_name: '',
    bick_brand: '',
    b_group: '',
    transaction_id: ''
  });
  
  const [paymentPicture, setPaymentPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreements, setAgreements] = useState({
    clubRules: false,
    safetyGear: false,
    photoPermission: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements(prev => ({
      ...prev,
      [name]: checked
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
    
    // Check if all agreements are accepted
    if (!agreements.clubRules || !agreements.safetyGear || !agreements.photoPermission) {
      alert('Please accept all terms and conditions to proceed.');
      return;
    }
    
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
          contact_number: '',
          email: '',
          name: '',
          nickname: '',
          p_address: '',
          gender: '',
          t_size: '',
          bick_club_name: '',
          bick_brand: '',
          b_group: '',
          transaction_id: ''
        });
        setPaymentPicture(null);
        setAgreements({
          clubRules: false,
          safetyGear: false,
          photoPermission: false
        });
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
          <img 
            src="https://pfp.acsfutureschool.com/1760597749141_3cr07bn6_landing_page.png" 
            alt="Burnerz Adventure Camp Background" 
            className="banner-bg-image"
          />
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
            {/* <div className="logo-container">
              <img 
                src="https://pfp.acsfutureschool.com/1760036975898_7fcqij5c_camp1.jpg" 
                alt="Burnerz Adventure Camp Logo" 
                className="camp-logo"
              />
            </div> */}
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
                  <label htmlFor="name">Name *</label>
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
                  <label htmlFor="nickname">Nickname / Rider Name *</label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your nickname or rider name"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="p_address">Present Address *</label>
                  <textarea
                    id="p_address"
                    name="p_address"
                    value={formData.p_address}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your present address"
                    rows="3"
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
                  <label htmlFor="t_size">T-shirt Size *</label>
                  <select
                    id="t_size"
                    name="t_size"
                    value={formData.t_size}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select T-shirt Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>

              {/* Biking Information */}
              <div className="form-group">
                <h3 className="section-title">Biking Information</h3>
                
                <div className="input-group">
                  <label htmlFor="bick_club_name">Biking Club Name *</label>
                  <input
                    type="text"
                    id="bick_club_name"
                    name="bick_club_name"
                    value={formData.bick_club_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your biking club name"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="bick_brand">Bike Brand & Model *</label>
                  <input
                    type="text"
                    id="bick_brand"
                    name="bick_brand"
                    value={formData.bick_brand}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Honda CBR 150R"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="b_group">Blood Group</label>
                  <select
                    id="b_group"
                    name="b_group"
                    value={formData.b_group}
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

                <div className="input-group">
                  <label htmlFor="contact_number">Contact Number *</label>
                  <input
                    type="tel"
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
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
                    <span className="number-value">01629253127</span>
                    <button 
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText('01629253127')}
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

            {/* Terms and Conditions */}
            <div className="terms-section">
              <h3 className="section-title">Terms and Conditions</h3>
              
              <div className="terms-list">
                <div className="term-item">
                  <input
                    type="checkbox"
                    id="clubRules"
                    name="clubRules"
                    checked={agreements.clubRules}
                    onChange={handleAgreementChange}
                    required
                  />
                  <label htmlFor="clubRules">
                    ✅ I agree to follow club rules and regulations.
                  </label>
                </div>
                
                <div className="term-item">
                  <input
                    type="checkbox"
                    id="safetyGear"
                    name="safetyGear"
                    checked={agreements.safetyGear}
                    onChange={handleAgreementChange}
                    required
                  />
                  <label htmlFor="safetyGear">
                    ✅ I will ensure safety gear during rides.
                  </label>
                </div>
                
                <div className="term-item">
                  <input
                    type="checkbox"
                    id="photoPermission"
                    name="photoPermission"
                    checked={agreements.photoPermission}
                    onChange={handleAgreementChange}
                    required
                  />
                  <label htmlFor="photoPermission">
                    ✅ I give permission to use my photos/videos for club events.
                  </label>
                </div>
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