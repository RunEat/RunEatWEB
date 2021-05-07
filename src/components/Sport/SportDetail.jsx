import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import { formatedDate } from '../../constants/FormatedDate';
import Navbar from '../Navbar/Navbar';
import './SportDetail.css'

const SportDetail = ({sport}) => {
  // const { calories, distance, pace, date } = sport

  console.log('sport', sport)
  return (
    !sport ? (
      <div className="text-center">
      <SyncLoader color="#00bd56" />
      </div>
    ) : (
      <div className="SportDetail container text-center h-100">
        <h1>{formatedDate(date)}</h1>
        <h1 className="">Activity Summary</h1>
        <h4>Distance </h4>
        <h3>{distance || 0}</h3>
        <h4>Calories Burned </h4>
        <h3>{calories || 0}</h3>
        <h4>Average Pace </h4>
        <h3>{pace || 0}</h3>
        <button className="btn">New Activity</button>
        <p><small>This will override the activity you registered for today</small></p>
        <img />
        <Navbar />
      </div>
    )
  );
};

export default SportDetail;