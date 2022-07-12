import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";

function App() {
  //var count = 0;
  const [inputList, setInputList] = useState({ title: "" });
  const [inputListItem, setInputListItem] = useState([]);
  const [completedTodos, setCompletedTodos] = useState(0);

  const TODOS_API = "https://jsonplaceholder.typicode.com/users/1/todos";

  useEffect(() => {
    fetch(TODOS_API)
      .then((data) => data.json())
      .then((jsonData) => {
        let doneCount = 0;
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].completed) {
            doneCount++;
          }
        }
        setInputListItem(jsonData);
        setCompletedTodos(doneCount);
      });
  }, []);

  const todoList = (e) => {
    const item = {
      title: e.target.value,
      userId: 1,
      completed: false,
      id: 8172
    };
    setInputList(item);
    console.log(item);
  };

  const todoListItem = () => {
    if (inputList.title.length === 0) {
      alert("Empty Todo...");
      return;
    }
    setInputListItem((item) => {
      return [...item, inputList];
    });
    setInputList({ title: "" });
  };

  function deleteListItem(id) {
    let todoItems = [...inputListItem];
    if (todoItems[id].completed) {
      setCompletedTodos(completedTodos - 1);
    }
    todoItems = todoItems.filter((_, index) => {
      return index !== id;
    });

    setInputListItem(todoItems);
  }

  const markDone = (id) => {
    const todoItems = [...inputListItem];
    let todoItem = todoItems[id];
    if (todoItem.completed) {
      setCompletedTodos(completedTodos - 1);
    } else {
      setCompletedTodos(completedTodos + 1);
    }
    todoItem.completed = !todoItem.completed;
    setInputListItem(todoItems);
  };

  return (
    <div className="container">
      <div className="todo_container">
        <h1>THINGS TO DO</h1>

        <div className="todo_input_container">
          <input
            className="inputData"
            type="text"
            onChange={todoList}
            value={inputList.title}
            placeholder="Enter Tasks in the List"
          ></input>
          <button onClick={todoListItem}>Add Todo</button>
        </div>
        <div className="done_container">
          <h4>Completed : {completedTodos}</h4>
        </div>
        <div className="todo_list_container">
          {inputListItem.map((todoItem, index) => {
            return (
              <ToDoList
                key={index}
                id={index}
                todoItem={todoItem}
                deleteListItem={deleteListItem}
                markDone={markDone}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
