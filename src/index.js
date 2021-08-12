import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DATA = [
  { id: "todo-0", name: "Wake Up", completed: true },
  { id: "todo-1", name: "Be Awesome", completed: false },
  { id: "todo-2", name: "Continue to Be Awesome", completed: false }
];



ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
