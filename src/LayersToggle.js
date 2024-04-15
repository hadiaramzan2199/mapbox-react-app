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
        <div className="icon-wrapper">
          <img src={getIconForLayerName("hospital")} alt="hospital" style={{marginLeft:'-35px'}}/>
          <span style={{marginLeft:'35px', marginTop:'-20px'}}>Hospital</span>
        </div>
      </button>
      <button
        className={`layer-button ${layerVisibilities.landmarks ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("landmarks")}
      >
        <div className="icon-wrapper">
          <img src={getIconForLayerName("landmarks")} alt="landmarks" style={{marginLeft:'-40px', marginTop:'0px'}}/>
          <span style={{marginLeft:'45px', marginTop:'-18px'}}>Landmarks</span>
        </div>
      </button>
      <button
        className={`layer-button ${layerVisibilities.malls ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("malls")}
      >
        <div className="icon-wrapper">
          <img src={getIconForLayerName("malls")} alt="malls" style={{marginLeft:'-15px', marginTop:'1px'}}/>
          <span style={{marginLeft:'40px', marginTop:'-20px'}}>Malls</span>
        </div>
      </button>
      <button
        className={`layer-button ${layerVisibilities.mosque ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("mosque")}
      >
        <div className="icon-wrapper">
          <img src={getIconForLayerName("mosque")} alt="mosque" style={{marginLeft:'-50px', marginTop:'0px'}}/>
          <span style={{marginLeft:'20px', marginTop:'-20px'}}>Mosque</span>
        </div>
      </button>
      <button
        className={`layer-button ${layerVisibilities.parks ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("parks")}
      >
        <div className="icon-wrapper">
          <img src={getIconForLayerName("parks")} alt="parks" style={{width:'30px', height:'35px', marginLeft:'-55px', marginTop:'0px'}} />
          <span style={{marginTop:'-27px', marginLeft:'5px'}}>Parks</span>
        </div>
      </button>
      <button
        className={`layer-button ${layerVisibilities.schools ? "active" : ""}`}
        onClick={() => toggleLayerVisibility("schools")}
      >
        <div className="icon-wrapper">
          <img src={getIconForLayerName("schools")} alt="schools" style={{marginLeft:'-80px', marginTop:'0px'}}/>
          <span style={{marginLeft:'-10px', marginTop:'-20px'}}>Schools</span>
        </div>
      </button>
    </div>
  );
};

export default LayersToggle;
