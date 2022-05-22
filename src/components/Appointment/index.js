import React, { Fragment } from 'react';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";
  const ERROR = "ERROR";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    console.log("logging props: ", props);
    return (
      <Fragment>
        <Header time={props.time}/>
        <article className="appointment">
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
          {mode === SHOW && <Show {...props.interview}/>} 
          {/* for Show component, sending props.interview  - which contains student name and interviewer object */}
          {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)}/>}
        </article>
     
      </Fragment>
    );
};

export default Appointment;