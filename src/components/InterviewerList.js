import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

const InterviewerList = (props) => {
  const {interviewers, interviewer, setInterviewer} = props;
  const eachInterviewer = interviewers.map((interviewerPerson) => {
    return(
      <InterviewerListItem
        key={interviewerPerson.id}
        id={interviewerPerson.id}
        name={interviewerPerson.name}
        avatar={interviewerPerson.avatar}
        selected={interviewerPerson.id === interviewer}
        setInterviewer={setInterviewer}
      />
    )
  })  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
      {eachInterviewer}
      </ul>
    </section>
  );
};

export default InterviewerList;