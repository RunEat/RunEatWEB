import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from "react-google-maps";

class Map extends React.Component {
  path = [
    { lat: 40.41465, lng: -3.7004 },
    { lat: 40.4030301, lng: -3.6927541 },
    { lat: 40.409443, lng: -3.7128516 },
    { lat: 40.4160768, lng: -3.7238105},
    { lat: 40.4172483, lng: -3.7384516}
];

  render = () => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 40.41465, lng: -3.7004 }}
      >
        <Polyline path={this.path} options={{ strokeColor: "#85ef47" }} />
      </GoogleMap>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px`, width: "100vw" }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);