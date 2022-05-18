import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

const InterviewerList = (props) => {
  const {interviewers, interviewer, setInterviewer} = props;
  const eachInterviewer = interviewers.map((person) => {
    return(
      <InterviewerListItem
        key={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === interviewer}
        setInterviewer={()=> {setInterviewer(person.id)}}
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