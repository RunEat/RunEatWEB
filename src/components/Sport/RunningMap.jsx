import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50%'
};

class RunningMap extends Component {
  // constructor() {
  //   super();
    state = {
      name: "React",
      coordinates: [{ lat: this.props.lat, lng: this.props.lng }]
    };
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
      this.setState({
        coordinates: { lat: this.props.lat, lng: this.props.lng }
      });
    }
  }
  
  render() {
    const myLatLng = [{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }];
    console.log("myLatLng", myLatLng);
  //   const pathCoordinates = [
  //     { lat: this.props.lat, lng: this.props.lng },
  //     { lat: 40.32718, lng: -3.7635 }
  // ];
    
    console.log('state Running Map', this.state)

    return (
      <div className="RunningMap">
        <Map
          google={this.props.google}
          zoom={17}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
        >
          <Marker position={myLatLng} name={"This is test name"} />
          <Polyline
            path={this.state.coordinates}
            options={{ strokeColor: "green" }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.APP_KEY,
})(RunningMap);