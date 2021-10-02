import React from "react";

//Change state to see all, active, or completed tasks
//Props are passed from App.js to check key, name, state, and filter state.
function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden"></span>
      <span>{props.name}</span>
      <span className="visually-hidden"></span>
    </button>
  );
}

export default FilterButton;
