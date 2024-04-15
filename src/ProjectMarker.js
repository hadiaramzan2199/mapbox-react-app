import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import L from 'leaflet';
import Popup from "./Popup"; // Import the Popup component
import ReactDOM from 'react-dom';


const ProjectMarker = ({ map }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (map) {
      fetchProjects();
    }
  }, [map]);

  const fetchProjects = () => {
    const initClient = () => {
      gapi.client.init({
        apiKey: "AIzaSyB5aFRATiXhAB4r0ZyhAM0YN7cZf5ZEtfI",
        clientId: "116494546168025463901",
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
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
              displayProjectMarkers(projectsData, map);
            }
          })
          .catch((error) => {
            console.error("Error fetching projects:", error);
          });
      });
    };

    gapi.load("client", initClient);
  };

  const displayProjectMarkers = (projectsData, map) => {
    projectsData.forEach((project) => {
      const coordinates = project.longitudeLatitude.split(",");
      const latLng = { lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1]) };
  
      // Check if projectPictures exist and if there are any non-empty picture URLs
      if (project.projectPictures && project.projectPictures.split("\n").filter(pic => pic.trim()).length > 0) {
        // Get the first non-empty picture URL
        const pictureUrl = project.projectPictures.split("\n").filter(pic => pic.trim())[0].trim();
  
        // Create marker with project picture as icon
        const markerIcon = L.icon({
          iconUrl: pictureUrl,
          iconSize: [32, 32], // Adjust size as needed
        });
  
        const marker = L.marker(latLng, { icon: markerIcon }).addTo(map);
  
        marker.on('click', () => {
          setSelectedProject(project); // Set the selected project
          const popupContent = <Popup project={project} />; // JSX content
          const popupContainer = document.createElement('div'); // Create a container div
          ReactDOM.render(popupContent, popupContainer); // Render JSX content to the container
          const popup = L.popup()
            .setContent(popupContainer) // Set the container as content
            .setLatLng(latLng) // Set popup position to marker position
            .openOn(map);
        });
        
      }
    });
  };
  
  return null; // Since this component is responsible for side-effects only, return null
};

export default ProjectMarker;