import React, { Component } from 'react';
import axios from 'axios';
import '../styles/CitySearch.css';



const AirQualityCard = ({ name, value, unit }) => {
    return (
      <div className="card">
        <h4>{name}</h4>
        <p>{value} {unit}</p>
      </div>
    );
  }

  
class CitySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: '',
      airQualityData: null,
      isLoading: false,
      error: null
    };

    this.handleCityNameChange = this.handleCityNameChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleCityNameChange(event) {
    this.setState({ cityName: event.target.value });
  }

  handleSearch() {
    const { cityName } = this.state;
    const url = `https://api.waqi.info/feed/${cityName}/?token=6162fe42bbef7e13590930efa4ac710203c66590`;

    this.setState({ isLoading: true, error: null, airQualityData: null });

    axios
      .get(url)
      .then(response => {
        this.setState({ isLoading: false, airQualityData: response.data.data });
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
  }

 
  render() {
    const { cityName, airQualityData, isLoading, error } = this.state;
  
    return (
      <div className="city-search-container">
        <h2>Search Air Quality by City Name</h2>
        <div className="search-input-container">
          <label htmlFor="cityNameInput">City Name: </label>
          <input
            type="text"
            id="cityNameInput"
            value={cityName}
            onChange={this.handleCityNameChange}
            className="search-input"
          />
          <button onClick={this.handleSearch} className="search-button">
            Search
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {airQualityData && airQualityData.iaqi && (
          <div>
            <h3>Air Quality Index for {cityName}</h3>
            {Object.entries(airQualityData.iaqi).map(([key, value]) => (
              <div className="city-card" key={key}>
                <div className="city-name">{cityName}</div>
                <div className="index-type">{key}</div>
                <div className="index-value">{value.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default CitySearch;
