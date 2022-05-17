import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const {days, day, setDay} = props;
  const listedDays = days.map((eachDay) => {
    return (
      <DayListItem 
      key={eachDay.id} 
      name={eachDay.name} 
      spots={eachDay.spots} 
      selected={eachDay.name === day} 
      setDay={setDay}/>
    )
  })
  return (
    <ul>
      {listedDays}
    </ul>
  )
};

export default DayList;