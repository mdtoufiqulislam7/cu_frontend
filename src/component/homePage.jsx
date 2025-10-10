import React from 'react'
import './homePage.css'
import { Navigate, useNavigate } from 'react-router-dom'

function homePage() {

  const navigate = useNavigate()

  const gotofrom =()=>{
    navigate('/from')
  }



  return (
    <div>
      {/* Banner Section */}
      <div className="banner-container">
        {/* Background Image with Overlay */}
        <div className="banner-background">
          <img 
            src="https://pfp.acsfutureschool.com/1760115479538_vmfrl0a5_bg.jpg" 
            alt="Adventure Camp Background" 
            className="background-image"
            onLoad={() => console.log('Banner image loaded successfully!')}
            onError={(e) => {
              console.log('Image failed to load:', e.target.src);
              console.log('Error details:', e);
              e.target.style.display = 'none';
            }}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2
            }}
          />
          <div className="banner-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="banner-content">
          {/* Top Left Text */}
          <div className="top-left-text">
            <div className="date-text">NOVEMBER 14-15, 2025</div>
            <div className="virtual-run-text">ADVENTURE CAMP</div>
          </div>
          
          {/* Main Title */}
          <div className="main-title-container">
            <div className="title-bar"></div>
            <h1 className="main-title">
              <span className="title-cumilla">Burnerz </span>
              <span className="title-15k">Adventure </span>
              <span className="title-run">Camp 2025</span>
            </h1>
          </div>
          
          {/* Tagline */}
          <div className="tagline">Road Burnerz Club , Cumilla</div>
          
          {/* Register Button */}
          <button onClick={gotofrom} className="register-button">
            REGISTER NOW →
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="about-container">
        {/* Background Image */}
        <div className="about-background">
          <div className="about-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="about-content">
          {/* Header */}
          <div className="about-header">
            <h1 className="about-title">ABOUT BURNERZ ADVENTURE CAMP</h1>
            <div className="about-subtitle">Road Burnerz Club, Cumilla</div>
          </div>
          
          {/* Main Content */}
          <div className="about-main">
            {/* About Card */}
            <div className="about-card">
              <div className="card-image">
                <img src="https://pfp.acsfutureschool.com/1760038353629_o3nmhjgx_camp3.jpg" alt="Burnerz Adventure Camp" />
              </div>
              <div className="card-content">
                <h2 className="card-title">About Burnerz Adventure Camp</h2>
                <p className="card-text">
                Welcome to Burnerz Adventure Camp — a place full of fun, nature, and energy! Enjoy hill trips, camping under the stars, games, music, and dance with your friends.We believe in teamwork, joy, and adventure. Every moment here is made for fun and happy memories!
                </p>
              </div>
            </div>
            
            {/* Fee Section */}
            <div className="fee-section">
              <div className="fee-header">
                <div className="popular-tag">POPULAR</div>
                <h2 className="fee-title">ADVENTURE CAMP FEE</h2>
              </div>
              
              <div className="fee-content">
                <div className="price-display">
                  <span className="currency">৳</span>
                  <span className="price">1250</span>
                </div>
                <p className="price-note">Taka Only (Without Transportation)</p>
                
                <div className="fee-details">
                  <h3 className="category-title">General Category (14 yrs and above)</h3>
                  <p className="category-description">
                    General category consists of all classes of adventurers. 
                    <strong>Professionally trained adventurers, outdoor enthusiasts from different organizations/clubs, students, 
                    working men and women are entitled to participate in this category.</strong>
                  </p>
                </div>
                
                <div className="event-metrics">
                  <div className="metric-item">
                    <span className="metric-icon">🏕️</span>
                    <span className="metric-text">Duration: 2 Days</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-icon">👥</span>
                    <span className="metric-text">Slots: 300 Only</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-icon">📍</span>
                    <span className="metric-text">Location: Moynamoti Adventure Camp</span>
                  </div>
                </div>
                
                <button onClick={gotofrom} className="book-slot-btn">Registation Now</button>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="benefits-section">
              <h2 className="benefits-title">WHAT'S INCLUDED IN YOUR PACKAGE</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">👕</div>
                  <h3>T-Shirt</h3>
                  <p>Premium quality branded t-shirt</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎮</div>
                  <h3>Game Access</h3>
                  <p>Full access to all outdoor games and activities</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎟️</div>
                  <h3>Raffle Draw</h3>
                  <p>Participate in exciting raffle draws with amazing prizes</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🍽️</div>
                  <h3>Meals Included</h3>
                  <p>Snacks, dinner, and breakfast provided</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🏕️</div>
                  <h3>Tent Experience</h3>
                  <p>Authentic camping experience with tent and campfire</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎁</div>
                  <h3>Gifts & Accessories</h3>
                  <p>Special gifts and camping accessories</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎵</div>
                  <h3>DJ Party</h3>
                  <p>Live DJ performance and night show entertainment</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔥</div>
                  <h3>Campfire Experience</h3>
                  <p>Memorable campfire sessions with stories and songs</p>
                </div>
              </div>
            </div>
            
            <div className="about-section">
              <h2 className="section-title">EVENT DETAILS</h2>
              <div className="event-info">
                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">November 14-15, 2025</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location:</span>
                  <span className="info-value">Moynamoti Adventure Camp, Kotbari, Cumilla</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">2 Days Adventure Camp</span>
                </div>
              </div>
            </div>
            
            <div className="about-section">
              <h2 className="section-title">JOIN US</h2>
              <p className="section-text">
                Whether you're a seasoned adventurer or new to camping, Burnerz Adventure Camp 
                welcomes everyone! Come join us for an unforgettable experience filled with 
                adventure, friendship, and memories that will last a lifetime.
              </p>
              <button onClick={gotofrom} className="register-btn">REGISTER NOW</button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="about-footer">
            <div className="footer-content">
              <div className="club-info">
                <h3>ROAD BURNERZ CLUB</h3>
                <p>Established 2020</p>
              </div>
              <div className="social-info">
                <p>Facebook: Road Burnarz Cumilla</p>
              </div>
              <div className="season-info">
                <h3>BURNERZ ADVENTURE CAMP</h3>
                <p>Season 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage