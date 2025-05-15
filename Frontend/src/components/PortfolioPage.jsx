// import { useEffect, useState } from "react";
// // import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { fetchPublicPortfolioByUsername } from "../services/portfolioService";
// // import AuthContext from "../context/AuthContext";
// import "../Styles/PortfolioPage.css";

// const PortfolioPage = () => {
//   const [portfolio, setPortfolio] = useState(null);
//   // const { user } = useContext(AuthContext);
//   //const { id } = useParams(); // Fetches the ID from the URL
//   const { username } = useParams(); 
//   // const userId = id;
//   console.log(username)

//   useEffect(() => {
//     const getPortfolio = async () => {
//       if (!username) return;
//       try {
//         const data = await fetchPublicPortfolioByUsername(username);
//         console.log(data)
//         setPortfolio(data);
//       } catch (error) {
//         console.error("Error fetching portfolio:", error);
//         alert("Failed to load portfolio.");
//       }
//     };

//     getPortfolio();
//   }, [username]);

//   const handleShareLink = () => {
//     const link = `${window.location.origin}/user/${username}`;
//     navigator.clipboard.writeText(link);
//     alert(`Shareable link copied to clipboard: ${link}`);
//   };

//   if (!portfolio) return <p className="loading">Loading...</p>;

//   return (
//     <div className="portfolio-container">
//       <h1>{portfolio.name}&apos;s Portfolio</h1>
//       <p><strong>Profession:</strong> {portfolio.profession}</p>
//       <p><strong>About:</strong> {portfolio.about}</p>
//       <div><strong>Skills:</strong>
//         <ul>
//           {Array.isArray(portfolio.skills) ? portfolio.skills.map((skill, idx) => (
//             <li key={idx}>{skill}</li>
//           )) : portfolio.skills}
//         </ul>
//       </div>
//       <div><strong>Projects:</strong>
//         <ul className="portfolio-list">
//           {Array.isArray(portfolio.projects) && portfolio.projects.length > 0 ? portfolio.projects.map((project, idx) => (
//             <li className="portfolio-card" key={project._id || idx}>
//               <div><strong>Title:</strong> {project.title}</div>
//               <div><strong>Description:</strong> {project.description}</div>
//               {project.link && <div><strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></div>}
//             </li>
//           )) : <li>No projects listed.</li>}
//         </ul>
//       </div>
//       {portfolio.experiences && (
//         <div><strong>Experiences:</strong>
//           <ul className="portfolio-list">
//             {Array.isArray(portfolio.experiences) && portfolio.experiences.length > 0 ? portfolio.experiences.map((exp, idx) => (
//               <li className="portfolio-card" key={exp._id || idx}>
//                 <div><strong>Company:</strong> {exp.company}</div>
//                 <div><strong>Role:</strong> {exp.role}</div>
//                 <div><strong>Duration:</strong> {exp.duration}</div>
//                 <div><strong>Description:</strong> {exp.description}</div>
//               </li>
//             )) : <li>No experiences listed.</li>}
//           </ul>
//         </div>
//       )}
//       {portfolio.certifications && (
//         <div><strong>Certifications:</strong>
//           <ul className="portfolio-list">
//             {Array.isArray(portfolio.certifications) && portfolio.certifications.length > 0 ? portfolio.certifications.map((cert, idx) => (
//               <li className="portfolio-card" key={cert._id || idx}>
//                 <div><strong>Name:</strong> {cert.name}</div>
//                 <div><strong>Issuer:</strong> {cert.issuer}</div>
//                 <div><strong>Date:</strong> {cert.date}</div>
//                 <div><strong>Description:</strong> {cert.description}</div>
//               </li>
//             )) : <li>No certifications listed.</li>}
//           </ul>
//         </div>
//       )}
//       <button onClick={handleShareLink}>Generate Shareable Link</button>
//     </div>
//   );
// };

// export default PortfolioPage;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchPublicPortfolioByUsername } from "../services/portfolioService";
// import "../Styles/PortfolioPage.css";

// const PortfolioPage = () => {
//   const [portfolio, setPortfolio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { username } = useParams();

//   useEffect(() => {
//     const getPortfolio = async () => {
//       if (!username) return;
//       try {
//         setLoading(true);
//         const data = await fetchPublicPortfolioByUsername(username);
//         setPortfolio(data);
//       } catch (error) {
//         console.error("Error fetching portfolio:", error);
//         setError("Failed to load portfolio. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPortfolio();
//   }, [username]);

//   const handleShareLink = () => {
//     const link = `${window.location.origin}/user/${username}`;
//     navigator.clipboard.writeText(link).then(() => {
//       alert(`Portfolio link copied to clipboard!\n${link}`);
//     }).catch(err => {
//       console.error("Failed to copy:", err);
//       prompt("Copy this link:", link);
//     });
//   };

//   if (loading) return (
//     <div className="loading-container">
//       <div className="loading-spinner"></div>
//       <p>Loading portfolio...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="error-container">
//       <p className="error-message">{error}</p>
//       <button onClick={() => window.location.reload()}>Try Again</button>
//     </div>
//   );

//   if (!portfolio) return (
//     <div className="not-found">
//       <p>No portfolio found for {username}</p>
//     </div>
//   );

//   return (
//     <div className="portfolio-container">
//       <header className="portfolio-header">
//         <div className="profile-section">
//           <h1>{portfolio.name}'s Portfolio</h1>
//           {portfolio.profession && (
//             <p className="profession">{portfolio.profession}</p>
//           )}
//         </div>
//         <button 
//           onClick={handleShareLink}
//           className="share-button"
//           aria-label="Share portfolio link"
//         >
//           <span className="button-icon">🔗</span> Share Portfolio
//         </button>
//       </header>

//       <section className="portfolio-section about-section">
//         <h2>About Me</h2>
//         <p className="about-content">{portfolio.about}</p>
//       </section>

//       {portfolio.skills && portfolio.skills.length > 0 && (
//         <section className="portfolio-section skills-section">
//           <h2>Skills</h2>
//           <div className="skills-container">
//             {Array.isArray(portfolio.skills) ? (
//               portfolio.skills.map((skill, idx) => (
//                 <span key={idx} className="skill-tag">{skill}</span>
//               ))
//             ) : (
//               <span className="skill-tag">{portfolio.skills}</span>
//             )}
//           </div>
//         </section>
//       )}

//       {portfolio.projects && portfolio.projects.length > 0 && (
//         <section className="portfolio-section projects-section">
//           <h2>Projects</h2>
//           <div className="cards-container">
//             {portfolio.projects.map((project, idx) => (
//               <div className="portfolio-card" key={project._id || idx}>
//                 <h3 className="card-title">{project.title}</h3>
//                 {project.description && (
//                   <p className="card-description">{project.description}</p>
//                 )}
//                 {project.link && (
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="card-link"
//                   >
//                     View Project
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {portfolio.experiences && portfolio.experiences.length > 0 && (
//         <section className="portfolio-section experiences-section">
//           <h2>Experience</h2>
//           <div className="cards-container">
//             {portfolio.experiences.map((exp, idx) => (
//               <div className="portfolio-card" key={exp._id || idx}>
//                 <h3 className="card-title">{exp.role}</h3>
//                 <p className="card-subtitle">{exp.company}</p>
//                 {exp.duration && (
//                   <p className="card-duration">{exp.duration}</p>
//                 )}
//                 {exp.description && (
//                   <p className="card-description">{exp.description}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {portfolio.certifications && portfolio.certifications.length > 0 && (
//         <section className="portfolio-section certifications-section">
//           <h2>Certifications</h2>
//           <div className="cards-container">
//             {portfolio.certifications.map((cert, idx) => (
//               <div className="portfolio-card" key={cert._id || idx}>
//                 <h3 className="card-title">{cert.name}</h3>
//                 <p className="card-subtitle">{cert.issuer}</p>
//                 {cert.date && (
//                   <p className="card-duration">Issued: {cert.date}</p>
//                 )}
//                 {cert.description && (
//                   <p className="card-description">{cert.description}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default PortfolioPage;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicPortfolioByUsername } from "../services/portfolioService";
import "../Styles/PortfolioPage.css";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const { username } = useParams();

  useEffect(() => {
    const getPortfolio = async () => {
      if (!username) return;
      try {
        setLoading(true);
        const data = await fetchPublicPortfolioByUsername(username);
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError("Failed to load portfolio. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getPortfolio();
  }, [username]);

  const handleShareLink = () => {
    const link = `${window.location.origin}/user/${username}`;
    navigator.clipboard.writeText(link).then(() => {
      alert(`Portfolio link copied to clipboard!\n${link}`);
    }).catch(err => {
      console.error("Failed to copy:", err);
      prompt("Copy this link:", link);
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading portfolio...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  if (!portfolio) return (
    <div className="not-found">
      <p>No portfolio found for {username}</p>
    </div>
  );

  return (
    <div className="portfolio-app">
     {/* Navigation */}
     <nav className="portfolio-nav">
        <ul>
          <li className={activeSection === "about" ? "active" : ""}>
            <button onClick={() => scrollToSection("about")}>About</button>
          </li>
          <li className={activeSection === "skills" ? "active" : ""}>
            <button onClick={() => scrollToSection("skills")}>Skills</button>
          </li>
          <li className={activeSection === "projects" ? "active" : ""}>
            <button onClick={() => scrollToSection("projects")}>Projects</button>
          </li>
          <li className={activeSection === "experience" ? "active" : ""}>
            <button onClick={() => scrollToSection("experience")}>Experience</button>
          </li>
          <li className={activeSection === "certifications" ? "active" : ""}>
            <button onClick={() => scrollToSection("certifications")}>Certifications</button>
          </li>
        </ul>
      </nav>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>{portfolio.name}</h1>
          <p className="profession">{portfolio.profession || "Professional"}</p>
          <p className="hero-description">{portfolio.about || "Welcome to my professional portfolio"}</p>
          <button 
            onClick={handleShareLink}
            className="share-button"
            aria-label="Share portfolio link"
          >
            <span className="button-icon">🔗</span> Share Portfolio
          </button>
        </div>
      </header>

     

      <main className="portfolio-content">
        {/* About Section */}
        <section id="about" className="portfolio-section about-section">
          <div className="section-container">
            <h2>About Me</h2>
            <div className="about-content">
              <p>{portfolio.about || "No about information available."}</p>
              {portfolio.education && (
                <div className="education">
                  <h3>Education</h3>
                  <p>{portfolio.education}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section id="skills" className="portfolio-section skills-section">
            <div className="section-container">
              <h2>Skills & Expertise</h2>
              <div className="skills-container">
                {Array.isArray(portfolio.skills) ? (
                  portfolio.skills.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <span className="skill-tag">{skill}</span>
                    </div>
                  ))
                ) : (
                  <div className="skill-item">
                    <span className="skill-tag">{portfolio.skills}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section id="projects" className="portfolio-section projects-section">
            <div className="section-container">
              <h2>Featured Projects</h2>
              <div className="projects-grid">
                {portfolio.projects.map((project, idx) => (
                  <div className="project-card" key={project._id || idx}>
                    <h3>{project.title}</h3>
                    {project.description && (
                      <p className="project-description">{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experiences && portfolio.experiences.length > 0 && (
          <section id="experience" className="portfolio-section experience-section">
            <div className="section-container">
              <h2>Professional Experience</h2>
              <div className="timeline">
                {portfolio.experiences.map((exp, idx) => (
                  <div className="timeline-item" key={exp._id || idx}>
                    <div className="timeline-content">
                      <h3>{exp.role}</h3>
                      <h4>{exp.company}</h4>
                      {exp.duration && (
                        <p className="timeline-date">{exp.duration}</p>
                      )}
                      {exp.description && (
                        <p className="timeline-description">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {portfolio.certifications && portfolio.certifications.length > 0 && (
          <section id="certifications" className="portfolio-section certifications-section">
            <div className="section-container">
              <h2>Certifications</h2>
              <div className="certifications-grid">
                {portfolio.certifications.map((cert, idx) => (
                  <div className="certification-card" key={cert._id || idx}>
                    <h3>{cert.name}</h3>
                    <p className="issuer">{cert.issuer}</p>
                    {cert.date && <p className="date">Issued: {cert.date}</p>}
                    {cert.description && (
                      <p className="description">{cert.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} {portfolio.name}'s Portfolio</p>
          <button 
            onClick={handleShareLink}
            className="footer-share-button"
            aria-label="Share portfolio link"
          >
            <span className="button-icon">🔗</span> Share
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;