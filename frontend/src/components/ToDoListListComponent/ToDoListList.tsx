import React from "react";
import "./ToDoListList.css";
import ToDoList from "../ToDoListComponent/ToDoList";
import { useEffect, useState } from "react";
import axios from "axios";

const ToDoListList = () => {

  interface ToDoList {
    title: string;
    content: string;
    tags: string[];
  }

  const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);

  useEffect(() => {
    axios.get("https://localhost:3000/api/blogs")
      .then(response => {
        setToDoLists(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the to-do lists!", error);
      });
  }, []);

  return (
    <div className="ToDoListList">

      {toDoLists.map((toDoList, index) => {
        return (
          <ToDoList key={index} title={toDoList.title} content={toDoList.content} tags={toDoList.tags}/>
        );
      })}

    </div>
  );
};

export default ToDoListList;