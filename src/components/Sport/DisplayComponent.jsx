import React from 'react';
import './DisplayComponent.css';

function DisplayComponent(props) {
    return (
      <div className="DisplayComponent fs-1 h3">
        <span>{props.time.h >= 10 ? props.time.h : "0" + props.time.h}</span>
        <span>&nbsp;:&nbsp;</span>
        <span>{props.time.m >= 10 ? props.time.m : "0" + props.time.m}</span>
        <span>&nbsp;:&nbsp;</span>
        <span>{props.time.s >= 10 ? props.time.s : "0" + props.time.s}</span>
      </div>
    );
}

export default DisplayComponent;