import React from "react";
import "./ToDoListList.css";
import ToDoList from "../ToDoListComponent/ToDoList";

const ToDoListList = () => {
  return (
    <div className="ToDoListList">
      <ToDoList title="Premiere ToDo" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." tags={["tropbien","tropcool","relou"]}/>
      <ToDoList title="Autre ToDo" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." tags={["important", "urgent", "homework"]}/>
      <ToDoList title="Une Derniere ?" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." tags={["work", "meeting", "deadline"]}/>
      <ToDoList title="Et pourquoi pas une de plus ?" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." tags={["shopping", "weekend", "fun"]}/>
    </div>
  );
};

export default ToDoListList;