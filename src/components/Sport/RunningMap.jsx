import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import haversine from "haversine";
import { useDistance } from '../../hooks/useDistanceContext'

let totalDistance = 0;
const mapStyles = {
  width: '100%',
  height: '75%'
};
const RunningMap = (props) => {
  const myLatLng = { lat: props.lat, lng: props.lng };
  //console.log("myLatLng", myLatLng)
  const coordinates = props?.coordinates;
  const {distance, setDistance} = useDistance()
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
    !distanceBetweenCoords
      ? (distanceBetweenCoords = 0)
      : (totalDistance += distanceBetweenCoords);
    //console.log('distanceBetweenCoords', distanceBetweenCoords)
    start && end && setDistance(Number((totalDistance/1000).toFixed(3)));
  }, [coordinates]);
  //console.log('distanceMap', distance)
  return (
    // OLD MAP
    // myLatLng.lat && myLatLng.lng &&
    // <div className="RunningMap">
    //   <Map
    //     class
    //     google={props.google}
    //     zoom={18}
    //     style={mapStyles}
    //     initialCenter={myLatLng}
    //   >
    //     <Marker position={myLatLng} />
    //     <Polyline path={coordinates} options={{ strokeColor: "#85EF47" , width: "20rem"}} />
    //   </Map>
    // </div>
    // NEW MAP
    !myLatLng.lat
    // && myLatLng.lat == 40.3926635
    && !myLatLng.lng
    // && myLatLng.lng == -3.7006367
    && props.status === 1
    ? (
      <div className="LoadingMap mt-5">
        <h1>Activity started!</h1>
        <p>Loading map...</p>
        <p>Start running!</p>
        <img src="../../../images/gif-running.gif" className="img-fluid"/>
      </div>
    ) : (
      // myLatLng.lat && myLatLng.lng &&
      <div className="RunningMap">
        <Map
          class
          google={props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={myLatLng}
        >
          <Marker position={myLatLng} />
          <Polyline path={coordinates} options={{ strokeColor: "#85EF47" , width: "20rem"}} />
        </Map>
      </div>
    )
  );
}
export default GoogleApiWrapper({
  apiKey: process.env.APP_KEY || 'AIzaSyBX68rAdqKraDnrCUgkWmZwGUgHqBjeRv0',
})(RunningMap);

