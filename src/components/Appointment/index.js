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
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const ERROR = "ERROR";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("mode : ", mode);
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function deleteInterview(id) {

    transition(DELETING)
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    // transition(EMPTY);
  }

    return (
      <Fragment>
        <Header time={props.time}/>
        <article className="appointment">
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
          {mode === SHOW && <Show {...props.interview} onDelete={() => transition(CONFIRM)}/>} 
          {/* for Show component, sending props.interview  - which contains student name and interviewer object */}
          {mode === CREATE && <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()}
          onSave={save}
          />}
          {mode === SAVING && <Status message={"Saving"}/>}
          {mode === DELETING && <Status message={"Deleting"}/>}
          {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"}onCancel={() => back()} onConfirm={() => deleteInterview(props.id)}/>}
        </article>
     
      </Fragment>
    );
};

export default Appointment;