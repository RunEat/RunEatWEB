import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '50%'
};

class RunningMap extends Component {
  // constructor() {
  //   super();
    state = {
      name: "React"
    };
  // }
  
  render() {
    return (
      <div className="RunningMap">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 40.41465,
            lng: -3.7004,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCPg33d2PBzd7NNOwlcfCUO9y3QJyhhd9M",
})(RunningMap);