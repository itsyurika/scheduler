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
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back, history } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // console.log("mode : ", mode);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => {
      transition(ERROR_SAVE, true)});
  }

  function deleteInterview(id) {

    transition(DELETING, true);
    // console.log("history from deleteInterview fxn: ", history);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show
          {...props.interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => {
            console.log("logging props from SHOW: ", props);
            transition(EDIT);
          }
          } />}
        {/* for Show component, sending props.interview  - which contains student name and interviewer object */}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        />}
        {mode === EDIT && <Form
          {...props.interview}
          interviewers={props.interviewers}
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