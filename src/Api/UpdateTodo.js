import { Base_URL } from "../components/Base_URL";
import axios from "axios";

export default function UpdateTodo(
  editedTodoId,
  updatedHeadline,
  updatedDesc,
  setApiError,
  setIsEditTaskClicked,
  apiError,
  setMsgColor,
  setActionMessage,
  clearFields
) {
  console.log("eid2 : " + `${Base_URL}/todos/update/${editedTodoId}`);
  axios
    .put(`${Base_URL}/todos/update/${editedTodoId}`, {
      todoId: editedTodoId,
      headline: updatedHeadline,
      description: updatedDesc,
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
