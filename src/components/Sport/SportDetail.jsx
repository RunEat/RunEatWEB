import React, { useEffect, useState } from 'react';
import { formatedDate } from '../../constants/FormatedDate';
import Navbar from '../Navbar/Navbar';
import './SportDetail.css'
import SyncLoader from "react-spinners/SyncLoader";
import { useDate } from "../../hooks/useDateContext";
import { getDiary } from '../../services/DiaryService';
const SportDetail = () => {
  // const { calories, distance, pace } = sport;
  // let { date } = sport;
  const { date, setDate } = useDate();
  const [sport, setSport] = useState();

  useEffect(() => {
    //console.log("useEffect");
    getDiary(date).then((diary) => {
      //console.log("diary.sport", diary.sport);
      setSport(diary.sport);
      //console.log("diaryCompleted", diary);
      //console.log("sport", sport);
    });
  }, [date]);

  deleteActivity(() => {

  })

  return (
    !sport ? (
      <div className="text-center">
        <SyncLoader color="#00BD56" />
      </div>
    ) : (
        sport?.chronometer.startTime == null ? (
          <h4>Calories Burned </h4>
        ): (
          <>
            <h1 className="text-center mt-4 mb-4">{formatedDate(sport.date)}</h1>
            <div className="SportDetailcontainer card text-center bg-light p-3">
              <h1 className="mb-4">Activity Summary</h1>
              <div>
                <h4>Distance </h4>
                <h1 className="result my-0">{sport.distance}</h1>
                <h5>kms</h5>
              </div>
              <div className="my-4">
                <h4>Calories</h4>
                <h1 className="result my-0">{sport.calories || 0}</h1>
                <h5>burned</h5>
              </div>
              <div>
                <h4>Average Pace </h4>
                <h1 className="result my-0">{sport.pace || 0}</h1>
                <h5>min / km</h5>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-danger newActivity w-50 text-white mb-1">Start new activity</button>
              <p><small className="text-secondary">Attention: this will overwrite the activity logged for today.</small></p>
            </div>
            <Navbar />
        </>
        )
  )
  );
};
export default SportDetail;