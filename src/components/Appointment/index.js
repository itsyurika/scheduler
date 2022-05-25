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

//component responsible for displaying a new appointment form or existing appointment  
const Appointment = (props) => {
  const { 
    bookInterview, 
    cancelInterview, 
    interview, 
    interviewers, 
    id, 
    time 
  } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //custom hook allows to use "mode" to display correct appointment form/info
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //function invoked by clicking save - sends new appointment info to server through bookInterview fxn
  function save (name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE, true)});
  };

  //function invoked by clicking delete & confirm - sends appointment id to be updated
  function deleteInterview(id) {

    transition(DELETING, true);
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <Fragment>
      <Header time={time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show
          {...interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)} 
        />}
        {mode === CREATE && <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview(id)}
        />}
        {mode === EDIT && <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
        {mode === ERROR_SAVE && <Error message={"Error occurred during saving"} onClose={() => back()}/>}
        {mode === ERROR_DELETE && <Error message={"Error occurred during deleting"} onClose={() => back()}/>}
      </article>
    </Fragment>
  );
};

export default Appointment;