import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import L from 'leaflet';
import './TopBar.css';

const TopBar = ({ toggleFilterForm, map }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true); // Initialize to true

  let debounceTimer;

  const handleSearch = () => {
    if (searchText.trim() === '') return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const leafletLatLng = [lat, lon];
          if (leafletLatLng && leafletLatLng.length === 2) {
            map.setView(leafletLatLng, 12);
            L.marker(leafletLatLng)
              .addTo(map)
              .bindPopup(`<h3>${display_name}</h3>`)
              .openPopup();
          } else {
            console.log('Invalid center data:', leafletLatLng);
          }
        } else {
          console.log('Location not found!');
        }
        setSuggestions([]); // Clear suggestions after search
        setShowSuggestions(false); // Hide suggestions after search
      })
      .catch(error => {
        console.error('Error:', error);
        setSuggestions([]);
      });
  };

  useEffect(() => {
    if (!map || !L || !L.marker) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [map, searchText]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(true); // Show suggestions when input is cleared
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setSuggestions(data.map(item => item.display_name));
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setSuggestions([]);
        });
      setShowSuggestions(true); // Show suggestions when suggestions are available
    }, 300); // Adjust the debounce delay as needed
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    handleSearch();
  };

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-search-container">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="City, Neighbourhood, Address, School" 
              value={searchText} 
              onChange={handleInputChange}
            />
          </div>
          <button className="top-bar-filter-container" onClick={toggleFilterForm}>
            <span>Filters</span>
          </button>
          <span className="top-bar-filter-icon-container">
            <FontAwesomeIcon className="top-bar-filter-icon" icon={faFilter} />
          </span>
        </div>
      </div>
      <div className={`suggestions-container ${showSuggestions && suggestions.length > 0 ? '' : 'hidden'}`}>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
