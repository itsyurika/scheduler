// sets of selector heler functions that parses server data and returns selected appointments/interview/interviewer info in a correct format.

export function getAppointmentsForDay ({days, appointments} = {}, day) {
  if (days.length === 0) return [];

  const foundDay = days.find(eachDay => eachDay.name === day);

  if (!foundDay) return [];
  
  return foundDay.appointments.map(appointmentId => appointments[appointmentId]);
};

export function getInterview ({interviewers} = {}, interview) {
  if (!interview) return null;

  const interviewerId = interview.interviewer;

  return interview = {...interview, interviewer:interviewers[interviewerId]};
};

export function getInterviewersForDay ({days, interviewers} = {}, day) {
  if (days.length === 0) return [];

  const foundDay = days.find(eachDay => eachDay.name === day);

  if (!foundDay) return [];
  
  return foundDay.interviewers.map(interviewerId => interviewers[interviewerId]);
};
