import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
  ]).then((response) => {
    setState(prev => ({...prev,
      days: response[0].data,
      appointments: response[1].data,
      interviewers: response[2].data
    }));
    console.log("interviewers: ", response[2].data);
  }).catch((e)=>{console.log("error occurred during promise All :" , e)});
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map((appointment)=> {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
      />
    )
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm"/> 
      </section>
    </main>
  );
}
