import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50%'
};

class RunningMap extends Component {
   render() {
    const myLatLng = { lat: this.props.lat, lng: this.props.lng };
    console.log("myLatLng", myLatLng);
    console.log('state Running Map', this.state)

    const coordinates = [myLatLng, { lat: 40.3592021, lng: -3.7797249 }];

    console.log('coordinates Map', coordinates)

    return (
      <div className="RunningMap">
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={{
            lat: 40.3562266,
            lng: -3.7796867,
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


