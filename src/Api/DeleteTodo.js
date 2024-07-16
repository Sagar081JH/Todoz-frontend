import { Base_URL } from "../components/Base_URL";
import axios from "axios";

export function DeleteLastTodo(todoId, setTodos, setApiError) {
  axios
    .delete(`${Base_URL}/todos/delete/${todoId}`)
    .then(function (response) {
      if (response.status == 200) {
        setTodos([]);
      }
    })
    .catch((err) => {
      setApiError("Deletion failed due to : " + err.message);
    });
}

export function DeleteTodo(
  todoId,
  setTodos,
  FetchTodoList,
  setMsgColor,
  setActionMessage,
  setApiError
) {
  axios
    .delete(`${Base_URL}/todos/delete/${todoId}`)
    .then(function (response) {
      if (response.status === 200) {
        FetchTodoList(setTodos, setApiError);
        setMsgColor("red");
        setActionMessage("Task Deleted !!!");
      }
    })
    .catch((err) => {
      setActionMessage("");
      setApiError("Deletion failed due to : " + err.message);
    });
}
