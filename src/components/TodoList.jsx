import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todos,
  isToggleClicked,
  editTask,
  deleteTask,
  isEditTaskClicked,
  editedTodoId,
  setEditDeleteMsg,
  editDeleteMsg,
}) {
  return (
    <>
      <div>
        {todos && (
          <div>
            {todos.length > 0 ? (
              <table
                className={`table ${
                  isToggleClicked ? "table-dark" : "table-light"
                }`}
              >
                <thead>
                  <tr className="row">
                    <th
                      scope="col"
                      className={`col-3 ${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      Headline
                    </th>
                    <th
                      scope="col"
                      className={`col-5 text-start ${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      Description
                    </th>
                    <th scope="col" className={`col-4 text-center text-danger`}>
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <Todo
                      key={todo.todoId}
                      todo={todo}
                      isToggleClicked={isToggleClicked}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      isEditTaskClicked={isEditTaskClicked}
                      editedTodoId={editedTodoId}
                      setEditDeleteMsg={setEditDeleteMsg}
                      editDeleteMsg={editDeleteMsg}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
}
