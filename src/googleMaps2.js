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
      spacePosition: {},
      lat: 0,
      lng: 0
    }
    this.iss_position = this.iss_position.bind( this )
  }
  componentDidMount = () => {
    this.iss_position()
    setInterval(() => this.iss_position(),5000)
  }
  
iss_position = () =>{
  axios.get('http://localhost:8080/api/space')
  .then(response => {
    this.setState({ 
      spacePosition: response.data.iss.iss_position,
      //parseFloat is where we went wrong!!!!!!
      lat: parseFloat(response.data.iss.iss_position.latitude),
      lng: parseFloat(response.data.iss.iss_position.longitude)
    })
  })
}

  render() {
    var GoogleMapsMarkers = markers.map(marker => (
      <CustomMarker
        key={`marker_${marker.name}`}
        lat={this.state.spacePosition.latitude}
        lng={this.state.spacePosition.longitude}
        text={'ISS'}
      />
    ));
    
    return (
      <GoogleMapReact className='GoogleMap'
        
        center={[this.state.lat, this.state.lng]}
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