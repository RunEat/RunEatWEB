import React from 'react';
import './BtnComponent.css';

function DisplayComponent(props) {
    return (
      <div className="py-2 fs-1">
        <span>{props.time.h >= 10 ? props.time.h : "0" + props.time.h}</span>
        &nbsp;:&nbsp;
        <span>{props.time.m >= 10 ? props.time.m : "0" + props.time.m}</span>
        &nbsp;:&nbsp;
        <span>{props.time.s >= 10 ? props.time.s : "0" + props.time.s}</span>
      </div>
    );
}

export default DisplayComponent;