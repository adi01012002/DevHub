
// import React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// // import AuthContext from "../context/AuthContext";
// import "../Styles/Dashboard.css";
// import { fetchUser } from "../services/authService";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
  
//   // const { user, logout } = useContext(AuthContext); // Get user and logout from context
//   const navigate = useNavigate();
//   const { username } = useParams();
//   console.log(username)
//   console.log(user)
//   useEffect(() => {
//     const getUser = async () => {
//       if (!username) return;
//       try {
//         const data = await fetchUser(username);
//         console.log(data);
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         alert("Failed to load user.");
//       }
//     };

//     getUser();
//   }, [username]);

//   const handleLogout = () => {
//     // logout(); // Call context logout
//     navigate("/login"); // Redirect to login page
//   };

//   const handleGeneratePortfolio = () => {
//     navigate("/portfolio-form");
//   };

//   const handleShowPortfolio = () => {
//     console.log("fff")
//     console.log(user)
//     if (user && user.username) {
//       navigate(`/user/${user.username}`);
//     } else {
//       alert("User data not loaded yet or username missing. Please wait.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome, {user?.username || "User"}</h1>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={handleGeneratePortfolio}>Generate Portfolio</button>
//       <button onClick={handleShowPortfolio} >Show My Portfolio</button>
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Dashboard.css";
import { fetchUser } from "../services/authService";
import { FiUser, FiFileText, FiEye, FiLogOut, FiPlus, FiActivity, FiBarChart2 } from "react-icons/fi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      if (!username) return;
      try {
        const data = await fetchUser(username);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/error");
      }
    };

    getUser();
  }, [username]);

  const handleLogout = () => {
    localStorage.clear("token");
    localStorage.clear("user");
    navigate("/login");
  };

  const handleGeneratePortfolio = () => {
    navigate("/portfolio-form");
  };
  const handleAiAssistant = () => {
    navigate("/ai-assistant");
  };

  const handleShowPortfolio = () => {
    if (user && user.username) {
      navigate(`/user/${user.username}`);
    } else {
      alert("User data not loaded yet or username missing. Please wait.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, <span>{user?.username || "User"}</span></h1>
        <div className="dashboard-actions">
          <button className="btn btn-danger" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <img 
              src={user?.profileImage ||"../../asset/img.avif"} 
              alt="Profile" 
              className="user-avatar" 
            />
            <h3 className="user-name">{user?.name || "Anonymous User"}</h3>
            <p className="user-email">{user?.email || "user@example.com"}</p>
          </div>

          <ul className="sidebar-menu">
            <li>
              <button 
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
              >
                <FiBarChart2 className="icon" /> Overview
              </button>
            </li>
            <li>
              <button 
                className={activeTab === "portfolio" ? "active" : ""}
                onClick={() => setActiveTab("portfolio")}
              >
                <FiFileText className="icon" /> My Portfolio
              </button>
            </li>
            <li>
              <button 
                className={activeTab === "activity" ? "active" : ""}
                onClick={() => setActiveTab("activity")}
              >
                <FiActivity className="icon" /> Recent Activity
              </button>
            </li>
          </ul>
        </div>

        <div className="dashboard-main">
          {activeTab === "overview" && (
            <>
              <div className="portfolio-stats">
                <div className="stat-card">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Profile Views</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">85%</div>
                  <div className="stat-label">Profile Complete</div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h2 className="card-title">Quick Actions</h2>
                </div>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={handleGeneratePortfolio}>
                    <FiPlus /> Generate Portfolio
                  </button>
                  <button className="btn btn-secondary" onClick={handleShowPortfolio}>
                    <FiEye /> Show My Portfolio
                  </button>
                  <button className="btn btn-secondary" onClick={handleAiAssistant}>
                    <FiEye /> Ai Assistant
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "portfolio" && (
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">Portfolio Management</h2>
              </div>
              <p>Your portfolio content will appear here.</p>
              <button className="btn btn-primary" onClick={handleGeneratePortfolio}>
                <FiPlus /> Edit Portfolio
              </button>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
              </div>
              <div className="recent-activity">
                <div className="activity-item">
                  <div className="activity-icon">
                    <FiFileText />
                  </div>
                  <div className="activity-details">
                    <div className="activity-title">Updated your portfolio</div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <FiEye />
                  </div>
                  <div className="activity-details">
                    <div className="activity-title">Someone viewed your portfolio</div>
                    <div className="activity-time">1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;