import React from "react";

export default function Todo({
  todo,
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
      <tr className="row">
        {/* <td scope="row">{todo.todoId}</td> */}
        <td className="col-3">{todo.headline}</td>
        <td className="col-5">{todo.description}</td>

        <td className="col-4 text-center">
          <span className="">
            {/* <Tooltip anchorSelect=".edit-desc" place="top">
                              Edit Description
                            </Tooltip> */}
            <a className="edit-desc">
              <button
                id="edit-btn"
                type="button"
                onClick={() => editTask(todo)}
                className={`btn ${
                  isToggleClicked
                    ? "text-light btn-outline-success "
                    : "text-dark btn-outline-info"
                }`}
              >
                {isEditTaskClicked && editedTodoId === todo.todoId ? (
                  <span
                    id="edit-cancel"
                    className={`${
                      isToggleClicked ? "text-light" : "text-dark"
                    }`}
                    style={{ fontSize: "12px" }}
                  >
                    Cancel
                  </span>
                ) : (
                  <span id="edit">Edit</span>
                )}
              </button>
            </a>
          </span>
          {/* <Tooltip anchorSelect=".delete" place="top">
                          Delete Task
                        </Tooltip> */}

          <span className="text-end mx-1">
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              onClick={() =>
                setEditDeleteMsg(
                  isEditTaskClicked && editedTodoId === todo.todoId
                    ? "This task is under edit, can't delete !"
                    : ""
                )
              }
              data-target={`#${todo.todoId}`}
            >
              &#10007;
            </button>

            <div
              class="modal fade"
              id={todo.todoId}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div
                    className={`modal-body ${
                      isToggleClicked
                        ? "bg-dark text-light"
                        : "bg-light text-dark"
                    }`}
                  >
                    <hr />
                    <h5 className="text-start">Are your sure ?</h5>
                    <h6 className="text-danger">{editDeleteMsg}</h6>
                  </div>
                  <div
                    className={`modal-footer ${
                      isToggleClicked ? "bg-dark" : "bg-light"
                    }`}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setEditDeleteMsg("")}
                    >
                      No, Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={editDeleteMsg.length !== 0}
                      data-dismiss="modal"
                      onClick={() => deleteTask(todo.todoId)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </td>
      </tr>
    </>
  );
}
