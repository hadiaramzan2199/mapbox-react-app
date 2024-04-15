import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectDetails.css";

const ProjectDetails = ({ project }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev"></button>,
    nextArrow: <button className="slick-next"></button>,
  };

  if (!project) return null;

  return (
    <div className="project-details-container">
      <div className="project-details-table">
        <div className="table-row">
          <div className="table-cell">Red Zone</div>
          <div className="table-cell">{project.isInRedZone}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Project Orientation</div>
          <div className="table-cell">{project.projectOrientation}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">North</div>
          <div className="table-cell">{project.north}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">West</div>
          <div className="table-cell">{project.west}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">South</div>
          <div className="table-cell">{project.south}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">East</div>
          <div className="table-cell">{project.east}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">No. of Stores</div>
          <div className="table-cell">{project.numberOfStores}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">No. of Floors</div>
          <div className="table-cell">{project.numberOfFloors}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Floors Information</div>
          <div className="table-cell">{project.floorsInformation}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Project Status</div>
          <div className="table-cell">{project.projectStatus}</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Unit Handover Condition</div>
          <div className="table-cell">{project.unitHandoverCondition}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
