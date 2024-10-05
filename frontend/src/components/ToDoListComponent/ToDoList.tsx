import React from "react";
import "./ToDoList.css";

interface ToDoListProps {
  title: string;
  content: string;
  tags: string[];
}

const ToDoList = ({title, content, tags}:ToDoListProps) => {

  const tagList = tags.map((tag, index) => {
    return (
      <li key={index} className="ToDoList-tag"> <p>#{tag}</p> </li>
    );
  });

  return (
    <div className="ToDoList">
      <div className="ToDoList-header">
        <p className="ToDoList-title"> {title} </p>
        <div className="ToDoList-buttons">
          <button className="ToDoList-button supprimer"> Supprimer </button>
          <button className="ToDoList-button editer"> Editer </button>
        </div>
      </div>
      <p className="ToDoList-content"> {content} </p>
      <ul className="ToDoList-tags">
        {tagList}
      </ul>
    </div>
  );
};

export default ToDoList;