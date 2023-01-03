import { useState } from "react";

function SwitchTendencyButton({
  currentTendencyView,
  setCurrentTendencyView,
  setEntering,
}) {
  const [pressed, setPressed] = useState(false);

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
        className={`c-switch-button c-switch-button--${currentTendencyView} ${
          pressed ? "c-switch-button--pressed" : ""
        }`}
        onClick={() => {
          SwitchTendency();
          setEntering(true);
          setPressed(true);
          setTimeout(() => {
            setPressed(false);
            setEntering(false);
          }, 250);

          window.scrollTo(0, 0);
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
