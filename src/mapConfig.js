const mapConfig = {
    mapbox: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    mapboxAccessToken: 'pk.eyJ1IjoiYWFtZXJqYW1lZWwiLCJhIjoiY2xvcnFmemY5MHh0czJqczhlMDZ4cGNnbCJ9.caC-vY545ifokQctbmu0JQ',
    geoserver: 'http://localhost:8080/geoserver/riyadh/wms',
    satelliteMapUrl: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    streetMapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  };
  
  export default mapConfig;
