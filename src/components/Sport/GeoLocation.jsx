import React, { Component } from "react";
import { render } from "react-dom";
import RunningMap from './RunningMap';

class Geolocation extends Component {
  state = {
    latitude: 40.32718,
    longitude: 	-3.7635,
    error: null,
    lastPosition: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 1,
      }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      console.log(lastPosition);
      this.setState({ lastPosition });
    });
      let latitudeNow;
      let longitudeNow;
      if (navigator.geolocation) {
        const hello = navigator.geolocation.watchPosition(
        function(position) {
            latitudeNow = position.coords.latitude
            // longitudeNow = position.coords.longitude
            console.log('position fn', latitudeNow, longitudeNow)
            return latitudeNow
        })
          // function(error) {
            //   console.error("Error Code = " + error.code + " - " + error.message);
            // });
        console.log('hello', hello)
      console.log('position prevState', latitudeNow, longitudeNow)

      this.setState({
        latitude: latitudeNow,
        longitude: longitudeNow
      })
      console.log('position after setState', latitudeNow, longitudeNow)
    }
  }

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function (position) {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });
  //     console.log('state', this.state)
  //   }
  // }

  componentDidUpdate() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => this.setState({ error: error.message }),
        {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 1000,
          distanceFilter: 1,
        }
      );
  
      this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position);
        console.log('didUpdate', lastPosition);
        this.setState({ lastPosition });
      });
    }

  componentWillUnmount() {
    window.navigator.geolocation.clearWatch(this.watchId);
  }

  // componentDidUpdate() {
  //     this.setState({
  //       latitude: latitudeNow,
  //       longitude: longitudeNow
  //     })
  //   }

  render() {
    console.log("this.watchID", this.watchID);
    console.log("this.state.lastPosition", this.state.lastPosition);
    console.log("this.state.latitude", this.state.latitude);
    console.log("this.state.longitude", this.state.longitude);
    return (
      <div>
        <h4>latitude: {this.state.latitude}</h4>
        <h4>longitude: {this.state.longitude}</h4>
        <h4>lastPosition: {this.state.lastPosition}</h4>
        <RunningMap lat={this.state.latitude} lng={this.state.longitude} />
      </div>
    );
  }
}

export default Geolocation;