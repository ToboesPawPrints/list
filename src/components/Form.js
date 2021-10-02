import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  //preventDefault() prevents handleSubmit() from auto-refresh
  //handleSubmit() is used to pass props to addTask
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  //Sets a new state for input of setName
  //Identifies the event, variable to change,
  //and the value(name) the changed variable will recevie.
  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__info btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
