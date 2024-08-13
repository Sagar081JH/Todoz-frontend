import React from "react";

export default function TodozHeader({ isToggleClicked, setIsToggleClicked }) {
  return (
    <>
      <div
        className={`d-flex border p-1 rounded justify-content-between mb-4 ${
          isToggleClicked
            ? "text-warning bg-dark  border-secondary"
            : "text-success bg-light"
        }`}
      >
        <div id="title" className="p-2 fs-2 justify-content-start">
          Todoz
        </div>

        <div className="">
          <span className="form-check form-switch fs-4">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={() => setIsToggleClicked(!isToggleClicked)}
            />
          </span>
          <span className="fs-1 mt-2">
            {isToggleClicked ? (
              <span>&#9789; </span>
            ) : (
              <span className="text-warning"> &#9788;</span>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
