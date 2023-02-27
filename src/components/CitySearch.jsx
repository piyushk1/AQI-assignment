import React, { Component } from 'react';
import axios from 'axios';
import '../styles/CitySearch.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  
    if (airQualityData && airQualityData.aqi) {
      const aqi = airQualityData.aqi;
      const aqiImpact = getMaxAqiImpact(aqi);
      const aqiColor = getColor(aqi);
  
      return (
        <Box sx={{ maxWidth: 300 }}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {cityName}
              </Typography>
              <Typography variant="h5" component="div" style={{ color: aqiColor }}>
                {aqi}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {aqiImpact}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.handleSearch}>Refresh</Button>
            </CardActions>
          </Card>
        </Box>
      );
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
      </div>
    );
  }
  


}
export default CitySearch;
