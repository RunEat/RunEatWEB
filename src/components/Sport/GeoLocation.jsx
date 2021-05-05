import React, { Component } from "react";
import { render } from "react-dom";
import RunningMap from './RunningMap';

class Geolocation extends Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
    lastPosition: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000,  maximumAge: 1000 },
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position)
      console.log(lastPosition)
      this.setState({lastPosition})
    },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1 }
    )
    //   let latitudeNow;
    //   let longitudeNow;
    //   if (navigator.geolocation) {
    //     const hello = navigator.geolocation.watchPosition( 
    //     function(position) {
    //         latitudeNow = position.coords.latitude
    //         // longitudeNow = position.coords.longitude
    //         console.log('position fn', latitudeNow, longitudeNow)
    //         return latitudeNow
    //     })
    //       // function(error) {
    //         //   console.error("Error Code = " + error.code + " - " + error.message);
    //         // });
    //     console.log('hello', hello)
    //   console.log('position prevState', latitudeNow, longitudeNow)

    //   this.setState({
    //     latitude: latitudeNow,
    //     longitude: longitudeNow
    //   })
    //   console.log('position after setState', latitudeNow, longitudeNow)  
    // }
  }
    
  componentWillUnmount() {

    window.navigator.geolocation.clearWatch(this.watchId)

  }

  // componentDidUpdate() {
  //     this.setState({
  //       latitude: latitudeNow,
  //       longitude: longitudeNow
  //     }) 
  //   }

  render() {
    return (
      <div>
        <h4>{this.state.latitude}</h4>
        <h4>{this.state.longitude}</h4>
        <RunningMap lat={this.state.latitude} lng={this.state.longitude}/>
      </div>
    );
  }
}

export default Geolocation;