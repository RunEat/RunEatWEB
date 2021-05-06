import React from 'react';
import './BtnComponent.css'

function BtnComponent(props) {
    return (
      <div className="BtnComponent main-section">
        {props.status === 0 ? (
          <button className="btn text-white" onClick={props.start}>
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
            <button className="btn btn-success" onClick={props.resume}>
              <b>Resume</b>
            </button>
            <button className="btn btn-warning" onClick={props.reset}>
              <b>Reset</b>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
}

export default BtnComponent;