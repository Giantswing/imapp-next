import { useState } from "react";

function Selectable({ title, callback, selected }) {
  return (
    <button
      className={`c-selectable c-selectable--${
        selected ? "selected" : "unselected"
      }`}
      onClick={() => {
        callback();
      }}
    >
      {title}
    </button>
  );
}

export default Selectable;
