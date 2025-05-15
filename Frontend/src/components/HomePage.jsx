import React from "react";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

// const HomePage = () => {
//   return (
//     <div className="homepage-container">
//       <h1 className="homepage-title">Welcome to Our App</h1>
//       <p className="homepage-text">Please log in or register to continue.</p>
//       <div className="homepage-buttons">
//         <Link to="/login">
//           <button>Login</button>
//         </Link>
//         <Link to="/register">
//           <button>Register</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-title">Build Your Professional Portfolio in Minutes</h1>
        <p className="homepage-text">
          Create, customize, and share your dynamic portfolio with the world. 
          Our AI-powered tools help you craft the perfect professional showcase.
        </p>
        
        <div className="homepage-buttons">
          <Link to="/login">
            <button>Get Started</button>
          </Link>
          <Link to="/register">
            <button>See Examples</button>
          </Link>
        </div>
        
        <div className="homepage-features">
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3 className="feature-title">AI-Powered Descriptions</h3>
            <p className="feature-description">
              Let our AI craft perfect job descriptions and project summaries.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3 className="feature-title">Shareable Link</h3>
            <p className="feature-description">
              Get a personalized URL to share your portfolio with employers.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">Custom Designs</h3>
            <p className="feature-description">
              Choose from multiple professional templates that fit your style.
            </p>
          </div>
        </div>
        
        <div className="homepage-cta">
          <p className="cta-text">
            Ready to showcase your professional journey?
          </p>
          <Link to="/register">
            <button className="cta-button">Create Your Portfolio Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;