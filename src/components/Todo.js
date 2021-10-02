import React, { useState } from "react";

export default function Todo(props) {
  //useState set to false so that editing is ONLY available upon clicking 'Edit'.
  //isEditing is initial state, setEditing is the hook.
  //useState('') ensures that if user is editing the input field is an empty string.
  //newName is initial state, setNewName is the hook.
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  //Prevents default browser refresh
  //Passes props to editTask to assign the new name to the task id
  //Removes editing field upon clicking submit button
  //Accepts newName value from editingTemplate
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  //State WHEN editing
  //Calls handleSubmit
  //Receives props for name of previous task name and id.
  //Calls handleChange via onChange
  //Accepts newName value from input
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit"
          onClick={() => setEditing(true)}
        >
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  //State when NOT editing.
  //Allows user to toggle checkbox, changing the state of the checkbox
  //Filter will now read if the checkbox is toggled
  //Props for the name and id of the task are both passed in
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  //Checks if the task is being edited.  If truthy, dispaly editingTemplate.  If no, display viewTemplate.
  return (
    <li className="todo stack-small">
      {" "}
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
