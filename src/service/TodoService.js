import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodos = () => {
  return api.get("/todos");
};

export const addTodo = (headline, description) => {
  let todo = {
    headline: headline,
    description: description,
  };
  return api.post("todos", todo);
};

export const updateTodo = (todo, id) => {
  return api.put(`/todos/update/${id}`, todo);
};

export const deleteTodo = (id) => {
  return api.delete(`/todos/delete/${id}`);
};
