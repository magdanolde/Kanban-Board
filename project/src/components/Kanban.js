import { useEffect, useState } from "react";
import React from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import useLocalStorage from "../useLocalStorage";
import { v4 as uuid } from "uuid";
import { TasksContext } from "../contexts/TasksContext";

function Kanban() {
  const initState = [
    {
      id: 1,
      title: "Requested",
      items: [],
      limit: 1,
    },
    {
      id: 2,
      title: "Backlog",
      items: [],
      limit: 2,
    },
    {
      id: 3,
      title: "Working",
      items: [],
      limit: 1,
    },
    {
      id: 4,
      title: "Waiting",
      items: [],
      limit: 1,
    },
    {
      id: 5,
      title: "Review",
      items: [],
      limit: 1,
    },
    {
      id: 6,
      title: "Done",
      items: [],
      limit: 1,
    },
  ];

  const [storedData, setSavedData] = useLocalStorage("kanban-data", []);
  const [state, setState] = useState(storedData);

  useEffect(() => {
    setSavedData(initState);
  }, [state]);

  const moveNext = (idColumnCurrent, task) => {
    const currentIndex = state.findIndex((item) => item.id === idColumnCurrent);
    const nextColumn = state.find(
      (column) => column.id === idColumnCurrent + 1
    );
    if (nextColumn.limit === nextColumn.items.length) {
      alert("You exedeed the limit of task in this column");
      return null;
    }

    const nextIndex = currentIndex + 1;

    const newState = state.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });

    const newState2 = newState.map((column, index) => {
      if (nextIndex === index) {
        return { ...column, items: [...column.items, task] };
      }
      return column;
    });

    setState(newState2);
  };

  const movePrev = (idColumnCurrent, task) => {
    const currentIndex = state.findIndex((item) => item.id === idColumnCurrent);
    const nextIndex = currentIndex - 1;
    const prevColumn = state.find(
      (column) => column.id === idColumnCurrent - 1
    );
    console.log(prevColumn);
    if (prevColumn.limit === prevColumn.items.length) {
      alert("You exedeed the limit of task in this column");
      return null;
    }
    const newState = state.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });
    const newState2 = newState.map((column, index) => {
      if (nextIndex === index) {
        return { ...column, items: [...column.items, task] };
      }
      return column;
    });
    setState(newState2);
  };

  const addTask = (author, taskName) => {
    const [firstColumn] = state;
    if (firstColumn.limit === firstColumn.items.length) {
      alert("You exedeed the limit of task in this column");
      return null;
    }
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
      return column;
    });
    setState(newState);
  };

  const deleteTask = (idColumnCurrent, task) => {
    const newState = state.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });
    setState(newState);
  };

  // function saveLocalStorage(data) {
  // localStorage.setItem("kanban-data", JSON.stringify(data));
  // }

  // function readLocalStorage(defaultValue) {
  // const item = JSON.parse(localStorage.getItem("kanban-data"));
  // if (item) {
  // return item;
  // }
  // return defaultValue;
  // }

  function renderColumns() {
    return state.map((column) => {
      return (
        <Column
          title={column.title}
          items={column.items}
          limit={column.limit}
          id={column.id}
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
          moveNext,
          movePrev,
          deleteTask,
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
