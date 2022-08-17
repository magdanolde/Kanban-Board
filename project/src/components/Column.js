import React from "react";

function Column(props) {
  const { title, items, count } = props;
  function renderItems() {
    return items.map((item) => {
      return (
        <div className="column__input">
          <div className="input__author"> Resposible: {item.author}</div>
          <div className="input__taskname">Task: {item.taskName}</div>
        </div>
      );
    });
  }
  return (
    <div className="kanban__column">
      <div className="column__title">{title} </div>
      <div className="column__limit"> ({count}/5)</div>
      <div className="column__items">{renderItems()}</div>
    </div>
  );
}

export default Column;
