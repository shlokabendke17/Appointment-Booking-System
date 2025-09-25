import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Slider.css';

const Slider = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleGetBookingsClick = () => {
    if (isLoggedIn) {
      navigate('/features');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Ready to start your meeting in one simple click.</h1>
        <p>
          Start your free 1-month premium plan and make your meetings easy and effective. 
          Free Forever Plan also available.
        </p>
        <button className="cta-button" onClick={handleGetBookingsClick}>
          Get Bookings
        </button>
      </div>
      <div className="hero-image">
        <img src="public/imgs/girl.png" alt="Happy customer pointing" />
      </div>
    </div>
  );
};

export default Slider;