import React, { useEffect, useState } from "react";
import { useDate } from "../../hooks/useDateContext";
import { useUser } from "../../hooks/useUserContext";
import SyncLoader from "react-spinners/SyncLoader";
import Chronometer from "./Chronometer";
import Navbar from "../Navbar/Navbar";
import { getDiary } from "../../services/DiaryService";
import './Sport.css';
import SportDetail from "./SportDetail";

const Sport = () => {
  const { user, setUser } = useUser();
  const { date, setDate } = useDate();
  const [sport, setSport] = useState();
  //console.log("date", date);
  useEffect(() => {
    console.log("useEffect");
    getDiary(date).then((diary) => {
      //console.log("diary.sport", diary.sport);
      setSport(diary.sport);
      //console.log("diaryCompleted", diary);
      //console.log("sport", sport);
    });
  }, [date]);
  return !date ? (
    <div className="text-center">
      <SyncLoader color="#00BD56" />
    </div>
  ) : ( sport?.chronometer.startTime !== null && sport ? (
      // <h1>Calories burned {sport.calories}</h1>
      <SportDetail />
    ) : (
    <div className="Sport d-flex flex-column bg-light h-100">
      <Chronometer />
      <Navbar />
    </div>)
  );
};
export default Sport;