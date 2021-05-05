import React, { Component } from "react";
import { render } from "react-dom";

class Map extends Component {
  state = {
    latitude: 40.23,
    longitude: -3.20
  };

  componentDidMount() {
      let latitudeNow;
      let longitudeNow;
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition( 
        function(position) {
            latitudeNow = position.coords.latitude
            longitudeNow = position.coords.longitude
          })
          // function(error) {
            //   console.error("Error Code = " + error.code + " - " + error.message);
            // });
    //   this.setState({
    //     latitude: latitudeNow,
    //     longitude: longitudeNow
    //   })   
    }
  }
    
    componentDidUpdate() {

    }

  render() {
    return (
      <div>
            <h4>{this.state.latitude}</h4>
            <h4>{this.state.longitude}</h4>
      </div>
    );
  }
}

export default Map;