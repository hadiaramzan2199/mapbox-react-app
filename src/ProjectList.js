import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: "AIzaSyB5aFRATiXhAB4r0ZyhAM0YN7cZf5ZEtfI",
        clientId: "116494546168025463901",
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
        fetchProjects();
      });
    };

    const fetchProjects = () => {
      const spreadsheetId = "1lMWFIWuQmDAKadLPSwALNH0Fl4F__Z_KJkZ8dLnrKpk";
      const range = "Form Responses!A:AL";

      gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId,
          range,
        })
        .then((response) => {
          const values = response.result.values;
          if (values.length > 1) {
            const projectsData = values.slice(1).map((row) => ({
              submissionDate: row[0],
              propertyName: row[1],
              streetName: row[2],
              locationLink: row[3],
              projectCategory: row[4],
              currentTenantsName: row[5],
              currentTenantLogos: row[6],
              location: row[7],
              longitudeLatitude: row[8],
              isInRedZone: row[9],
              projectOrientation: row[10],
              north: row[11],
              west: row[12],
              south: row[13],
              east: row[14],
              gla: row[15],
              numberOfStores: row[16],
              numberOfFloors: row[17],
              floorsInformation: row[18],
              projectStatus: row[19],
              unitHandoverCondition: row[20],
              projectPictures: row[21],
              projectPlans: row[22],
              projectProfile: row[23],
              projectDescription: row[24],
              locationAttributes: row[25],
              accessibilityAndVisibilityFactors: row[26],
              commercialTenantComposition: row[27],
              averageRentalRates: row[28],
              finishingQualityAssessment: row[29],
              parkingAvailabilityEvaluation: row[30],
              entertainmentFacilitiesOverview: row[31],
              occupancyRateClassification: row[32],
              projectManagementProficiency: row[33],
              footfallDistributionAnalysis: row[34],
              typeAQuestion: row[35],
              grad: row[36],
              projectType: row[37],
              submissionID: row[38]
            }));
            setProjects(projectsData);
          }
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    };

    gapi.load("client", initClient);
  }, []);

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
      {projects.map((project, index) => (
        <div key={index}>
          <h2 style={{ color: "#c1886e" }}>{project.propertyName}</h2>
          <p style={{ color: "#c1886e", fontWeight: "bold" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ color: "black", marginRight: "5px" }}
            />
            {project.location}
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
                      alt={`Project Picture ${picIndex + 1}`}
                      style={{ width: "270px", height: "150px" }}
                    />
                  </div>
                ))}
            </Slider>
          )}
          {project.projectPictures && project.projectPictures.split("\n").filter(pic => pic.trim()).length === 1 && (
            <img
              src={project.projectPictures.split("\n").filter(pic => pic.trim())[0].trim()}
              alt="Project Picture"
              style={{ width: "270px", height: "150px" }}
            />
          )}
          <p style={{ color: "grey", fontWeight: "bold" }}>
            Total Available Space For Lease:{" "}
            <span style={{ color: "black" }}>{project.gla} Sqm</span>
          </p>
          <p style={{ color: "grey", fontWeight: "bold" }}>
            Occupancy: <span style={{ color: "black" }}>{project.occupancyRateClassification}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;