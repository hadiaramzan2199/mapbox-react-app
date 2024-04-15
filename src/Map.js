import React, { useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import './Map.css';
import './TopBar.css';
import './LayersToggle.css';
import './FilterForm.css';
import mapConfig from "./mapConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShare, faMap, faSatellite, faRuler, faList, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import TopBar from "./TopBar";
import LayersToggle from "./LayersToggle";
import { FacebookIcon, FacebookMessengerIcon, XIcon, TelegramIcon, WhatsappIcon, LinkedinIcon, PinterestIcon } from 'react-share';
import FilterForm from "./FilterForm";
import ProjectList from "./ProjectList";
import ProjectMarker from "./ProjectMarker";

const drawnItems = new L.FeatureGroup();

const Map = () => {
  const [currentMapStyle, setCurrentMapStyle] = useState('satellite'); 
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState(null);
  const [additionalLayers, setAdditionalLayers] = useState([]);
  const [layerVisibilities, setLayerVisibilities] = useState({hospital: false, landmarks: false, malls: false, mosque: false, parks: false, schools: false});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isRulerActive, setIsRulerActive] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(6);
  const [drawControl, setDrawControl] = useState(null);
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


  // ************************************************ MAP LOADING **********************************
  useEffect(() => {
    const loadMap = async () => {
      const streetsLayer = L.tileLayer(mapConfig.mapbox, {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        tileSize: 512,
        maxZoom: 30,
        zoomOffset: -1,
        id: 'mapbox/streets-v11',
        accessToken: mapConfig.mapboxAccessToken,
      });

      const satelliteLayer = L.tileLayer(mapConfig.mapbox, {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        tileSize: 512,
        maxZoom: 30,
        zoomOffset: -1,
        id: 'mapbox/satellite-v9',
        accessToken: mapConfig.mapboxAccessToken,
      });

      const map = L.map('mapdiv', {
        center: [23.8859, 45.0792],
        zoom: 6,
        layers: [satelliteLayer], 
      });

      addWmsLayersToMap(map);
      addLabelsToRegions(map);
      manageAdditionalLayersVisibility(map); 
      setMap(map);
      setLayers({ streetsLayer, satelliteLayer });
    };

    loadMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // ************************************************ ZOOM LEVEL SETTINGS **********************************
  useEffect(() => {
    const mapZoomChanged = () => {
      setCurrentZoom(map.getZoom());
    };

    if (map) {
      map.on('zoomend', mapZoomChanged);
    }

    return () => {
      if (map) {
        map.off('zoomend', mapZoomChanged);
      }
    };
  }, [map]);

  // ************************************************ MANAGING ADDITIONAL LAYERS ZOOM VISIBILITY **********************************
  useEffect(() => {
    if (map) {
      manageAdditionalLayersVisibility(map);
    }
  }, [currentZoom, map]);  

  // ************************************************ TOGGLE MAP STYLES **********************************
  const toggleMapStyle = () => {
    const { streetsLayer, satelliteLayer } = layers;
  
    if (currentMapStyle === 'streets' && streetsLayer && map) {
      map.removeLayer(streetsLayer);
      additionalLayers.forEach(layer => map.removeLayer(layer));
      map.addLayer(satelliteLayer);
      addWmsLayersToMap(map);
      addLabelsToRegions(map);
      manageAdditionalLayersVisibility(map);
      setCurrentMapStyle('satellite');
    } else if (currentMapStyle === 'satellite' && satelliteLayer && map) {
      map.removeLayer(satelliteLayer);
      additionalLayers.forEach(layer => map.removeLayer(layer));
      map.addLayer(streetsLayer);
      addWmsLayersToMap(map);
      addLabelsToRegions(map);
      manageAdditionalLayersVisibility(map);
      setCurrentMapStyle('streets');
    }
  };

  // ************************************************ MEASUREMENT TOOL **********************************
  const toggleRuler = () => {
    setIsRulerActive(!isRulerActive);
  
    if (!isRulerActive) {
      map.addLayer(drawnItems);
      const control = new L.Control.Draw({
        draw: {
          polyline: {
            metric: true,
            shapeOptions: {
              color: '#ff7800'
            },
            title: 'Draw a line for distance measurement'
          },
          polygon: {
            allowIntersection: false,
            showArea: true,
            metric: true,
            shapeOptions: {
              color: '#ff7800'
            },
            title: 'Draw a polygon for area measurement'
          },
          circle: false,
          circlemarker: false,
          marker: false,
          rectangle: false
        },
        edit: {
          featureGroup: drawnItems,
          edit: false,
          remove: false,
        },
      });
      L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon for area measurement';
      L.drawLocal.draw.toolbar.buttons.polyline = 'Draw a line for distance measurement';
      control.setPosition('bottomright');
      setDrawControl(control);
      map.addControl(control);
      map.on(L.Draw.Event.CREATED, handleDraw);
    } else {
      if (drawControl) {
        map.removeControl(drawControl);
        setDrawControl(null);
      }
      map.off(L.Draw.Event.CREATED, handleDraw);
      drawnItems.clearLayers();
    }
  };
  
  // ************************************************ MEASUREMENTS SETTINGS **********************************
  const handleDraw = (event) => {
    const layer = event.layer;
    drawnItems.addLayer(layer);
  
    if (event.layerType === 'polygon') {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 1000000; 
      layer.bindPopup(`Area: ${area.toFixed(2)} square kilometers`).openPopup();
    } else if (event.layerType === 'polyline') {
      const latlngs = layer.getLatLngs();
      let distance = 0;
      for (let i = 0; i < latlngs.length - 1; i++) {
        distance += latlngs[i].distanceTo(latlngs[i + 1]);
      }
      distance /= 1000; // Convert meters to kilometers
      layer.bindPopup(`Distance: ${distance.toFixed(2)} kilometers`).openPopup();
    }
  };
  
  // ************************************************ ADDING REGION LAYERS **********************************
  const addWmsLayersToMap = (map) => {
    const layers = [
      'riyadh:CentralRegion',
      'riyadh:EastRegion',
      'riyadh:NorthRegion',
      'riyadh:SouthRegion',
      'riyadh:WestRegion',
    ];

    layers.forEach((layer) => {
      const wmsLayer = L.tileLayer.wms(mapConfig.geoserver, {
        layers: layer,
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
      });

      wmsLayer.addTo(map);
    });
  };

  // ************************************************ MANAGING REGION LAYERS VISIBILITY **********************************
  const toggleLayerVisibility = (layerName) => {
    setLayerVisibilities({
      ...layerVisibilities,
      [layerName]: !layerVisibilities[layerName],
    });
    if (layerVisibilities[layerName]) {
      additionalLayers.find((layer) => layer.options.layers === `riyadh:${layerName}`).remove();
    } else {
      addAdditionalLayersForLayer(layerName);
    }
  };

  // ************************************************ ADDING ADDITIONAL LAYERS **********************************
  const addAdditionalLayersForLayer = (layerName) => {
    const additionalLayer = L.tileLayer.wms(mapConfig.geoserver, {
      layers: `riyadh:${layerName}`,
      format: 'image/png',
      transparent: true,
      version: '1.1.0',
    });

    additionalLayers.push(additionalLayer);
    additionalLayer.addTo(map);
  };
  
  // ************************************************ MANAGING ADDITIONAL LAYERS VISIBILITY **********************************
  const manageAdditionalLayersVisibility = (map) => {
    additionalLayers.forEach((layer) => {
      if (currentZoom >= 10) {
        layer.addTo(map);
      } else {
        layer.removeFrom(map);
      }
    });
  };  

  // ************************************************ ADDING LABELS **********************************
  const addLabelsToRegions = (map) => {
    const regionLabels = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [44.6292, 24.9859], 
        },
        properties: {
          name: 'Central Region',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [51.25, 20.96], 
        },
        properties: {
          name: 'Eastern Region',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [39.51, 25.0], 
        },
        properties: {
          name: 'Western Region',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [44.2, 18.5], 
        },
        properties: {
          name: 'Southern Region',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.85, 29.35], 
        },
        properties: {
          name: 'Northern Region',
        },
      },
    ];
  
    const labelElements = [];

    regionLabels.forEach((region) => {
      const labelContent = `<div class="label-container">${region.properties.name}</div>`;
      const labelElement = L.DomUtil.create('div', 'label-container', map.getContainer());
      labelElement.innerHTML = labelContent;

      const updateLabelPosition = () => {
        const latlng = L.latLng(region.geometry.coordinates[1], region.geometry.coordinates[0]);
        const labelLatLng = map.latLngToContainerPoint(latlng);
        const labelSize = L.point(100, 30);

        L.DomUtil.setPosition(labelElement, labelLatLng.subtract(labelSize.divideBy(2)));
      };

      updateLabelPosition(); 

      labelElement.addEventListener('click', () => {
        const latlng = L.latLng(region.geometry.coordinates[1], region.geometry.coordinates[0]);
        map.flyTo(latlng, 8); 
        labelElements.forEach(({ element }) => {
          element.style.display = 'none';
        });
      });

      labelElements.push({ element: labelElement, updatePosition: updateLabelPosition });
    });

    map.on('move', () => {
      labelElements.forEach(({ updatePosition }) => updatePosition());
    });
    
    const style = document.createElement('style');
    style.innerHTML = `
      .label-container {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px; /* Adjust the width as needed */
        height: 30px; /* Adjust the height as needed */
        background-color: rgba(255, 120, 0, 0.5);
        color: white;
        border-radius: 10px;
        transition: all 0.3s;
        z-index: 1000;
      }

      .label-container:hover {
        background-color: rgba(255, 120, 0, 1);
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);
  };

  // ************************************************ SHARE MAP VISIBILITY **********************************
  const shareMap = () => {
    setShowShareOptions(!showShareOptions);
  };

  // ************************************************ FILTER FORM VISIBILITY **********************************
  const toggleFilterForm = () => {
    setIsFilterFormVisible(!isFilterFormVisible);
  };  

  // ************************************************ SIDE BAR VISIBILITY **********************************
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // ************************************************ RESET MAP TO DEFAULT ZOOM **********************************
  const resetMap = () => {
    map.setView([23.8859, 45.0792], 6);
  };

  // ************************************************ JSX **********************************
  return (
    <div>
      {/********************************* MAP DIV **********************************/}
      <div id="mapdiv" />

      <div className="projectmarker">
        <ProjectMarker map={map} />
      </div>

      {/********************************* SIDE BAR **********************************/}
      {/* Project List toggle button */}
      <div className="project-list-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faList} style={{color: '#c1886e'}}/>
          <span>Project List</span>
      </div>

      {/* Sidebar with ProjectList */}
      {isSidebarVisible && (
        <div className="sidebar">
          <div className="project-list">
            <ProjectList />
          </div>
        </div>
      )}
      
      {/********************************* TOP BAR & FILTER FORM RENDERING **********************************/}
      <div className="app">
        <TopBar toggleFilterForm={toggleFilterForm} map={map}/>
        {isFilterFormVisible && <FilterForm />}
      </div>

      {/********************************* LAYER TOGGLE RENDERING WITH CONTROLLED ZOOM **********************************/}
      {currentZoom >= 10 && <LayersToggle layerVisibilities={layerVisibilities} toggleLayerVisibility={toggleLayerVisibility} />}

      {/********************************* MAP SHARE OPTIONS **********************************/}
      {showShareOptions && (
        <div className="share-icon-container" style={{ position: 'absolute', bottom: '100px', left: '31%', transform: 'translateX(-50%)', zIndex: '1000', backgroundColor: 'rgba(255, 120, 0, 0.4)', borderRadius:'20px', padding:'5px',  }}>
          <FacebookIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></FacebookIcon>
          <FacebookMessengerIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></FacebookMessengerIcon>
          <XIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></XIcon>
          <TelegramIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></TelegramIcon>
          <WhatsappIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></WhatsappIcon>
          <LinkedinIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></LinkedinIcon>
          <PinterestIcon url={window.location.href} size={30} round style={{margin:'5px', cursor: 'pointer'}}></PinterestIcon>
        </div>
      )}

      {/********************************* LOGO **********************************/}
      <img src="./logo.png" alt="Logo" style={{position: 'absolute', top: '50px', right: '5px', width: '100px', height: '50px',zIndex: 1000}}/>
      
      {/********************************* BOTTOM BAR **********************************/}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '370px',
          right: '50px',
          width: '50%',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 1000,
        }}
      >

        {/********************************* ICONS **********************************/}
        <div>
          <FontAwesomeIcon icon={faHome} style={{ cursor: 'pointer', marginRight: '35px', marginLeft: '10px' }} onClick={() => (window.location.href = "https://yourwebsite.com")}/>
          <FontAwesomeIcon icon={faShare} style={{ cursor: 'pointer', marginRight: '35px' }} onClick={shareMap} />
          <FontAwesomeIcon icon={faRuler} style={{cursor: 'pointer', marginRight: '35px'}} onClick={toggleRuler} /> 
          <FontAwesomeIcon icon={faRedoAlt} style={{ cursor: 'pointer' }} onClick={resetMap} /> 
        </div>

        {/********************************* MAP TOGGLE STYLES **********************************/}
        <div>
          <span onClick={toggleMapStyle} style={{ cursor: 'pointer', marginRight: '15px' }}>
            <FontAwesomeIcon icon={faMap} /> Map
          </span>
          <span onClick={toggleMapStyle} style={{ cursor: 'pointer', marginRight: '15px' }}>
            <FontAwesomeIcon icon={faSatellite} /> Satellite
          </span>
        </div>

      </div>

    </div>
  );
};

export default Map;

