import React, { Component } from 'react';
import { getAirQuality } from '../api';
import { getColor, getMaxAqiImpact } from '../utils';
import '../styles/CitySearch.css';

class CitySearch extends Component {
  //  state with cityName, airQualityData, isLoading, and error properties
  state = {
    cityName: '',
    airQualityData: null,
    isLoading: false,
    error: null,
  };

  // Handle changes
  handleCityNameChange = (event) => {
    this.setState({ cityName: event.target.value });
  };

  // Handle the search 
  handleSearch = async () => {
    const { cityName } = this.state;


    this.setState({ isLoading: true });

    try {
      //  function from the API module and store the response in airQualityData
      const airQualityData = await getAirQuality(cityName);

      //  airQualityData and isLoading to false
      this.setState({ airQualityData, isLoading: false });
    } catch (error) {
      // set error and isLoading to false
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { cityName, airQualityData, isLoading, error } = this.state;

    // current date and day and time
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString('default', { weekday: 'long' });

    //loading message
    if (isLoading) {
      return <div>Loading...</div>;
    }

    //  error message
    if (error) {
      return <div className="error-message">{error}</div>;
    }

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
        {airQualityData && airQualityData.aqi && (
          <div className="air-quality-container">
            <div className="air-quality-card">
              <div>
                <h2>{currentDate.toLocaleDateString()}</h2>
                <div>{currentDay}</div>
              </div>
              <div>
                <div className="city-name">{airQualityData.city.name}</div>
                <div className="aqi-value" style={{ color: getColor(airQualityData.aqi) }}>
                  {airQualityData.aqi}
                </div>
                <div className="aqi-impact">{getMaxAqiImpact(airQualityData.aqi)}</div>
              </div>
              <div>
              
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CitySearch;
