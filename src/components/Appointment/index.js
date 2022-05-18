import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';


const Appointment = (props) => {
  return (
    <Fragment>
      <Header time={props.time}/>
      { props.interview ?
      <>
      <article className="appointment">
        <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
      </article>
      </>
      :
      <>
      <article className="appointment">
        <Empty/>
      </article>
      </>
      }
    </Fragment>
  );
};

export default Appointment;