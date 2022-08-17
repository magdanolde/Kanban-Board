import { useState } from "react";
import React from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { v4 as uuid } from "uuid";
import { TasksContext } from "../contexts/TasksContext";

function Kanban() {
  const initState = [
    {
      id: 1,
      title: "Requested",
      items: [],
      count: 0,
    },
    {
      id: 2,
      title: "Backlog",
      items: [],
      count: 0,
    },
    {
      id: 3,
      title: "Working",
      items: [],
      count: 0,
    },
    {
      id: 4,
      title: "Waiting",
      items: [],
      count: 0,
    },
    {
      id: 5,
      title: "Review",
      items: [],
      count: 0,
    },
    {
      id: 6,
      title: "Done",
      items: [],
      count: 0,
    },
  ];

  const [state, setState] = useState(initState);

  const addTask = (author, taskName) => {
    const newState = state.map((column, index) => {
      if (index === 0) {
        return {
          ...column,
          items: [
            ...column.items,
            { author: author, taskName: taskName, id: uuid() },
          ],
        };
      }
      if (column.items.length < 6) {
        return {
          ...column,
          count: column.items.length,
        };
      }
      return column;
    });
    setState(newState);
  };

  function renderColumns() {
    return state.map((column) => {
      return (
        <Column
          title={column.title}
          items={column.items}
          count={column.count}
        />
      );
    });
  }

  return (
    <>
      <TasksContext.Provider
        value={{
          state,
          addTask,
        }}
      >
        <div className="kanban__title">KANBAN BOARD</div>
        <div className="kanban">{renderColumns()}</div>
        <TaskForm />
      </TasksContext.Provider>
    </>
  );
}
export default Kanban;
