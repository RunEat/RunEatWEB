import React from 'react';
import './BtnComponent.css'

function BtnComponent(props) {
    return (
      <div className="BtnComponent main-section mb-3">
        {props.status === 0 ? (
          <button className="btn startStopBtn text-white" onClick={props.start}>
            <b>Start</b>
          </button>
        ) : (
          ""
        )}
        {props.status === 1 ? (
          <div>
            <button className="btn btn-danger" onClick={props.stop}>
              <b>Stop</b>
            </button>
            <button className="btn btn-info" onClick={props.reset}>
              <b>Reset</b>
            </button>
          </div>
        ) : (
          ""
        )}
        {props.status === 2 ? (
          <div>
            <button className="btn btn-info my-1" onClick={props.resume}>
              <b>Resume</b>
            </button>
            <button className="btn btn-warning my-1" onClick={props.reset}>
              <b>Reset</b>
            </button>
            <button className="btn startStopBtn text-white mt-2" onClick={props.addResult}>
              <b>Finish Run</b>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
}

export default BtnComponent;