import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './CalendarDiary.css'

function CalendarDiary() {
  const [date, setDate] = useState(new Date());
  
  const onChange = (date) => setDate(date);

  console.log(date.toISOString())

    return (
      <div>
        <Calendar onChange={onChange} value={date} />
      </div>
    );
}

export default CalendarDiary;
