import React from "react";

const TodoList = (props) => {
  return (
    <div className="todo_item">
      <div
        onClick={() => {
          props.markDone(props.id);
          // check box checked
        }}
        className="todo_checkbox_title"
      >
        <input
          className="inputData"
          type="checkbox"
          readOnly
          checked={props.todoItem.completed ? "checked" : ""}
        ></input>

        {props.todoItem.completed ? (
          <div className="todo_title todo_completed">
            {props.todoItem.title}
          </div>
        ) : (
          <div className="todo_title">{props.todoItem.title}</div>
        )}
      </div>
      <button
        onClick={() => {
          props.deleteListItem(props.id);
        }}
        className="todo_delete_button"
      >
        X
      </button>
    </div>
  );
};

export default TodoList;
