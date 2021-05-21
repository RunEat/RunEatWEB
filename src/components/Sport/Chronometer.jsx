import React, {useEffect, useState} from 'react';
import BtnComponent from './BtnComponent';
import DisplayComponent from './DisplayComponent';
import Geolocation from './GeoLocation';
import { useDistance } from "../../hooks/useDistanceContext";
import { useUser } from "../../hooks/useUserContext";
import { caloriesBurned } from "../../Utils/CalculateCalories";
import { createSport } from '../../services/SportService';
import './Chronometer.css'
import { useHistory } from "react-router-dom";

const Chronometer = () => {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setinterv] = useState()
    const [status, setStatus] = useState(0);
    const { push, replace } = useHistory();
    const { distance, setDistance } = useDistance();
    const { user } = useUser();
    const start = () => {
        run()
        setinterv(setInterval(run, 1000))
        setStatus(1)
        //getLocationUpdate();   //Activamos geolocalización
    }
    let updateH = time.h, updateM = time.m, updateS = time.s
    const run = () => {
        if (updateM === 60) {
            updateH++
            updateM = 0
        }
        if (updateS === 60) {
            updateM++
            updateS = 0
        }
        updateS++
        return setTime({ s: updateS, m: updateM, h: updateH });
    }
    const stop = () => {
        clearInterval(interv)
        setStatus(2)
        //clearInterval desactivamos la localización
    };
    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ s: 0, m: 0, h: 0 });
    };
    const resume = () => start();
    const addResult = () => {
        const newSport = {
            chronometer: {
                startTime: new Date(),
                endTime: new Date()
            },
          distance: distance,
          date: new Date(),
          user: user.id,
          pace: runningTime() / distance,
          caloriesBurned: caloriesBurned(user, distance),
        };
        createSport(newSport)
          .then(() => {
              //console.log('sport', newSport)
              push('/sport-details');
            })
    }
    const runningTime = () => {
        let seconds = time?.s / 60
        let hours = time?.h * 60
        let total = time?.m + seconds + hours;
        return total
    }
    //console.log('runningTime', runningTime())
    //console.log("distanceChrono", distance);
    return (
       <div className="Chronometer text-center mt-2 px-0 bg-light">
         <div className="clock-holder">
           <div className="stopwatch">
             <DisplayComponent time={time} />
             <div className="d-flex justify-content-evenly">
              <p>Distance <br/><span className="h1">{distance?.toFixed(1)}</span> <br/>km</p>
              <p>Calories <br/><span className="h1">{user && caloriesBurned(user, distance)}</span> <br/> burned</p>
              <p>Pace <br/> <span className="h1">{runningTime() > 0.1 && distance > 0.001 && (runningTime()/distance).toFixed(1) || 0}</span> <br/> min/km</p>
             </div>
             <BtnComponent
               start={start}
               reset={reset}
               stop={stop}
               resume={resume}
                status={status}
                addResult={addResult}
             />
           </div>
         </div>
        <Geolocation className="Geolocation" status={status} />
       </div>
     );
}
export default Chronometer;