import React from 'react';

function BtnComponent(props) {
    return (
      <div className="main-section">
        {props.status === 0 ? (
          <button className="btn btn-primary" onClick={props.start}>
            Start
          </button>
        ) : (
          ""
        )}
        {props.status === 1 ? (
          <div>
            <button className="btn btn-danger" onClick={props.stop}>
              Stop
            </button>
            <button className="btn btn-info" onClick={props.reset}>
              Reset
            </button>
          </div>
        ) : (
          ""
        )}
        {props.status === 2 ? (
          <div>
            <button className="btn btn-success" onClick={props.resume}>
              Resume
            </button>
            <button className="btn btn-warning" onClick={props.reset}>
              Reset
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
}

export default BtnComponent;