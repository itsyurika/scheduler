import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const Form = (props) => {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  
  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if(!student) {
      setError("you must enter student name");
      return;
    }
    if(!interviewer) {
      setError("you must select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event)=> event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event)=> {setStudent(event.target.value)}}
            value={student}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;