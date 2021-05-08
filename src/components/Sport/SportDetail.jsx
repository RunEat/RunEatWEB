import React, { useEffect, useState } from 'react';
import { formatedDate } from '../../constants/FormatedDate';
import Navbar from '../Navbar/Navbar';
import './SportDetail.css'
import SyncLoader from "react-spinners/SyncLoader";
import { useDate } from "../../hooks/useDateContext";
import { getDiary } from '../../services/DiaryService';
import { Redirect, useHistory } from 'react-router';
import { useUser } from '../../hooks/useUserContext';
import { createSport } from '../../services/SportService';

const SportDetail = () => {
  // const { calories, distance, pace } = sport;
  // let { date } = sport;
  const { date, setDate } = useDate();
  const { push } = useHistory();
  const { user } = useUser();

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

  const deleteActivity = () => {
    const newSport = {
      chronometer: {
          startTime: null,
          endTime: null
      },
      distance: null,
      date: new Date(),
      user: user.id,
      pace: null,
      caloriesBurned: null,
    };

    createSport(newSport)
        .then(() => {
          push('/sport')
        })
  }

  return (
    !sport ? (
      <div className="text-center">
        <SyncLoader color="#00BD56" />
      </div>
    ) : (
        sport?.chronometer.startTime == null ? (
          <>
          <h1 className="SportDetail text-center mt-4 mb-5">{formatedDate(sport.date)}</h1>
            <div className="card text-center bg-light p-3 mx-4">
              <h1 className="mb-4">Activity Summary</h1>
              <div>
                <h4>No activity registered for this day.</h4>
              </div>
            </div>
            <div className="text-center mt-4">
              <button 
                className="btn newActivity w-50 text-white mb-1"
                onClick={deleteActivity}
              >
                Go for a run today!
              </button>
              <p className="mt-2">
                <small className="text-secondary">
                  <i className="fas fa-exclamation-triangle fs-5 d-inline mx-1"></i>
                  <b>Attention!</b> 
                  <br/> 
                  This will overwrite any activity you logged for today.
                </small>
              </p>
            </div>
              <Navbar />
          </>
        ): (
          <>
            <h1 className="text-center mt-4 mb-4">{formatedDate(sport.date)}</h1>
            <div className="SportDetail card text-center bg-light p-3 mx-4">
              <h1 className="mb-4">Activity Summary</h1>
              <div>
                <h4>Distance </h4>
                <h1 className="result my-0">{sport.distance?.toFixed(1)}</h1>
                <h5>km</h5>
              </div>
              <div className="my-4">
                <h4>Calories</h4>
                <h1 className="result my-0">{sport?.calories || 0}</h1>
                <h5>burned</h5>
              </div>
              <div>
                <h4>Average Pace </h4>
                <h1 className="result my-0">{sport.pace?.toFixed(1) || 0}</h1>
                <h5>min / km</h5>
              </div>
            </div>
            <div className="text-center mt-4">
              <button 
                className="btn btn-danger deleteActivity w-50 text-white mb-1"
                onClick={deleteActivity}
              >
                Start new activity
              </button>
              <p className="mt-2">
                <small className="text-secondary">
                  <i className="fas fa-exclamation-triangle fs-5 d-inline mx-1"></i>
                  <b>Attention!</b> 
                  <br/> 
                  This will overwrite the activity you logged for today.
                </small>
              </p>
            </div>
            <Navbar />
        </>
        )
  )
  );
};
export default SportDetail;