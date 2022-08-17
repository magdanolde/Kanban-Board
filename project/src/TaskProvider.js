import React from "react";

export default class TaskProvider {
  read() {
    const json = localStorage.getItem("kanban-data");
    if (!json) {
      return [
        {
          id: 1,
          items: [],
        },
        {
          id: 2,
          items: [],
        },
        {
          id: 3,
          items: [],
        },

        {
          id: 4,
          items: [],
        },

        {
          id: 5,
          items: [],
        },

        {
          id: 6,
          items: [],
        },
      ];
    }
    return JSON.parse(json);
  }
  save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }
  getItems(ColumnId) {
    const column = this.read().find((column) => column === ColumnId);

    if (!column) {
      return [];
    }
    return column.items;
  }

  insertItem(ColumnId, content) {
    const data = this.read();
    const column = data.find((column) => column === ColumnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content: content,
    };
    if (!column) {
      throw new Error("Column doesnt exist");
    }
    column.items.push(item);
    this.save(data);

    return item;
  }

  updateItem (itemId, newProps) {
    const data = this.read();
    const [item, currentColumn]

  }
}
