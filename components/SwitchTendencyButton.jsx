import { useState } from "react";

function SwitchTendencyButton({ currentTendencyView, setCurrentTendencyView }) {
  function SwitchTendency() {
    if (currentTendencyView === "positive") {
      setCurrentTendencyView("negative");
    } else {
      setCurrentTendencyView("positive");
    }
  }

  return (
    <div className="main-footer">
      <button
        className={`c-switch-button c-switch-button--${currentTendencyView}`}
        onClick={() => {
          SwitchTendency();
        }}
      >
        {currentTendencyView === "positive"
          ? "View negative tendencies"
          : "View positive tendencies"}
      </button>
    </div>
  );
}

export default SwitchTendencyButton;
