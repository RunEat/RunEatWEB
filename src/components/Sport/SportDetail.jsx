import React from 'react';
import Navbar from '../Navbar/Navbar';

const SportDetail = ({sport}) => {
  return (
    <div>
      <h1>Sport Detail</h1>
      <h1>{sport.distance}</h1>
      <Navbar />
    </div>
  );
};

export default SportDetail;