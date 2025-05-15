

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // import AuthContext from "../context/AuthContext";
// import { registerUser } from "../services/authService";
// import "../Styles/RegisterForm.css";

// const RegisterPage = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   // const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await registerUser({ username, email, password });
//       // login(userData);
//       alert("Registration successful!");
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form className="register-form" onSubmit={handleRegister}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="submit-button">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../Styles/RegisterForm.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    
    try {
      await registerUser(formData);
      navigate("/login", { state: { registrationSuccess: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (formData.password.length === 0) return "";
    if (formData.password.length < 6) return "weak";
    if (formData.password.length < 10) return "medium";
    return "strong";
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Your Account</h2>
          <p>Start building your professional portfolio today</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            {formData.password && (
              <div className={`password-strength ${getPasswordStrength()}`}>
                Password strength: {getPasswordStrength()}
              </div>
            )}
          </div>

          <div className="terms-agreement">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : (
              <>
                <FiArrowRight /> Register Now
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;