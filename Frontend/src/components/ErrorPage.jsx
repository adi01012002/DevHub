// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../Styles/ErrorPage.css";

// const ErrorPage = () => {
//   const navigate = useNavigate();

//   const handleLoginRedirect = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="unauthorized-container">
//       <div className="unauthorized-card">
//         <h1 className="unauthorized-title">401 - Unauthorized</h1>
//         <p className="unauthorized-message">
//           You must be logged in to access this page.
//         </p>
//         <button className="btn btn-primary" onClick={handleLoginRedirect}>
//           Go to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ErrorPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ErrorPage.css'; // External CSS
import { FiLock, FiArrowRight, FiHome } from 'react-icons/fi';

const ErrorPage = ({ errorType = "auth" }) => {
  const navigate = useNavigate();
  
  // Different error messages based on error type
  const errorMessages = {
    auth: {
      title: "Access Restricted",
      message: "You need to be logged in to view this page.",
      icon: <FiLock className="error-icon" />,
    },
    notFound: {
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist.",
      icon: <FiLock className="error-icon" />,
    },
    generic: {
      title: "Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
      icon: <FiLock className="error-icon" />,
    }
  };

  const { title, message, icon } = errorMessages[errorType] || errorMessages.generic;

  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon-container">
          {icon}
        </div>
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        
        <div className="error-actions">
          <button 
            className="error-btn primary"
            onClick={() => navigate('/login')}
          >
            <FiArrowRight /> Go to Login
          </button>
          <button 
            className="error-btn secondary"
            onClick={() => navigate('/')}
          >
            <FiHome /> Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
