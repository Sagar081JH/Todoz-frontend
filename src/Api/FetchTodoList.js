import { Base_URL } from "../components/Base_URL";

export default function FetchTodoList(setTodos, setApiError) {
  fetch(`${Base_URL}/todos`)
    .then(function (response) {
      if (response.status === 200) {
        console.log("status " + response.status);
        return response.json();
      } else if (response.status === 204) {
        console.log("http status : 204");
        throw new Error("No task available...Plese add task");
      } else if (response.status === 500) {
        console.log("http status : 500");
        throw new Error("Internal Server Error");
      } else {
        console.log("http status : " + response.status);
        throw new Error("Unknown network error");
      }
    })
    .then((data) => setTodos(data))
    .catch(function (error) {
      if (error.message === "Failed to fetch") {
        setApiError(error.message + ": Server is down. please try later!");
      } else {
        setApiError(error.message);
      }
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

export async function FetchTodosAsync(setTodos, setApiError) {
  try {
    const response = await fetch(`${Base_URL}/todos`);
    const json = await response.json();
    setTodos(json);
  } catch (err) {
    setApiError(err);
    console.error(err);
  }
}
