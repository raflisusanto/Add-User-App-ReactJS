import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [addUsername, setAddUsername] = useState("");
  const [addAge, setAddAge] = useState("");
  const [error, setError] = useState();

  function addUserFormHandler(event) {
    event.preventDefault();

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

    setAddUsername("");
    setAddAge("");
  }

  function addUsernameHandler(event) {
    setAddUsername(event.target.value);
  }

  function addAgeHandler(event) {
    setAddAge(event.target.value);
  }

  function errorHandler() {
    setError(null);
  }

  // error && <- Check if error is a thing

  return (
    <div>
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
          <input
            id="username"
            onChange={addUsernameHandler}
            value={addUsername}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" onChange={addAgeHandler} value={addAge}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
