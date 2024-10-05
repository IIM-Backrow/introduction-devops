import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoListList from './components/ToDoListListComponent/ToDoListList';

function App() {
  return (
    <div className="App">
      <h1> To do List, List </h1>
      <div className='ToDoList-creation'>
        <input className='ToDoList-textarea' type='text' placeholder='Titre de la ToDoList'/>
        <button className='ToDoList-button'>Créer une ToDoList</button>
      </div>
      <ToDoListList />
    </div>
  );
}

export default App;
