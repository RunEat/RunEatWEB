import React, {useEffect, useState} from 'react';
import BtnComponent from './BtnComponent';
import DisplayComponent from './DisplayComponent';
import Geolocation from './GeoLocation';
import { useDistance } from "../../hooks/useDistanceContext";
import { useUser } from "../../hooks/useUserContext";
import { caloriesBurned } from "../../Utils/CalculateCalories";
import { createSport } from '../../services/SportService';

function Chronometer() {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setinterv] = useState()
    const [status, setStatus] = useState(0);

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
            .then((sport) => console.log ('sport', sport))  
    }

    const runningTime = () => {
        let seconds = time?.s / 60
        let hours = time?.h * 60
        let total = time?.m + seconds + hours;
        return total
    }

    console.log('runningTime', runningTime())
    console.log("distanceChrono", distance);

    return (
       <div className="container text-center mt-5">
         <div className="clock-holder">
           <div className="stopwatch">
             <DisplayComponent time={time} />
             <BtnComponent
               start={start}
               reset={reset}
               stop={stop}
               resume={resume}
                status={status}
                addResult={addResult}
             />
             <p>Distance: {distance?.toFixed(1)} km</p>
             <p>Burned Calories: {user && caloriesBurned(user, distance)}</p>
             <p>Pace: {runningTime() > 0.1 && distance > 0.001 && (runningTime()/distance).toFixed(0)} min/km</p>
             <Geolocation status={status} />
           </div>
         </div>
       </div>
     );
}

export default Chronometer;