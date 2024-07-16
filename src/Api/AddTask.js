import { Base_URL } from "../components/Base_URL";
import axios from "axios";

export default function AddTask(
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
) {
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
    axios
      .post(`${Base_URL}/todos`, {
        headline: headline,
        description: description,
      })
      .then(function (response) {
        if (response.status === 201) {
          FetchTodoList(setTodos, setApiError);
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
