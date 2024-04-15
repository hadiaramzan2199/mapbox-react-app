import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faChevronCircleDown, faGlobe, faEnvelope, faPhone, faEye, faPlane, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginForm from './LoginForm';
import "./ProjectList.css";

const Popup = ({ project }) => {
  // Split project categories by newline characters and remove empty strings
  const projectCategories = project.projectCategory.split("\n").filter(category => category.trim()!== "");

  // Define an array of background colors for each category
  const categoryColors = [
    "#ff9999",
    "#99ccff",
    "#cc99ff",
    "#99ff99",
    "#ffff99",
    "#ffcc99",
    "#ff99ff",
    "#99ffff",
    "#ffcc00",
    "#ff6666",
    "#66cc99",
    "#cc66ff"
  ];

  // Split current tenant logos by newline characters and remove empty strings
  const currentTenants = project.currentTenantLogos.split("\n").filter(tenant => tenant.trim()!== "");

  // State to control the visibility of additional content
  const [expanded, setExpanded] = useState(false);

  // State to control the visibility of the login form container
  const [showLoginFormContainer, setShowLoginFormContainer] = useState(false);

  const randomKilometers = Math.floor(Math.random() * 100) + 1;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev"></button>,
    nextArrow: <button className="slick-next"></button>,
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#c1886e", margin: 0 }}>{project.propertyName}</h2>
        <div style={{ backgroundColor: "#f5f5f5", padding: "5px", borderRadius: "20px", display: "inline-block" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "black", marginRight: "5px" }} />
            <span onClick={() => setShowLoginFormContainer(!showLoginFormContainer)} style={{cursor:"pointer"}}>More Information</span>
          </div>
        </div>
      </div>
      <p style={{ color: "#c1886e", fontWeight: "bold" }}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "black", marginRight: "5px", cursor: "pointer" }} />{project.location}
      </p>
      <p style={{ color: "#c1886e", fontWeight: "bold" }}>
        <FontAwesomeIcon icon={faPlane} style={{ color: "black", marginRight: "5px", cursor: "pointer" }} />{randomKilometers} Km
      </p>
      {project.projectPictures && project.projectPictures.split("\n").filter(pic => pic.trim()).length > 1 && (
            <Slider {...settings}>
              {project.projectPictures
                .split("\n")
                .filter((pic) => pic.trim())
                .map((pic, picIndex) => (
                  <div key={picIndex}>
                    <img
                      src={pic.trim()}
                      alt={`Project Picture${picIndex + 1}`}
                      style={{ width: "300px", height: "150px" }}
                    />
                  </div>
                ))}
            </Slider>
          )}
          {project.projectPictures && project.projectPictures.split("\n").filter(pic => pic.trim()).length === 1 && (
            <img
              src={project.projectPictures.split("\n").filter(pic => pic.trim())[0].trim()}
              alt="Project Picture"
              style={{ width: "300px", height: "150px" }}
            />
          )}
      <p style={{ color: "grey", fontWeight: "bold" }}>Total Available Space For Lease: <span style={{ color: "black" }}>{project.gla} Sqm</span></p>
      <p style={{ color: "grey", fontWeight: "bold" }}>Occupancy: <span style={{ color: "black" }}>{project.occupancyRateClassification}</span> <FontAwesomeIcon icon={faChevronCircleDown} style={{ cursor: "pointer", marginLeft: "70px", fontSize:"20px", color:"#c1886e", transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} onClick={() => setExpanded(!expanded)} /></p>

      {/* Additional content */}
      {expanded && (
        <>
          {/* Project Occupied Categories */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Project Occupied Categories</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {projectCategories.map((category, index) => (
                <div key={index} style={{ backgroundColor: categoryColors[index % categoryColors.length], color: "black", padding: "5px", margin: "5px", borderRadius: "5px" }}>
                  {category.trim()}
                </div>
              ))}
            </div>
          </div>

          {/* Current Leased Tenants */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Current Leased Tenants</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {currentTenants.map((tenant, index) => (
                <img key={index} src={tenant.trim()} alt={`Tenant ${index}`} style={{ width: "50px", height: "30px", margin: "5px" }} />
              ))}
            </div>
          </div>
        </>
      )}
      {/* Separator Line */}
      <hr style={{ marginTop: "10px", marginBottom: "20px", border: "1px solid #c1886e" }} />

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ backgroundColor: "#f5f5f5", color: "grey", padding: "10px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize:"12px", fontWeight:"bold", marginRight:"5px" }}>Request Proposal</button>
        <button style={{ backgroundColor: "#f5f5f5", color: "grey", padding: "10px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize:"12px", fontWeight:"bold"}}>Let Us Find You Requirements of Project Location</button>
      </div>

      {/* Logo, Icons, and Eye Icon */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
        <img src="./logo.png" alt="Logo" style={{ width: "70px", height: "40px", marginRight: "25px" }} />
        <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "20px", color: "#333", marginRight: "25px", cursor:"pointer" }} onClick={() => (window.location.href = "https://yourwebsite.com")}/>
        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "20px", color: "#333", marginRight: "25px", cursor:"pointer" }} />
        <FontAwesomeIcon icon={faPhone} style={{ fontSize: "20px", color: "#333", marginRight: "65px" }} />
        {/* Eye Icon and Counter */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faEye} style={{ fontSize: "20px", color: "#333", marginRight: "5px" }} />
          <span style={{ color: "#333" }}>{randomKilometers}</span>
        </div>
      </div>
      {showLoginFormContainer && (
        <div>
          <LoginForm onClose={() => setShowLoginFormContainer(false)} project={project} />
        </div>
      )}
    </div>
  );
};

export default Popup;