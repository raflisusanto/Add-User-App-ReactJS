import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

// Controlled Component: React Control those component through the "internal state" (We don't access the DOM through the API).

function AddUser(props) {
  // Can use either refs or state
  const usernameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  function addUserFormHandler(event) {
    event.preventDefault();

    const addUsername = usernameInputRef.current.value;
    const addAge = ageInputRef.current.value;

    if (addUsername.trim().length === 0 || addAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age",
      });
      return;
    }

    if (+addAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }

    props.onAddUser(addUsername, addAge);

    usernameInputRef.current.value = "";
    ageInputRef.current.value = "";
  }

  function errorHandler() {
    setError(null);
  }

  // error && <- Check if error is a thing

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserFormHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" ref={usernameInputRef}></input>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default AddUser;
