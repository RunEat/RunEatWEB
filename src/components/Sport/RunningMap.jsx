import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';
import haversine from "haversine";
import {useDistance} from '../../hooks/useDistanceContext'

let totalDistance = 0;
const mapStyles = {
  width: '100%',
  height: '50%'
};

const RunningMap = (props) => {
  const myLatLng = { lat: props.lat, lng: props.lng };
  //console.log("myLatLng", myLatLng)

  const {distance, setDistance} = useDistance()

  //const [distance, setDistance] = useState();

  const coordinates = props?.coordinates;

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


