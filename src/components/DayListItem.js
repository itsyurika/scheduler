import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = (spot) => {
  if (spot === 0) {
    return (`no spots remaining`);
  }
  if (spot === 1) {
    return (`1 spot remaining`);
  }
  if (spot > 1) {
    return (`${spot} spots remaining`);
  }
}

const DayListItem = (props) => {

  const dayClass = classNames("day-list__item", 
  {
    " day-list__item--selected": props.selected, 
    " day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={props.setDay} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

export default DayListItem;