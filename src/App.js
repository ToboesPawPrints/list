import React, { useState } from "react";
import Todo from "./components/Todo.js";
import Form from "./components/Form.js";
import FilterButton from "./components/FilterButton.js";
import { nanoid } from "nanoid";


//Checking/mapping state of tasks.
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

//Used to look at the task names and keys and identify their state. (In/Active)
const FILTER_NAMES = Object.keys(FILTER_MAP);

//The beef.
function App(props) {
  //Default state is with default tasks displayed and filter set to All
  //tasks and setTasks array will change state with user interaction (+/-)
  //tasks is the initial state 
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  //Changes state of active task to completed
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //Searches tasks object for unique task id and reassigns value by changing value of name to newName's value
  //Checks to ensure that the id is still the same
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //Maps tasks in tasks object
  //Checks state of completion
  //Calls edit or delete task
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  //Maps the key, name, state, and filters
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //Adds a new task using user input
  //Assigned unique random id using nanoid()
  //Changes state to display the new task
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //Checks items left in taskList are plural, prints status accordingly
  //Template literals display remaining tasks
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun}`;

  //Returns the dynamic display based on current state
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
