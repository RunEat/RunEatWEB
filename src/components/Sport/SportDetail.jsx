import React from 'react';
import { formatedDate } from '../../constants/FormatedDate';
import Navbar from '../Navbar/Navbar';
import './SportDetail.css'

const SportDetail = ({sport}) => {
  const { calories, distance, pace } = sport;
  let { date } = sport;

  return (
    <div className="SportDetail container text-center h-100">
      <h1>{formatedDate(date)}</h1>
      <h1 className="">Activity Summary</h1>
      <h4>Distance </h4>
      <h3>{distance && 0}</h3>
      <h4>Calories Burned </h4>
      <h3>{calories || 0}</h3>
      <h4>Average Pace </h4>
      <h3>{pace || 0}</h3>
      <Navbar />
    </div>
  );
};

export default SportDetail;