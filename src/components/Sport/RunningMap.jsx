import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50%'
};

class RunningMap extends Component {
   render() {
    const myLatLng = [{ lat: this.props.lat, lng: this.props.lng }];
    console.log("myLatLng", myLatLng);
    console.log('state Running Map', this.state)

     const coordinates = [this.props.coordinates];
    //  { lat: 40.32718, lng: -3.7635 }

    console.log('coordinates Map', coordinates)

    return (
      <div className="RunningMap">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
        >
          <Marker position={myLatLng} />
          <Polyline path={coordinates} options={{ strokeColor: "green" }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.APP_KEY,
})(RunningMap);


