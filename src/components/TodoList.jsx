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
        {todos && todos.length > 0 && (
          <div>
            <div
              className={`col-6 fs-3 ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Tasks
            </div>
            <hr />
            {todos.length > 0 ? (
              <table
                className={`table ${
                  isToggleClicked ? "table-dark" : "table-light"
                }`}
              >
                <thead>
                  <tr className="row">
                    {/* <th
                      scope="col"
                      className={`${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      #
                    </th> */}
                    <th
                      scope="col"
                      className={`col-4 ${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      Headline
                    </th>
                    <th
                      scope="col"
                      className={`col-4 text-start ${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      Description
                    </th>
                    <th scope="col" className={`col-4 text-start text-danger`}>
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <Todo
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
