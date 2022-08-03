import { useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import './details.css';
const Details = ({brewery, setView, userLocation}) => {
  const street = brewery.street === null ? 'TBD, ' : brewery.street + ', '
  const address = street + brewery.city + ', '+ brewery.state + ', '+ brewery.postal_code;
  const editedAddress = (brewery.street !== null? brewery.street: '') + ', '+ brewery.city;
  const [googleAddress, setGoogleAddress] = useState(editedAddress);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const center = {lat: Number(brewery.latitude), lng: Number(brewery.longitude)};
  const [dirResponse, setDirResponse] = useState();
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const { isLoaded } = useJsApiLoader({
    GoogleMapApiKey: process.env.REACT_APP_GOOGLE_TOKEN,
  })
  async function calculateRoute() {
    if(originRef.current.value === '' && userLocation === '' ) {
      return
    }
    const startPoint =  originRef.current.value ? originRef.current.value : userLocation
    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: startPoint,
      destination: googleAddress,
      travelMode: window.google.maps.TravelMode.DRIVING
    });
    setDirResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute(){
    setDirResponse('');
    setDistance('');
    setDuration('');
    originRef.current.value = '';
  }

  return (
  <div className="detailsContainer">
    <div className="detailsBar">
      <div className='detailsTitle'>
        <div className="detailsName">{brewery.name}
          <div className="detailsNearMe" onClick={()=>map.panTo(center)}>
            <span id="detailsNearMe" className="material-symbols-outlined">near_me</span>
          </div>
        </div>
        <div className="detailsAddress">{address}</div>
      </div>
      <div className="detailsBarButton"><button onClick={()=>setView('all')}>Back</button></div>
    </div>
    <div className="detailsNav">
      <div className="detailsNavTop">
        <label>From:</label><input type="text" placehoder="Origin" ref={originRef}/>
        <label>To:</label> <input type="text" value={googleAddress} onChange={(e)=> setGoogleAddress(e.target.value)}/>
        <button onClick={calculateRoute}>
          <span className="material-symbols-outlined" id="dir">directions</span>
        </button>
        <button onClick={clearRoute}>
          <span className="material-symbols-outlined" id="cancel">cancel</span>
        </button>
        <div className="detailsNavDis">Distance: {distance}</div>
        <div className="detailsNavDur">Duration: {duration} </div>

      </div>
    </div>

    {isLoaded ? <div className="detailsGoogleMap">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{width: '100%', height: '100%'}}
        // options={{
        //   streetViewControl: false,
        //   mapTypeControl: false
        // }}
        onLoad={map =>setMap(map)}
        >
        <Marker position={center}/>
        {dirResponse && <DirectionsRenderer directions={dirResponse}/>}
      </GoogleMap>
    </div>: <div></div>}
  </div>)
}
export default Details;