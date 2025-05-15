// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createPortfolio } from "../services/portfolioService";
// import "../Styles/PortfolioForm.css";

// const PortfolioForm = () => {
//   const [portfolioData, setPortfolioData] = useState({
//     name: "",
//     education: "",
//     about: "",
//     skills: "",
//     projects: [{ title: "", description: "", link: "" }],
//     experiences: [{ company: "", role: "", duration: "", description: "" }],
//     certifications: [{ name: "", issuer: "", date: "", description: "" }],
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPortfolioData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Convert skills to array
//       const formattedPortfolioData = {
//         ...portfolioData,
//         skills: portfolioData.skills.split(",").map(s => s.trim()).filter(Boolean),
//       };
//       const portfolio = await createPortfolio(formattedPortfolioData);
//       const user = JSON.parse(localStorage.getItem("user"));
//       const username = user?.username;
//       if (portfolio && username) {
//         // Redirect to public portfolio page and show shareable link
//         navigate(`/user/${username}`);
//         setTimeout(() => {
//           const link = `${window.location.origin}/user/${username}`;
//           navigator.clipboard.writeText(link);
//           alert(`Shareable link copied to clipboard: ${link}`);
//         }, 500);
//       } else {
//         alert("Portfolio creation failed!");
//       }
//     } catch (error) {
//       alert("An error occurred while creating the portfolio.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="portfolio-form-container">
//       <form className="portfolio-form" onSubmit={handleSubmit}>
//         <h2>Create Your Portfolio</h2>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" name="name" value={portfolioData.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Education:</label>
//           <input type="text" name="education" value={portfolioData.education} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>About:</label>
//           <textarea name="about" value={portfolioData.about} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Skills (comma separated):</label>
//           <input type="text" name="skills" value={portfolioData.skills} onChange={handleChange} required />
//         </div>

//         {/* Projects Section */}
//         <div className="dynamic-section">
//           <div className="dynamic-section-title">Projects</div>
//           <div className="dynamic-list">
//             {portfolioData.projects.map((project, idx) => (
//               <div className="dynamic-card" key={idx}>
//                 <div className="input-group">
//                   <label htmlFor={`project-title-${idx}`}>Title:</label>
//                   <input
//                     id={`project-title-${idx}`}
//                     aria-label="Project Title"
//                     type="text"
//                     placeholder="Title"
//                     value={project.title}
//                     onChange={e => {
//                       const updated = [...portfolioData.projects];
//                       updated[idx].title = e.target.value;
//                       setPortfolioData({ ...portfolioData, projects: updated });
//                     }}
//                     required
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`project-description-${idx}`}>Description:</label>
//                   <input
//                     id={`project-description-${idx}`}
//                     aria-label="Project Description"
//                     type="text"
//                     placeholder="Description"
//                     value={project.description}
//                     onChange={e => {
//                       const updated = [...portfolioData.projects];
//                       updated[idx].description = e.target.value;
//                       setPortfolioData({ ...portfolioData, projects: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`project-link-${idx}`}>Project Link:</label>
//                   <input
//                     id={`project-link-${idx}`}
//                     aria-label="Project Link"
//                     type="text"
//                     placeholder="Project Link"
//                     value={project.link}
//                     onChange={e => {
//                       const updated = [...portfolioData.projects];
//                     updated[idx].link = e.target.value;
//                     setPortfolioData({ ...portfolioData, projects: updated });
//                   }}
//                 />
//                 <button type="button" className="remove-btn" onClick={() => {
//                 const updated = portfolioData.projects.filter((_, i) => i !== idx);
//                 setPortfolioData({ ...portfolioData, projects: updated });
//               }} disabled={portfolioData.projects.length === 1}>Remove</button>
//             </div>
//             </div>
//           ))}
//           <button type="button" onClick={() => setPortfolioData({ ...portfolioData, projects: [...portfolioData.projects, { title: "", description: "", link: "" }] })}>
//             Add Project
//           </button>
//         </div>
//         </div>

//         {/* Experiences Section */}
//         <div className="dynamic-section">
//           <div className="dynamic-section-title">Experiences</div>
//           <div className="dynamic-list">
//             {portfolioData.experiences.map((exp, idx) => (
//               <div className="dynamic-card" key={idx}>
//                 <div className="input-group">
//                   <label htmlFor={`exp-company-${idx}`}>Company:</label>
//                   <input
//                     id={`exp-company-${idx}`}
//                     aria-label="Company"
//                     type="text"
//                     placeholder="Company"
//                     value={exp.company}
//                     onChange={e => {
//                       const updated = [...portfolioData.experiences];
//                       updated[idx].company = e.target.value;
//                       setPortfolioData({ ...portfolioData, experiences: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`exp-role-${idx}`}>Role:</label>
//                   <input
//                     id={`exp-role-${idx}`}
//                     aria-label="Role"
//                     type="text"
//                     placeholder="Role"
//                     value={exp.role}
//                     onChange={e => {
//                       const updated = [...portfolioData.experiences];
//                       updated[idx].role = e.target.value;
//                       setPortfolioData({ ...portfolioData, experiences: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`exp-duration-${idx}`}>Duration:</label>
//                   <input
//                     id={`exp-duration-${idx}`}
//                     aria-label="Duration"
//                     type="text"
//                     placeholder="Duration"
//                     value={exp.duration}
//                     onChange={e => {
//                       const updated = [...portfolioData.experiences];
//                       updated[idx].duration = e.target.value;
//                       setPortfolioData({ ...portfolioData, experiences: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`exp-description-${idx}`}>Description:</label>
//                   <input
//                     id={`exp-description-${idx}`}
//                     aria-label="Experience Description"
//                     type="text"
//                     placeholder="Description"
//                     value={exp.description}
//                     onChange={e => {
//                       const updated = [...portfolioData.experiences];
//                       updated[idx].description = e.target.value;
//                       setPortfolioData({ ...portfolioData, experiences: updated });
//                     }}
//                   />
//                 </div>
//                 <button type="button" className="remove-btn" onClick={() => {
//                   const updated = portfolioData.experiences.filter((_, i) => i !== idx);
//                   setPortfolioData({ ...portfolioData, experiences: updated });
//                 }} disabled={portfolioData.experiences.length === 1}>Remove</button>
//               </div>
//             ))}
//           </div>
//           <button type="button" className="add-btn" onClick={() => setPortfolioData({ ...portfolioData, experiences: [...portfolioData.experiences, { company: "", role: "", duration: "", description: "" }] })}>
//             Add Experience
//           </button>
//         </div>

//         {/* Certifications Section */}
//         <div className="dynamic-section">
//           <div className="dynamic-section-title">Certifications</div>
//           <div className="dynamic-list">
//             {portfolioData.certifications.map((cert, idx) => (
//               <div className="dynamic-card" key={idx}>
//                 <div className="input-group">
//                   <label htmlFor={`cert-name-${idx}`}>Name:</label>
//                   <input
//                     id={`cert-name-${idx}`}
//                     aria-label="Certification Name"
//                     type="text"
//                     placeholder="Name"
//                     value={cert.name}
//                     onChange={e => {
//                       const updated = [...portfolioData.certifications];
//                       updated[idx].name = e.target.value;
//                       setPortfolioData({ ...portfolioData, certifications: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`cert-issuer-${idx}`}>Issuer:</label>
//                   <input
//                     id={`cert-issuer-${idx}`}
//                     aria-label="Certification Issuer"
//                     type="text"
//                     placeholder="Issuer"
//                     value={cert.issuer}
//                     onChange={e => {
//                       const updated = [...portfolioData.certifications];
//                       updated[idx].issuer = e.target.value;
//                       setPortfolioData({ ...portfolioData, certifications: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`cert-date-${idx}`}>Date:</label>
//                   <input
//                     id={`cert-date-${idx}`}
//                     aria-label="Certification Date"
//                     type="text"
//                     placeholder="Date"
//                     value={cert.date}
//                     onChange={e => {
//                       const updated = [...portfolioData.certifications];
//                       updated[idx].date = e.target.value;
//                       setPortfolioData({ ...portfolioData, certifications: updated });
//                     }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label htmlFor={`cert-description-${idx}`}>Description:</label>
//                   <input
//                     id={`cert-description-${idx}`}
//                     aria-label="Certification Description"
//                     type="text"
//                     placeholder="Description"
//                     value={cert.description}
//                     onChange={e => {
//                       const updated = [...portfolioData.certifications];
//                       updated[idx].description = e.target.value;
//                       setPortfolioData({ ...portfolioData, certifications: updated });
//                     }}
//                   />
//                 </div>
//                 <button type="button" className="remove-btn" onClick={() => {
//                   const updated = portfolioData.certifications.filter((_, i) => i !== idx);
//                   setPortfolioData({ ...portfolioData, certifications: updated });
//                 }} disabled={portfolioData.certifications.length === 1}>Remove</button>
//               </div>
//             ))}
//           </div>
//           <button type="button" className="add-btn" onClick={() => setPortfolioData({ ...portfolioData, certifications: [...portfolioData.certifications, { name: "", issuer: "", date: "", description: "" }] })}>
//             Add Certification
//           </button>
//         </div>

//         <button type="submit" className="submit-button">Create Portfolio</button>
//       </form>
//     </div>  
//     )
// }

// export default PortfolioForm;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortfolio } from "../services/portfolioService";
import "../Styles/PortfolioForm.css";

const PortfolioForm = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    education: "",
    about: "",
    skills: "",
    projects: [{ title: "", description: "", link: "" }],
    experiences: [{ company: "", role: "", duration: "", description: "" }],
    certifications: [{ name: "", issuer: "", date: "", description: "" }],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!portfolioData.name.trim()) newErrors.name = "Name is required";
    if (!portfolioData.education.trim()) newErrors.education = "Education is required";
    if (!portfolioData.about.trim()) newErrors.about = "About section is required";
    if (!portfolioData.skills.trim()) newErrors.skills = "At least one skill is required";
    
    portfolioData.projects.forEach((project, index) => {
      if (!project.title.trim()) newErrors[`project-title-${index}`] = "Project title is required";
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const formattedPortfolioData = {
        ...portfolioData,
        skills: portfolioData.skills.split(",").map(s => s.trim()).filter(Boolean),
      };
      const portfolio = await createPortfolio(formattedPortfolioData);
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user?.username;
      
      if (portfolio && username) {
        navigate(`/user/${username}`);
        setTimeout(() => {
          const link = `${window.location.origin}/user/${username}`;
          navigator.clipboard.writeText(link);
          alert(`Portfolio created successfully! Shareable link copied to clipboard: ${link}`);
        }, 500);
      } else {
        alert("Portfolio creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Portfolio creation error:", error);
      alert("An error occurred while creating the portfolio. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portfolio-form-container">
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <h2>Create Your Portfolio</h2>
        
        {/* Basic Information Section */}
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={portfolioData.name} 
              onChange={handleChange} 
              required 
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="education">Education:</label>
            <input 
              type="text" 
              id="education"
              name="education" 
              value={portfolioData.education} 
              onChange={handleChange} 
              required 
              aria-describedby={errors.education ? "education-error" : undefined}
            />
            {errors.education && <span id="education-error" className="error-message">{errors.education}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="about">About:</label>
            <textarea 
              id="about"
              name="about" 
              value={portfolioData.about} 
              onChange={handleChange} 
              required 
              aria-describedby={errors.about ? "about-error" : undefined}
            />
            {errors.about && <span id="about-error" className="error-message">{errors.about}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated):</label>
            <input 
              type="text" 
              id="skills"
              name="skills" 
              value={portfolioData.skills} 
              onChange={handleChange} 
              required 
              placeholder="e.g., JavaScript, React, Node.js"
              aria-describedby={errors.skills ? "skills-error" : undefined}
            />
            {errors.skills && <span id="skills-error" className="error-message">{errors.skills}</span>}
          </div>
        </div>

        {/* Projects Section */}
        <div className="form-section">
          <h3 className="section-title">Projects</h3>
          <div className="dynamic-list">
            {portfolioData.projects.map((project, idx) => (
              <div className="dynamic-card" key={idx}>
                <div className="input-group">
                  <label htmlFor={`project-title-${idx}`}>Title:</label>
                  <input
                    id={`project-title-${idx}`}
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      const updated = [...portfolioData.projects];
                      updated[idx].title = e.target.value;
                      setPortfolioData({ ...portfolioData, projects: updated });
                    }}
                    required
                    aria-describedby={errors[`project-title-${idx}`] ? `project-title-error-${idx}` : undefined}
                  />
                  {errors[`project-title-${idx}`] && (
                    <span id={`project-title-error-${idx}`} className="error-message">
                      {errors[`project-title-${idx}`]}
                    </span>
                  )}
                </div>
                
                <div className="input-group">
                  <label htmlFor={`project-description-${idx}`}>Description:</label>
                  <textarea
                    id={`project-description-${idx}`}
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => {
                      const updated = [...portfolioData.projects];
                      updated[idx].description = e.target.value;
                      setPortfolioData({ ...portfolioData, projects: updated });
                    }}
                    rows={3}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`project-link-${idx}`}>Project Link:</label>
                  <input
                    id={`project-link-${idx}`}
                    type="url"
                    placeholder="https://example.com"
                    value={project.link}
                    onChange={(e) => {
                      const updated = [...portfolioData.projects];
                      updated[idx].link = e.target.value;
                      setPortfolioData({ ...portfolioData, projects: updated });
                    }}
                  />
                </div>
                
                {portfolioData.projects.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const updated = portfolioData.projects.filter((_, i) => i !== idx);
                      setPortfolioData({ ...portfolioData, projects: updated });
                    }}
                    aria-label={`Remove project ${idx + 1}`}
                  >
                    Remove Project
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            className="add-btn"
            onClick={() => setPortfolioData({
              ...portfolioData,
              projects: [...portfolioData.projects, { title: "", description: "", link: "" }]
            })}
          >
            Add Project
          </button>
        </div>

        {/* Experiences Section */}
        <div className="form-section">
          <h3 className="section-title">Work Experience</h3>
          <div className="dynamic-list">
            {portfolioData.experiences.map((exp, idx) => (
              <div className="dynamic-card" key={idx}>
                <div className="input-group">
                  <label htmlFor={`exp-company-${idx}`}>Company:</label>
                  <input
                    id={`exp-company-${idx}`}
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...portfolioData.experiences];
                      updated[idx].company = e.target.value;
                      setPortfolioData({ ...portfolioData, experiences: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`exp-role-${idx}`}>Role:</label>
                  <input
                    id={`exp-role-${idx}`}
                    type="text"
                    placeholder="Your Position"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...portfolioData.experiences];
                      updated[idx].role = e.target.value;
                      setPortfolioData({ ...portfolioData, experiences: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`exp-duration-${idx}`}>Duration:</label>
                  <input
                    id={`exp-duration-${idx}`}
                    type="text"
                    placeholder="MM/YYYY - MM/YYYY"
                    value={exp.duration}
                    onChange={(e) => {
                      const updated = [...portfolioData.experiences];
                      updated[idx].duration = e.target.value;
                      setPortfolioData({ ...portfolioData, experiences: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`exp-description-${idx}`}>Description:</label>
                  <textarea
                    id={`exp-description-${idx}`}
                    placeholder="Your responsibilities and achievements"
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...portfolioData.experiences];
                      updated[idx].description = e.target.value;
                      setPortfolioData({ ...portfolioData, experiences: updated });
                    }}
                    rows={3}
                  />
                </div>
                
                {portfolioData.experiences.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const updated = portfolioData.experiences.filter((_, i) => i !== idx);
                      setPortfolioData({ ...portfolioData, experiences: updated });
                    }}
                    aria-label={`Remove experience ${idx + 1}`}
                  >
                    Remove Experience
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            className="add-btn"
            onClick={() => setPortfolioData({
              ...portfolioData,
              experiences: [...portfolioData.experiences, { company: "", role: "", duration: "", description: "" }]
            })}
          >
            Add Experience
          </button>
        </div>

        {/* Certifications Section */}
        <div className="form-section">
          <h3 className="section-title">Certifications</h3>
          <div className="dynamic-list">
            {portfolioData.certifications.map((cert, idx) => (
              <div className="dynamic-card" key={idx}>
                <div className="input-group">
                  <label htmlFor={`cert-name-${idx}`}>Name:</label>
                  <input
                    id={`cert-name-${idx}`}
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...portfolioData.certifications];
                      updated[idx].name = e.target.value;
                      setPortfolioData({ ...portfolioData, certifications: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`cert-issuer-${idx}`}>Issuer:</label>
                  <input
                    id={`cert-issuer-${idx}`}
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => {
                      const updated = [...portfolioData.certifications];
                      updated[idx].issuer = e.target.value;
                      setPortfolioData({ ...portfolioData, certifications: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`cert-date-${idx}`}>Date:</label>
                  <input
                    id={`cert-date-${idx}`}
                    type="text"
                    placeholder="MM/YYYY"
                    value={cert.date}
                    onChange={(e) => {
                      const updated = [...portfolioData.certifications];
                      updated[idx].date = e.target.value;
                      setPortfolioData({ ...portfolioData, certifications: updated });
                    }}
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor={`cert-description-${idx}`}>Description:</label>
                  <textarea
                    id={`cert-description-${idx}`}
                    placeholder="Certification details"
                    value={cert.description}
                    onChange={(e) => {
                      const updated = [...portfolioData.certifications];
                      updated[idx].description = e.target.value;
                      setPortfolioData({ ...portfolioData, certifications: updated });
                    }}
                    rows={2}
                  />
                </div>
                
                {portfolioData.certifications.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const updated = portfolioData.certifications.filter((_, i) => i !== idx);
                      setPortfolioData({ ...portfolioData, certifications: updated });
                    }}
                    aria-label={`Remove certification ${idx + 1}`}
                  >
                    Remove Certification
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            className="add-btn"
            onClick={() => setPortfolioData({
              ...portfolioData,
              certifications: [...portfolioData.certifications, { name: "", issuer: "", date: "", description: "" }]
            })}
          >
            Add Certification
          </button>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;