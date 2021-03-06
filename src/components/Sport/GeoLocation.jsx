// import React, { Component, setState, useEffect, useState } from "react";
// import { google } from 'google-maps-react';
// import { render } from "react-dom";
// import RunningMap from './RunningMap';
// let interval = null;

// const Geolocation = ({status}) => {
    
//   console.log ('status', status)

//   const [latitude, setLatitude] = useState(40.3926635);
//   const [longitude, setLongitude] = useState(-3.7006367);
//   const [coordinates, setCoordinates] = useState([]);
//   // const [position, setPosition] = useState(null)

//   function showLocation(position) {
//     //console.log('latitude', position.coords.latitude)
//     //console.log('longitude', position.coords.longitude)
//     //console.log('navigator.geolocation', navigator.geolocation)
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude);
//     setCoordinates((prevCoordinates) => 
//       (prevCoordinates.includes({ lat: position.coords.latitude, lng: position.coords.longitude }) !== -1) ?
//         [...prevCoordinates, { lat: position.coords.latitude, lng: position.coords.longitude }] : [...prevCoordinates]   
//     );
//   }

//   console.log('coordinates', coordinates)

//   function errorHandler(err) {
//     if (err.code == 1) {
//       alert("Error: Access is denied!");
//     } else if (err.code == 2) {
//       alert("Error: Position is unavailable!");
//     }
//   }

//   function getLocationUpdate() {
//     if (navigator.geolocation) {
//       // timeout at 120000 milliseconds (120 seconds)
//       var options = { timeout: 120000, maximumAge: 1000, enableHighAccuracy: true};
//       let geoLoc = navigator.geolocation;
//       //console.log('interval', interval)
//       interval = setInterval(() => {
//         //let watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
//         let watchID = geoLoc.getCurrentPosition(showLocation, errorHandler, options);
//      }, 5000)
//     } else {
//       alert("Sorry, browser does not support geolocation!");
//     }
//   }
  
//   //newPosition();
//   useEffect(() => {
//     if (status === 1) {
//       getLocationUpdate()      //START 
//     }
//     if (status === 2) {
//       //console.log ('interval', interval)      //STOP
//       clearInterval(interval)  
//     }
//   }, [status]);

//   return (
//     <div>
//       {/* <h4>latitude: {latitude}</h4>
//       <h4>longitude: {longitude}</h4> */}
//       {/* <h4>lastPosition: {this.state.lastPosition}</h4> */}
//       {/* <button onClick={changeCoordinates}>Change Coordinates</button> */}
//       <RunningMap 
//         lat={latitude} 
//         lng={longitude} 
//         coordinates={coordinates}
//         status={status}
//         />
//     </div>
//   );
//   // }
// }
  
// export default Geolocation;


import React, { useEffect, useState } from "react";
import RunningMap from "./RunningMap";
let interval = null;
const Geolocation = ({ status }) => {
  //console.log("status", status);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [drawLine, setDrawLine] = useState(false);

  useEffect(() => {
    getLocationUpdate();
  }, [latitude, longitude]);

  function showLocation(position) {
    //console.log('showLocation')
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    if (drawLine) {
      //console.log('start')
      setCoordinates((prevCoordinates) =>
        prevCoordinates.includes({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }) !== -1
          ? [
              ...prevCoordinates,
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            ]
          : [...prevCoordinates]
      );
    }
  }

   useEffect(() => {
     if (status === 1) {
       setDrawLine(true); //START 
     }
     if (status === 2) {
       setDrawLine(true); //STOP
       clearInterval(interval);
     }
     if (status === 0 && drawLine) {
       setDrawLine(false); //START
      }
   }, [status]);

  //console.log('coordinates', coordinates)
  //console.log(latitude, longitude)
  //console.log('status', status)
  //console.log("drawline start", drawLine);
  
  function errorHandler(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
  function getLocationUpdate() {
    if (navigator.geolocation) {
      // timeout at 120000 milliseconds (120 seconds)
      var options = {
        timeout: 120000,
        maximumAge: 1000,
        enableHighAccuracy: true,
      };
      let geoLoc = navigator.geolocation;
      let watchID = geoLoc.getCurrentPosition(
        showLocation,
        errorHandler,
        options
      );
      interval = setInterval(() => {
        watchID = geoLoc.getCurrentPosition(
          showLocation,
          errorHandler,
          options
        );
      }, 10000);
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  }
  

  return (
    <div>
      <RunningMap
        lat={latitude}
        lng={longitude}
        coordinates={coordinates}
        drawLine={drawLine}
      />
    </div>
  );
  // }
};
export default Geolocation;