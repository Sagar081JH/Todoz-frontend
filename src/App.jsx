import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TodozHeader from "./components/TodozHeader";
import FormInput from "./components/FormInput";
import TodoList from "./components/TodoList";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./service/TodoService";
import Footer from "./components/Footer";

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

  const getAllTodos = () => {
    return getTodos()
      .then(function (response) {
        setTodos(response.data);
        if (response.status === 204) {
        } else if (response.status === 500) {
          throw new Error("Internal Server Error");
        }
      })
      .catch(function (error) {
        if (error.message === "Failed to fetch") {
          setApiError(error.message + ": Server is down. please try later!");
        } else {
          setApiError("Server is down. please try later!");
        }
      });
  };

  useEffect(() => {
    // FetchTodosAsync(setTodos, setApiError); //with async await (more readable code)
    //FetchTodoList(setTodos, setApiError); // with fetch only
    getAllTodos();
  }, []);

  const [headlineBorder, setHeadlineBorder] = useState("");
  const [descInputBorderColor, setDescInputBorderColor] = useState("");

  function addTask(headline, description) {
    if (headline === "" || description === "") {
      if (description === "") {
        setDescInputBorderColor("border-danger");
        setDescriptionError("Empty description!");
      } else {
        setDescriptionError("");
        setDescInputBorderColor("");
      }
      if (headline === "") {
        setHeadlineBorder("border-danger");
        setHeadlineError("Empty headline!");
      } else {
        setHeadlineBorder("");
        setHeadlineError("");
      }
    } else {
      setHeadlineBorder("");
      setDescInputBorderColor("");
      setDescriptionError("");
      setHeadlineError("");
      addTodo(headline, description)
        .then((response) => {
          if (response.status === 201) {
            getAllTodos();
            setApiError("");
            setActionMessage("Task Added !!!");
            setMsgColor("green");
          }
        })
        .catch((err) => {
          setApiError("Failed to add a task due to : " + err.message);
          setActionMessage("");
          console.log("error :" + err.message);
        });

      setTimeout(() => {
        setActionMessage("");
      }, 2000);
      clearFields();
    }
  }

  function deleteTask(todoId) {
    deleteTodo(todoId)
      .then(function (response) {
        if (response.status === 200) {
          setTodos(todos.filter((todo) => todo.todoId !== todoId));
          setMsgColor("red");
          setActionMessage("Task Deleted !!!");
        }
      })
      .catch((err) => {
        setActionMessage("");
        setApiError("Deletion failed due to : " + err.message);
      });

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
    const editedTodo = {
      todoId: editedTodoId,
      headline: updatedHeadline,
      description: updatedDesc,
    };

    updateTodo(editedTodo, editedTodo.todoId)
      .then((response) => {
        //setTodos([...todos, editedTodo]);
        getAllTodos();
      })
      .catch((err) => {
        setApiError("Task upadate failed due to : " + err.message);
        console.log("taskUpdate : " + err);
      });

    if (apiError === "") {
      setIsEditTaskClicked(false);
      setMsgColor("blue");
      setActionMessage("Task Updated !!!");
      setTimeout(() => {
        setActionMessage("");
      }, 3000);
      clearFields();
    }
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
      <div className="p-3">
        <TodozHeader
          isToggleClicked={isToggleClicked}
          setIsToggleClicked={setIsToggleClicked}
        />

        <div className="row">
          <div className="col-sm-5">
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
          </div>

          <div className="col-sm-7">
            {apiError !== "" ? (
              <div className="text-center fs-6 mt-3 pt-3 text-danger">
                {apiError}
              </div>
            ) : (
              <div className="row">
                <div
                  className={`col-6 fs-4 ${
                    isToggleClicked ? "text-light" : "text-dark"
                  }`}
                >
                  Task List
                </div>
                <div className="text-start col-6" style={{ color: msgColor }}>
                  {actionMessage}
                </div>
                <hr />
                {todos.length === 0 && (
                  <div className="text-center">
                    No task available ! Pleas add.
                  </div>
                )}
              </div>
            )}

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
        <Footer />
      </div>
    </>
  );
}
