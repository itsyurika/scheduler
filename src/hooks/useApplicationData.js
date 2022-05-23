import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData (initial) {

  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  const updateSpots = function(state, appointments) {
      
    const index = state.days.findIndex(eachDay => eachDay.name === state.day);
    const day = state.days[index]
    
    let spots = 0 
    for (const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) spots++
    }
  
    const newDay = {...day, spots: spots}
    const newDays = [...state.days]
    newDays[index] = newDay;
  
    return newDays;
  };

  const setDay = day => setState({...state, day});

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

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      const days = updateSpots(state, appointments)
      setState({...state, appointments, days});
    })

  }

  function cancelInterview(id) {
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
      const days = updateSpots(state, appointments)
     setState({...state, appointments, days});
    })
  }

  return {state, setDay, bookInterview, cancelInterview}
}