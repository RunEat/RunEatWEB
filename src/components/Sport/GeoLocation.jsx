import React, { Component, setState, useEffect, useState } from "react";
import { render } from "react-dom";
import RunningMap from './RunningMap';


const Geolocation = () => {
//class Geolocation extends Component {
  // state = {
  //   latitude: 2,
  //   longitude: 2,
  //   //error: null,
  //   //lastPosition: null,
  //   coordinates: [
  //     { lat: 40.32718, lng:  -3.7635 },
  //     { lat: 40.32865, lng: -3.7635 },
  //   ]
  // };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coordinates, setCoordinates] = useState([{
    lat: null,
    lng: null,
  }]);
  
  useEffect(() => {
    newPosition()
  }, []) //latitude, longitude??

  const newPosition = () => {
    if (navigator.geolocation) {
      //console.log('navigator.geolocation true')
      navigator.geolocation.watchPosition(function (position) {
        //console.log("Latitude is :", position.coords.latitude);
        //console.log("Longitude is :", position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setCoordinates([
          { lat: position.coords.latitude, lng: position.coords.longitude },
        ]);
        //setCoordinates((prevCoordinates) => ([...prevCoordinates, newCoordinates]))
      });
    } 
  }

  let newCoordinates = {
    lat: 40.35718,
    lng: -3.7735,
  }
  
  const changeCoordinates = () => {
    setCoordinates((prevCoordinates) => (
      // console.log('prevCoordinates', prevCoordinates),
      // console.log('newCordinates', newCoordinates)
      [...prevCoordinates, newCoordinates]
      ));
  }
  
    return (
      <div>
        <h4>latitude: {latitude}</h4>
        <h4>longitude: {longitude}</h4>
        {/* <h4>lastPosition: {this.state.lastPosition}</h4> */}
        <button onClick={changeCoordinates}>Change Coordinates</button>
        <RunningMap 
          lat={latitude} 
          lng={longitude} 
          coordinates={coordinates}
        />
      </div>
    );
  // }
}
  
  export default Geolocation;

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     });
  //     console.log('state didMount', this.state)
  //   }
  // }

  // componentDidUpdate() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //       this.setState({
  //         //{
  //           // ...prevState.latitude,
  //           // ...prevState.longitude,
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //           //coordinates: [...prevState, { lat: position.coords.latitude, lng: position.coords.longitude }]
  //         //};
  //       });
  //     })
  //     console.log('state didUpdate', this.state)
  //   }
  // }



  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 2000,
  //       //maximumAge: 1000,
  //       distanceFilter: 1,
  //     }
  //   );

  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     const lastPosition = JSON.stringify(position);
  //     console.log(lastPosition);
  //     this.setState({ lastPosition });
  //   });
  // }

  // componentDidUpdate() {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.setState({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => this.setState({ error: error.message }),
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 2000,
  //         //maximumAge: 1000,
  //         distanceFilter: 1,
  //       }
  //     );
  
  //     this.watchID = navigator.geolocation.watchPosition((position) => {
  //       const lastPosition = JSON.stringify(position);
  //       console.log('didUpdate', lastPosition);
  //       this.setState({ lastPosition });
  //     });
  //   }

  // componentWillUnmount() {
  //   window.navigator.geolocation.clearWatch(this.watchId);
  // }

  // render() {
    // console.log("this.watchID", this.watchID);
    // console.log("this.state.lastPosition", this.state.lastPosition);
    // console.log("this.state.latitude", this.state.latitude);
    // console.log("this.state.longitude", this.state.longitude);


