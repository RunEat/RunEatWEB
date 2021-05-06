import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50%'
};

class RunningMap extends Component {
   render() {
    const myLatLng = { lat: this.props.lat, lng: this.props.lng };
    //console.log("myLatLng", myLatLng)

     const coordinates = this.props.coordinates
     //console.log('coordinates', coordinates)

    return (
      <div className="RunningMap">
        <Map
          google={this.props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={{
            lat: 40.4521205,
            lng: -3.6997216,
          }}
        >
          <Marker position={myLatLng} />
          <Polyline path={coordinates} options={{ strokeColor: "#85ef47" }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.APP_KEY,
})(RunningMap);


