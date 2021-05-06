import React, {useState} from 'react';
import BtnComponent from './BtnComponent';
import DisplayComponent from './DisplayComponent';
import Geolocation from './GeoLocation';

function Chronometer() {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setinterv] = useState()
    const [status, setStatus] = useState(0);

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

     return (
       <div className="container text-center mt-5">
        <div className="clock-holder">
               <div className="stopwatch">
                    <DisplayComponent time={time}/>
                     <BtnComponent start={start} reset={reset} stop={stop} resume={resume} status={status} />
                     <p>Distance: {}</p>
                     <p>Calories Burned: {}</p>
                     <p>Pace: {}</p> // (Tiempo/distancia)
                     <Geolocation status={status}/>
           </div>
             </div>
        </div>
     );
}

export default Chronometer;