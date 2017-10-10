import React, { PureComponent } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import CONFIG from './config.json';
import { markers, mapConfig } from './utils';
import './App.css'


const CustomMarker = ({ text }) => <div className='custom-marker'><p>{text}</p></div>;

class GoogleMapReactComponent extends PureComponent {

  constructor(){
   super()

    this.state = {
      spacePosition: ''
    }
    this.iss_position = this.iss_position.bind( this )
  }
  componentDidMount = () => {
    this.iss_position()
   var position = setInterval(() => {this.iss_position()},5000)
  }
  
iss_position = () =>{
  axios.get('http://localhost:8080/api/space')
  .then(response => {
    this.setState({ 
      spacePosition: response.data.iss.iss_position
    })
  })
}

  render() {
    var lat = Math.floor(+this.state.spacePosition.latitude)
    var lng = Math.floor(+this.state.spacePosition.longitude)
    
    var latLng = {lat : lat, lng: lng}

    const GoogleMapsMarkers = markers.map(marker => (
      <CustomMarker
        key={`marker_${marker.name}`}
        lat={this.state.spacePosition.latitude}
        lng={this.state.spacePosition.longitude}
        text={'ISS'}
      />
    ));
    console.log([lat, lng])
    console.log(this.state.spacePosition)
    console.log(latLng)
    
    return (
      <GoogleMapReact className='GoogleMap'
        center={mapConfig.center}
        defaultZoom={mapConfig.zoom}
        mapTypeId={'HYBRID'}
        layerTypes={['TrafficLayer', 'TransitLayer']}
        bootstrapURLKeys={{
          key: CONFIG.GOOGLE_MAPS_API_KEY,
          language: 'en'
        }}
      >
        {GoogleMapsMarkers}
      </GoogleMapReact>
    );
  }
}

export default GoogleMapReactComponent;