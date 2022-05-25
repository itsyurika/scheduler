import React from 'react';
import DayListItem from './DayListItem';

// component responsible for containing and displaying set of daylistitems 
const DayList = (props) => {
  const {days, value, onChange} = props;
  const listedDays = days.map((eachDay) => {
    return (
      <DayListItem 
      key={eachDay.id} 
      name={eachDay.name} 
      spots={eachDay.spots} 
      selected={eachDay.name === value} 
      setDay={()=>onChange(eachDay.name)}
      />
    )
  });
  
  return (
    <ul>
      {listedDays}
    </ul>
  )
};

export default DayList;