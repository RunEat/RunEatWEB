import React, {useState} from 'react';
import BtnComponent from './BtnComponent';
import DisplayComponent from './DisplayComponent';

function Chronometer() {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setinterv] = useState()
    const [status, setStatus] = useState(0);

    const start = () => {
        run()
        setStatus(1)
        setinterv(setInterval(run, 1000))
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
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ s: 0, m: 0, h: 0 });
    };

    const resume = () => start();

     return (
      <div className="text-center bg-info">
        <div className="clock-holder">
                <div className="stopwatch">
                    <DisplayComponent time={time}/>
                     <BtnComponent start={start} reset={reset} stop={stop} resume={resume} status={status} />
                     <p>Distancia</p>
                     <p>(Tiempo/distancia) pace</p>
                     <p></p>
                         
               </div>
        </div>
      </div>
    );
}

export default Chronometer;