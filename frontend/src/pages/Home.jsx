import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to MediConnect 🏥</h1>
        <p>Book appointments with top doctors quickly and easily.</p>
        {name && <p className="welcome-user">Hello, {name}! 👋</p>}
        <div className="hero-buttons">
          <button className="btn-hero" onClick={() => navigate("/doctors")}>
            Find Doctors
          </button>
          {!name && (
            <button className="btn-hero-outline" onClick={() => navigate("/register")}>
              Get Started
            </button>
          )}
        </div>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <span>🩺</span>
          <h3>Expert Doctors</h3>
          <p>Connect with qualified and experienced doctors across specializations.</p>
        </div>
        <div className="feature-card">
          <span>📅</span>
          <h3>Easy Booking</h3>
          <p>Book, reschedule or cancel appointments with just a few clicks.</p>
        </div>
        <div className="feature-card">
          <span>⚡</span>
          <h3>Fast & Simple</h3>
          <p>No waiting in queues. Get your appointment confirmed instantly.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;