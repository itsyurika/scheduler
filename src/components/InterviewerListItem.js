import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

const InterviewerListItem = (props) => {

  const { selected, setInterviewer, avatar, name } = props;

  const interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": selected
  })

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;