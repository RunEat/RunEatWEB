import React, { useEffect, useState } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import { formatedDate } from '../../constants/FormatedDate';
import { useDate } from "../../hooks/useDateContext";
import { getDiary } from '../../services/DiaryService';
import Navbar from '../Navbar/Navbar';
import './SportDetail.css'

const SportDetail = () => {
  const [sport, setSport] = useState();
  const { date, setDate } = useDate();

  useEffect(() => {
    getDiary(date)
      .then((diary) => {
        //console.log("diary.sport", diary.sport);
        setSport(diary.sport);
        //console.log("diaryCompleted", diary);
        console.log("sport", sport);
      });
  }, [date]);

  return (
    !sport ? (
      <div className="text-center">
      <SyncLoader color="#00bd56" />
      </div>
    ) : (
      <div className="SportDetail container text-center h-100">
        <h1>{formatedDate(sport.date)}</h1>
        <h1 className="">Activity Summary</h1>
        <h4>Distance </h4>
        <h3>{sport.distance || 0}</h3>
        <h4>Calories Burned </h4>
        <h3>{sport.alories || 0}</h3>
        <h4>Average Pace </h4>
        <h3>{sport.pace || 0}</h3>
        <button className="btn">New Activity</button>
        <p><small>This will override the activity you registered for today</small></p>
        <img />
        <Navbar />
      </div>
    )
  );
};

export default SportDetail;