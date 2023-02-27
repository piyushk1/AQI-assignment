import React, { Component } from 'react';
import axios from 'axios';
import '../styles/CitySearch.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/CitySearch.css';
import '../styles/AirQualityCard.css';

function getColor(aqi) {
  if (aqi <= 50) {
    return 'green';
  } else if (aqi <= 100) {
    return 'yellow';
  } else if (aqi <= 150) {
    return 'orange';
  } else if (aqi <= 200) {
    return 'red';
  } else if (aqi <= 300) {
    return 'violet';
  } else {
    return 'darkred';
  }
}


function getMaxAqiImpact(aqi) {
  if (aqi <= 50) {
    return <div style={{color: 'green'}}>Good</div>;
  } else if (aqi <= 100) {
    return <div style={{color: 'yellow'}}>Moderate</div>;
  } else if (aqi <= 150) {
    return <div style={{color: 'orange'}}>Unhealthy for Sensitive Groups</div>;
  } else if (aqi <= 200) {
    return <div style={{color: 'red'}}>Unhealthy</div>;
  } else if (aqi <= 300) {
    return <div style={{color: 'violet'}}>Very Unhealthy</div>;
  } else {
    return <div style={{color: 'darkred'}}>Hazardous</div>;
  }
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
  
    // Get the current date and day
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString('default', { weekday: 'long' });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
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

