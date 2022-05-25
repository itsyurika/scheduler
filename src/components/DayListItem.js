import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

//components responsible for displaying each day with available interview spot info
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
};

const DayListItem = (props) => {
  const { selected, spots, setDay, name } = props;

  const dayClass = classNames("day-list__item", 
  {
    " day-list__item--selected": selected, 
    " day-list__item--full": spots === 0
  });

  return (
    <li onClick={setDay} className={dayClass} selected={selected} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

export default DayListItem;