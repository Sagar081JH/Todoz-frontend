import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TodozHeader from "./components/TodozHeader";
import FormInput from "./components/FormInput";
import TodoList from "./components/TodoList";
import FetchTodoList from "./Api/FetchTodoList";
import AddTask from "./Api/AddTask";
import { DeleteTodo, DeleteLastTodo } from "./Api/DeleteTodo";
import UpdateTodo from "./Api/UpdateTodo";

export default function App() {
  const [todoHeadline, setTodoHeadline] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [todos, setTodos] = useState([]);
  console.log("typeOfTodos :", typeof todos);

  const [editedTodoId, setEditedTodoId] = useState(0);

  const [actionMessage, setActionMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [headlineError, setHeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [apiError, setApiError] = useState("");
  console.log("typeOfApiE :", typeof apiError);

  console.log("Todos :", todos);

  useEffect(() => {
    FetchTodoList(setTodos, setApiError);
  }, [todos]);

  const [headlineBorder, setHeadlineBorder] = useState("");
  const [descInputBorderColor, setDescInputBorderColor] = useState("");

  function addTask(headline, description) {
    AddTask(
      headline,
      description,
      setDescInputBorderColor,
      setDescriptionError,
      setHeadlineBorder,
      setHeadlineError,
      FetchTodoList,
      setTodos,
      setApiError,
      setActionMessage,
      clearFields,
      setMsgColor
    );
  }

  function deleteTask(todoId) {
    if (todos.length <= 1) {
      setTimeout(() => {
        DeleteLastTodo(todoId, setTodos, setApiError);
      }, 1000);
    } else {
      DeleteTodo(
        todoId,
        setTodos,
        FetchTodoList,
        setMsgColor,
        setActionMessage,
        setApiError
      );
    }
    if (apiError === "") {
      setTimeout(() => {
        setActionMessage("");
      }, 1000);
    }
  }

  const [isEditTaskClicked, setIsEditTaskClicked] = useState(false);
  const [editDeleteMsg, setEditDeleteMsg] = useState("");

  function editTask(todo) {
    console.log("todo1 :", todo);
    setTodoHeadline(todo.headline);
    setTodoDescription(todo.description);
    setEditedTodoId(todo.todoId);
    setIsEditTaskClicked(!isEditTaskClicked);

    console.log("eid : ", editedTodoId);

    setHeadlineError("");
    setHeadlineBorder("");
    setDescriptionError("");
    setDescInputBorderColor("");

    if (isEditTaskClicked) {
      clearFields();
    }

    if (!document.getElementById("edit-cancel")) {
      document.getElementById("title").scrollIntoView({ behavior: "smooth" });
      setHeadlineBorder("border-info");
      setDescInputBorderColor("border-info");
    }
  }

  function updateTask(updatedHeadline, updatedDesc) {
    UpdateTodo(
      editedTodoId,
      updatedHeadline,
      updatedDesc,
      setApiError,
      setIsEditTaskClicked,
      apiError,
      setMsgColor,
      setActionMessage,
      clearFields
    );
  }

  const [isToggleClicked, setIsToggleClicked] = useState(false);

  if (isToggleClicked) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  function clearFields() {
    setTodoHeadline("");
    setTodoDescription("");
  }

  return (
    <>
      <div className="container p-2">
        <TodozHeader
          isToggleClicked={isToggleClicked}
          setIsToggleClicked={setIsToggleClicked}
        />

        <div>
          <FormInput
            isToggleClicked={isToggleClicked}
            todoHeadline={todoHeadline}
            setTodoHeadline={setTodoHeadline}
            headlineError={headlineError}
            headlineBorder={headlineBorder}
            todoDescription={todoDescription}
            setTodoDescription={setTodoDescription}
            descInputBorderColor={descInputBorderColor}
            descriptionError={descriptionError}
            addTask={addTask}
            updateTask={updateTask}
            isEditTaskClicked={isEditTaskClicked}
            clearFields={clearFields}
          />

          <div className="text-center fs-6 mt-3 pt-3 text-danger">
            {apiError}
          </div>

          <div className="text-center" style={{ color: msgColor }}>
            {actionMessage}
          </div>

          <TodoList
            todos={todos}
            isToggleClicked={isToggleClicked}
            editTask={editTask}
            deleteTask={deleteTask}
            isEditTaskClicked={isEditTaskClicked}
            editedTodoId={editedTodoId}
            setEditDeleteMsg={setEditDeleteMsg}
            editDeleteMsg={editDeleteMsg}
          />
        </div>
      </div>
    </>
  );
}
