import { useEffect, useReducer } from 'react';
import axios from "axios";

// all data handling for the application occurs through this custom hook 

export default function useApplicationData (initial) {

  const initialState = {
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  };

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY:
        return {...state, day:action.day }
      case SET_APPLICATION_DATA:
        return {...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
      case SET_INTERVIEW:
        return {...state, appointments:action.appointments, days:action.days}
      default:
        throw new Error (`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }

  // function to instantenously update spots remaining without needing to refresh the page
  const updateSpots = function(state, appointments) {
      
    const index = state.days.findIndex(eachDay => eachDay.name === state.day);
    const day = state.days[index];
    
    let spots = 0;
    for (const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) spots++
    };
  
    const newDay = {...day, spots: spots};
    const newDays = [...state.days];
    newDays[index] = newDay;
  
    return newDays;
  };

  const setDay = day => dispatch({type:SET_DAY, day});

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
  ]).then((response) => {
    dispatch({type:SET_APPLICATION_DATA, days:response[0].data, appointments:response[1].data, interviewers:response[2].data});
  }).catch((error)=>{console.log("error occurred fetching api data: ", error)});
  }, []);

  // updates server with new interview data upon saving a new appointment 
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
      // setState({...state, appointments, days});
      dispatch({ type: SET_INTERVIEW, appointments, days })
    });
  };

  //updates server with new interview daya (null) upon cancelling an existing appointment 
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
    dispatch({ type: SET_INTERVIEW, appointments, days })
    });
  };

  return {state, setDay, bookInterview, cancelInterview}
}