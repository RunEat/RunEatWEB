import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';
import haversine from "haversine";

let totalDistance = 0;
let totalDistanceArr = [];

const mapStyles = {
  width: '100%',
  height: '50%'
};

const RunningMap = (props) => {
  const myLatLng = { lat: props.lat, lng: props.lng };
  //console.log("myLatLng", myLatLng)

  const [meters, setMeters] = useState();

  const coordinates = props?.coordinates;
  console.log("coordinates", coordinates);

  // useEffect(() => {
  //     const start = {
  //       latitude: props.coordinates[0]?.lat,
  //       longitude: props.coordinates[0]?.lng,
  //     };
  //     console.log(start);
  //     const end = {
  //       latitude: props.coordinates[props.coordinates?.length - 1]?.lat,
  //       longitude: props.coordinates[props.coordinates?.length - 1]?.lng,
  //     };
  //     console.log(end);

  //     start &&
  //       end &&
  //       setMeters(haversine(start, end, { unit: "meter" }));
  // }, [coordinates]);


  useEffect(() => {
    const start = {
      latitude: props.coordinates[props.coordinates?.length - 2]?.lat,
      longitude: props.coordinates[props.coordinates?.length - 2]?.lng,
    };
    //console.log(start);
    const end = {
      latitude: props.coordinates[props.coordinates?.length - 1]?.lat,
      longitude: props.coordinates[props.coordinates?.length - 1]?.lng,
    };
    //console.log(end);

    let distanceBetweenCoords = haversine(start, end, { unit: "meter" });
    // while () {
    !distanceBetweenCoords
      ? (distanceBetweenCoords = 0)
      : (totalDistance += distanceBetweenCoords);
    totalDistanceArr.push(distanceBetweenCoords)
    // }
    //   distanceBetweenCoords > totalDistance
    // )
    //   ? (totalDistance += distanceBetweenCoords)
    //   : totalDistance;
    
    console.log('distanceBetweenCoords', distanceBetweenCoords)
    
    start && end && setMeters(Number(totalDistance.toFixed(1)));
    //console.log('meters useEffect', meters)
  }, [coordinates]);
  
  // console.log(haversine(start, end))
  console.log('global meters', meters)
  //console.log('totalDistance', totalDistance)
  //console.log('totalDistanceArr', totalDistanceArr)

  return (
    <div className="RunningMap">
      <Map
        google={props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={{
          lat: 40.3579028,
          lng: -3.790206,
        }}
      >
        <Marker position={myLatLng} />
        <Polyline path={coordinates} options={{ strokeColor: "#85ef47" }} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.APP_KEY,
})(RunningMap);


