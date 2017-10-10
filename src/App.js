import React, { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import GoogleMapReactComponent from './googleMaps2';
import international from './astro.png';
import Button from './Button.js';
class App extends Component {
  constructor(){
    super()

    this.state = {
      spaceNum: '',
    spacePeep: [],
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
      spaceNum: response.data.number,
      spacePeep: response.data.people.name, 
      spacePosition: response.data.iss.iss_position
    })
  })
}



  render() {


    return (
      
      <div>
      <Button/>  
        <header className= 'header'>

       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
       <div className= 'interDiv'><img src={international} className='international' alt= 'international'/></div>
        </header>
      <div className="App">

      </div>
      
<div className= 'map'>
<div className = "DivGoogleMap">
<GoogleMapReactComponent className = "GoogleMap"/>
</div>
</div>
<footer class= 'footer'>
<div className="iss_position">
        The ISS is currently over {(this.state.spacePosition.longitude)} N, {(this.state.spacePosition.latitude)} E        
        </div>

        <div className='spaceNum'>
            
        <div> Currently <br></br></div> 
        <div className= 'actualNum'> {this.state.spaceNum} <br></br></div>

        <div>people floating in space. </div>
          </div>

</footer>
</div>
    );
  }
}

export default App;
