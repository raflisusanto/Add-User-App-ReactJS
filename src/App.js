import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

const INIT_USER = [];

function App() {
  const [enteredUser, setEnteredUser] = useState(INIT_USER);

  function appendUserHandler(username, userAge) {
    setEnteredUser((prevState) => {
      return [
        { name: username, age: userAge, id: Math.random() },
        ...prevState,
      ];
    });
  }

  return (
    <React.Fragment>
      <AddUser onAddUser={appendUserHandler} />
      <UsersList users={enteredUser} />
    </React.Fragment>
  );
}

export default App;
