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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({...state, appointments});

    console.log("interview data: ", interview);
    console.log("appointment data: ", appointment);

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      console.log("response from axios put request: ", response);
      setState({...state, appointments});
    })
    .catch((error) => {console.log("error while updating the server with new appointment: ", error)});
  }

  function cancelInterview(id) {
    console.log("id: ", id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then((response) => {
     setState({...state, appointments});
    })
    .error((error) => {console.log("error while deleting item in server: ", error)})
  }

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
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
