import React, { useState } from "react";
import './FilterForm.css';

const FilterForm = () => {
  const [filters, setFilters] = useState({
    transactionType: 'For sale',
    propertyType: 'Any',
    minPrice: '',
    maxPrice: '',
    beds: 'Any',
    baths: 'Any',
    storeys: 'Any',
    yearBuilt: 'Any',
    keywords: '',
    listedSince: '',
    ownershipTitle: 'Any',
    landSize: 'Any',
    buildingType: 'Any',
    openHouses: false,
    liveStreams: false,
    visibleOffers: false,
    waterfront: false,
    garage: false,
    pool: false,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  return (
    <div className="filter-form custom-filter-form">
      <div className="form-column">
        <div className="form-row">
          <label>Transaction Type</label>
        </div>
        <div className="form-row">
          <div>
            <label>
              <input type="radio" name="transactionType" value="For sale" checked={filters.transactionType === 'For sale'} onChange={handleFilterChange} />
              For sale
            </label>
            <label>
              <input type="radio" name="transactionType" value="For rent" checked={filters.transactionType === 'For rent'} onChange={handleFilterChange} />
              For rent
            </label>
            <label>
              <input type="radio" name="transactionType" value="Sold" checked={filters.transactionType === 'Sold'} onChange={handleFilterChange} />
              Sold
            </label>
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="minPrice">Minimum Price</label>
        </div>
        <div className="form-row">
          <select
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="100000">$100,000</option>
            <option value="200000">$200,000</option>
            <option value="300000">$300,000</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="landSize">Land Size</label>
        </div>
        <div className="form-row">
          <select
            id="landSize"
            name="landSize"
            value={filters.landSize}
            onChange={handleFilterChange}
          >
            <option value="Any">Any</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="ownershipTitle">Ownership Title</label>
          </div>
          <div className="form-row">
          <select
            id="ownershipTitle"
            name="ownershipTitle"
            value={filters.ownershipTitle}
            onChange={handleFilterChange}
          >
            <option value="Any">Any</option>
            <option value="Freehold">Freehold</option>
            <option value="Condominium">Condominium</option>
            <option value="Leasehold">Leasehold</option>
          </select>
        </div>
        <div className="form-row">
          <input
            type="checkbox"
            name="visibleOffers"
            checked={filters.visibleOffers}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="visibleOffers">Listing with visible offers only</label>
        </div>
      </div>
      <div className="form-column">
        <div className="form-row">
          <label htmlFor="propertyType">Property Type</label>
        </div>
        <div className="form-row">
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="maxPrice">Maximum Price</label>
          <label htmlFor="beds">Beds</label>
          <label htmlFor="baths">Baths</label>
        </div>
        <div className="form-row">
          <select
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="500000">$500,000</option>
            <option value="1000000">$1,000,000</option>
            <option value="2000000">$2,000,000</option>
            {/* Add more options as needed */}
          </select>
        
        <select
          id="beds"
          name="beds"
          value={filters.beds}
          onChange={handleFilterChange}
        >
          <option value="Unlimited">Unlimited</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <select
          id="baths"
          name="baths"
          value={filters.baths}
          onChange={handleFilterChange}
        >
          <option value="Any">Any</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="2.5">2.5</option>
          <option value="3">3</option>
          <option value="3.5">3.5</option>
          <option value="4">4</option>
          <option value="4.5">4.5</option>
          <option value="5">5</option>
          <option value="5.5">5.5</option>
          <option value="6">6</option>
        </select>
      
        </div>
        <div className="form-row">
        <label htmlFor="listedSince">Listed Since</label>
        <label htmlFor="buildingType">Building Type</label>
        <label htmlFor="storeys">Storeys</label>
        </div>
        <div className="form-row">
        <input
          id="listedSince"
          type="date"
          name="listedSince"
          value={filters.listedSince}
          onChange={handleFilterChange}
        />
                  <select
            id="buildingType"
            name="buildingType"
            value={filters.buildingType}
            onChange={handleFilterChange}
          >
            <option value="Any">Any</option>
            <option value="Detached">Detached</option>
            <option value="Semi-detached">Semi-detached</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Link">Link</option>
            <option value="Stacked">Stacked</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Others">Others</option>
          </select>
          <select
          id="storeys"
          name="storeys"
          value={filters.storeys}
          onChange={handleFilterChange}
        >
          <option value="Any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="yearBuilt">Year Built</label>
        </div>
        <div className="form-row">
        <input
          id="yearBuilt"
          type="date"
          name="yearBuilt"
          value={filters.yearBuilt}
          onChange={handleFilterChange}
        />
        <span>-</span>
        <input
          id="yearBuilt"
          type="date"
          name="yearBuilt"
          value={filters.yearBuilt}
          onChange={handleFilterChange}
        />
      </div>
      <div className="form-row">
      <label> 
            <input type="checkbox" name="openHouses" checked={filters.openHouses} onChange={handleCheckboxChange} /> 
            <span>Open Houses Only</span> 
            </label> 
            <input
            type="checkbox"
            name="liveStreams"
            checked={filters.liveStreams}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="liveStreams">Live Streams Only</label>
      </div>
      <div className="form-row">
        <label htmlFor="Keywords">Keywords</label>
        </div>
       <div className="form-row">
       <input type="text" name="keywords" checked={filters.keywords} onChange={handleFilterChange} placeholder="Waterfronts, Garage, Pool..." /> 
      </div>
      <div className="form-row">
      <button type="submit" style={{marginRight:'10px'}}>Reset</button>
        <button type="submit">Apply</button> 
      </div>

       </div>
       
      
    </div>
  );
};

export default FilterForm;
