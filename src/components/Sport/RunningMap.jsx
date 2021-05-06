import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline  } from 'google-maps-react';
import haversine from "haversine";

const mapStyles = {
  width: '100%',
  height: '50%'
};

const RunningMap = (props) => {
    const myLatLng = { lat: props.lat, lng: props.lng };
    //console.log("myLatLng", myLatLng)

    const coordinates = props?.coordinates
    console.log('coordinates', coordinates)
    
    useEffect(() => {
      const start = {
        latitude: props?.coordinates[0].lat,
        longitude: props?.coordinates[0].lng
      }
      console.log(start)
      const end = {
        latitude: props?.coordinates[props?.coordinates.length - 1].lat,
        longitude: props?.coordinates[props?.coordinates.length - 1].lng
      }
      console.log(end)

      start && end && console.log('haversine', haversine(start, end, {unit: 'meter'}))
    }, [coordinates])

      // console.log(haversine(start, end))
      // console.log(haversine(start, end, {unit: 'meter'}))
      
    
      

    return (
      <div className="RunningMap">
        <Map
          google={props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={{
            lat: 40.4521205,
            lng: -3.6997216,
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


