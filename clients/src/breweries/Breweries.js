import { useState, useEffect } from 'react';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './breweries.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Geocode from "react-geocode";
import Brewery from '../components/brewery/Brewery.js';
import Details from '../components/details/Details.js';
import Navigation from '../components/navigation/Navigation.js';

const Breweries = () => {
  const [coordinates, setCoordinates] = useState({});
  const [city, setCity] = useState();
  const [breweryList, setBreweryList] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [view, setView] = useState('all');
  const [chosenBrew, setChosenBrew] = useState(0);
  const [userLocation, setUserLocation] = useState('');

  //get current location and set it as the center of the map
  //list the nearby breweries
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude })
      Geocode.fromLatLng(data.coords.latitude, data.coords.longitude)
      .then((response) => {
        console.log('does this even run???',response.results);
        setUserLocation(response.results[0].formatted_address);
        })
      .catch(err => console.log("Can't get user current location"));
    });
  }, [])

  useEffect(() => {
    if (coordinates.lat) {
      axios.get(`/dist?lat=${coordinates.lat}&lng=${coordinates.lng}`)
      .then((list) => setBreweryList(list.data))
      .catch((err) => {console.log('err message', err)});
    }
  }, [coordinates, bounds, chosenBrew])

  const handleSearch = (e) => {
    e.preventDefault();
    const searchedCity = city.toLowerCase().split(' ').join('_');
    console.log('searchedCity', searchedCity);
    axios.get(`/city/${searchedCity}`)
    .then((list) => setBreweryList(list.data))
    .catch((err) => {console.log('err message', err)});

    Geocode.fromAddress(city)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setCoordinates({lat, lng})})
    .catch((err) => {console.error(err)});
  }

  const handlePin = (place, i) => {
    setChosenBrew(i);
    setCoordinates({lat: place.latitude, lng: place.longitude});
  }

  return (
    <section>

    {view === "all" ?
      <div className="mainContainer">
        <div className="breweriesList">

          <Navigation
            setCity={setCity}
            city={city}
            handleSearch={handleSearch}
          />
          {breweryList?.map((brewery) =>
            <Brewery key={brewery.id} brewery={brewery} setView={setView}/>)}
        </div>

        <div className="googleMap" style={{ height: '100vh', width: '50%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_TOKEN }}
            center={coordinates}
            defaultZoom={12}
            margin={[50, 50, 50, 50]}
            options={''}
            onChange={(e) => {
              setCoordinates({ lat: e.center.lat, lng: e.center.lng })
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
          >
          {breweryList?.map((place, i) => {
            if(place.latitude && place.longitude) {
              return (<div
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              >
              <LocationOnIcon onClick={()=>handlePin(place, i)} style={{ color: '#DA2C38'}} fontSize="large" />
              </div>)
            }
          })}
          </GoogleMapReact>
        </div>
        </div> :

        <Details brewery={view} setView={setView} userLocation={userLocation}/>

        }
    </section>
  )
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_TOKEN);
Geocode.setLanguage("en");
Geocode.setRegion("us");


export default Breweries;