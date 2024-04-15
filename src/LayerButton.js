import React from "react";
import hospitalIcon from "./hospital.png";
import landmarksIcon from "./landmarks.png";
import mallsIcon from "./malls.png";
import mosqueIcon from "./mosque.png";
import parksIcon from "./parks.png";
import schoolsIcon from "./schools.png";

const getIconForLayerName = (layerName) => {
  switch (layerName) {
    case "hospital":
      return hospitalIcon;
    case "landmarks":
      return landmarksIcon;
    case "malls":
      return mallsIcon;
    case "mosque":
      return mosqueIcon;
    case "parks":
      return parksIcon;
    case "schools":
      return schoolsIcon;
    default:
      return null;
  }
};

const LayersToggle = ({ layerVisibilities, toggleLayerVisibility }) => {
  return (
    <div className="layers-toggle">
      <button
        className={`layer-button ${layerVisibilities.hospital ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("hospital")}
      >
        <img src={getIconForLayerName("hospital")} alt="hospital" />
      </button>
      <button
        className={`layer-button ${layerVisibilities.landmarks ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("landmarks")}
      >
        <img src={getIconForLayerName("landmarks")} alt="landmarks" />
      </button>
      <button
        className={`layer-button ${layerVisibilities.malls ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("malls")}
      >
        <img src={getIconForLayerName("malls")} alt="malls" />
      </button>
      <button
        className={`layer-button ${layerVisibilities.mosque ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("mosque")}
      >
        <img src={getIconForLayerName("mosque")} alt="mosque" />
      </button>
      <button
        className={`layer-button ${layerVisibilities.parks ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("parks")}
      >
        <img src={getIconForLayerName("parks")} alt="parks" />
      </button>
      <button
        className={`layer-button ${layerVisibilities.schools ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("schools")}
      >
        <img src={getIconForLayerName("schools")} alt="schools" />
      </button>
    </div>
  );
};

export default LayersToggle;