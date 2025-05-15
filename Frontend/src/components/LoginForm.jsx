// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // import AuthContext from "../context/AuthContext";
// import { loginUser } from "../services/authService";
// import "../Styles/LoginForm.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   // const { login } = useContext(AuthContext); // Ensure AuthContext provides the `login` function
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const userData = await loginUser({ email, password }); // Ensure `loginUser` is a valid API function
//       // setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));
//       navigate(`/dashboard/${userData.username}`); // Redirect to the dashboard with the user ID
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form className="login-form" onSubmit={handleLogin}>
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
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "../Styles/LoginForm.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const userData = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(`/dashboard/${userData.username}`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to access your portfolio dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : (
              <>
                <FiLogIn /> Login
              </>
            )}
          </button>
        </form>

        <div className="social-divider">or continue with</div>

        <div className="social-login">
          <button className="social-btn">
            <FcGoogle /> Google
          </button>
          <button className="social-btn">
            <FaGithub /> GitHub
          </button>
        </div>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;