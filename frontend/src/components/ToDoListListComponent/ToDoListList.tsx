import React from "react";
import "./ToDoListList.css";
import ToDoList from "../ToDoListComponent/ToDoList";
import { useEffect, useState } from "react";

const ToDoListList = () => {

  interface ToDoList {
    title: string;
    content: string;
    tags: string[];
  }

  const [toDoLists, setToDoLists] = useState<ToDoList[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
        .then((response: any) => {
            return response.json();
        })
      .then((response: any) => {
        setToDoLists(response);
      })
      .catch((error: any) => {
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
