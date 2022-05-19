export function getAppointmentsForDay (state, day) {
  const {days, appointments} = state; //deconstructing for better readability
  console.log("days :", days);
  console.log("appointments", appointments);
  
  const filteredDay = days.filter(eachDay => eachDay.name === day)
  console.log("filtered Day : ", filteredDay);

  if (filteredDay.length === 0 || days.length === 0) {return []};

  const appointmentsArray = filteredDay[0].appointments;
  console.log("appointmentsArray :" , appointmentsArray);
  
  const parsedAppointments = appointmentsArray.map((appointmentId => {
    const id = appointmentId.toString()
    console.log("appointments : ", appointments[id]);
    return appointments[id];
  }));
  console.log(parsedAppointments);
  return parsedAppointments;
}
